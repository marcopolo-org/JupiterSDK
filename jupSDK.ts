import { BN, Program, Provider, utils, StateCoder } from "@project-serum/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, TransactionInstruction, AccountInfo, Connection, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { IDL, Marcopolo } from "./idl/marcopolo";
import JSBI from "jsbi";



export type TokenMintAddress = PublicKey;
export type SwapMode = any;

export interface QuoteParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    amount: JSBI;
    swapMode: SwapMode;
}

export interface Quote {
    notEnoughLiquidity: boolean;
    inAmount: JSBI;
    outAmount: JSBI;
    feeAmount: JSBI;
    feeMint: TokenMintAddress;
    feePct: number;
    priceImpactPct: number;
}

export interface SwapParams {
    sourceMint: PublicKey;
    destinationMint: PublicKey;
    userSourceTokenAccount: PublicKey;
    userDestinationTokenAccount: PublicKey;
    userTransferAuthority: PublicKey;
    inAmount: JSBI;
}

export interface PoolStructure {
    tokenX: PublicKey;
    tokenY: PublicKey;
    poolXAccount: PublicKey;
    poolYAccount: PublicKey;
    admin: PublicKey;
    projectOwner: PublicKey;
    constK: Product;
    price: FixedPoint;
    lpFee: FixedPoint;
    buybackFee: FixedPoint;
    projectFee: FixedPoint;
    mercantiFee: FixedPoint;
    tokenXReserve: Token;
    tokenYReserve: Token;
    selfShares: Token;
    allShares: Token;
    buybackAmountX: Token;
    buybackAmountY: Token;
    projectAmountX: Token;
    projectAmountY: Token;
    mercantiAmountX: Token;
    mercantiAmountY: Token;
    lpAccumulatorX: Token;
    lpAccumulatorY: Token;
    bump: number;
}

export interface FixedPoint {
    v: BN;
}

export interface Token {
    v: BN;
}

export interface Product {
    v: BN;
}

interface Amm {
    /* Reserve token mints for the purpose of routing, usually only 2 elements */
    reserveTokenMints: PublicKey[];
    getAccountsForUpdate(): PublicKey[];
    update(accountInfoMap: any): void;
    getQuote(quoteParams: QuoteParams): Quote;
    createSwapInstructions(swapParams: SwapParams): TransactionInstruction[];
}

export interface MyParams {
    xToY: boolean;
    referrer: PublicKey;
    referrerSourceTokenAccount: PublicKey;
    referrerDestinationTokenAccount: PublicKey;
}
// Implementation preferred constructor params
export default class MarcoPoloAMM implements Amm {
    public reserveTokenMints: PublicKey[];
    public pool: PoolStructure;
    // public tokenAccounts: PublicKey[];
    public poolAddress: PublicKey;
    private programID = new PublicKey("eZtZrTJjHHMguU1PpGhpz6cTfVwYgZVfk18Ao8zxVqR");
    private programIDL = IDL;
    private program: Program<Marcopolo>;
    private DEFAULT_DENOMINATOR = new BN(10).pow(new BN(12));


    private constructor(
        address: PublicKey, accountInfo: AccountInfo<Buffer>, params: MyParams
    ) {
        this.programID =
            this.poolAddress = address;
        this.pool = this.decodePoolState(accountInfo);
        this.programIDL = IDL;
        this.program = new Program(this.programIDL, this.programID);
    }

    private decodePoolState(accountInfo: AccountInfo<Buffer>) {
        const pool = this.program.coder.accounts.decode("pool", accountInfo.data)
        return pool as PoolStructure;
    }

    private getOutputAmounts(deltaIn: Token, pool: PoolStructure, xToY: boolean): [JSBI, JSBI, number] {

        let denominator = xToY
            ? deltaIn.v.add(pool.tokenXReserve.v)
            : deltaIn.v.add(pool.tokenYReserve.v);

        let fraction = pool.constK.v.div(denominator);
        let deltaOut = {
            v: xToY
                ? pool.tokenYReserve.v.sub(fraction)
                : pool.tokenXReserve.v.sub(fraction)
        };

        let lpFeeAmount: Token = {
            v: deltaOut.v
                .mul(pool.lpFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let buybackFeeAmount: Token = {
            v: deltaOut.v
                .mul(pool.buybackFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let projectFeeAmount: Token = {
            v: deltaOut.v
                .mul(pool.projectFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let mercantiFeeAmount: Token = {
            v: deltaOut.v
                .mul(pool.mercantiFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };

        if (
            lpFeeAmount.v
                .add(buybackFeeAmount.v)
                .add(projectFeeAmount.v)
                .add(mercantiFeeAmount.v)
                .gt(deltaOut.v)
        ) {
            throw new Error("Fees exceed deltaOut");
        }

        const totalFeeAmount = lpFeeAmount.v.add(buybackFeeAmount.v).add(projectFeeAmount.v).add(mercantiFeeAmount.v);
        const outAmount = JSBI.BigInt(deltaOut.v.sub(totalFeeAmount).toString());
        const feePct = totalFeeAmount.toNumber() / deltaOut.v.toNumber();
        return [outAmount, JSBI.BigInt(totalFeeAmount.toString()), feePct];
    }

    private calculatePriceImpact(deltaIn: Token, price: number, xToY: boolean) {
        const fromTokenSwap = deltaIn.v.toNumber();
        const toTokenSwap = (price * deltaIn.v.toNumber());
        const rawPoolTokenXReserveDelta = xToY ? this.pool.tokenXReserve.v.toNumber() + (fromTokenSwap) : Math.max((this.pool.tokenXReserve.v.toNumber() - (toTokenSwap)), 0);
        const rawPoolTokenYeserveDelta = xToY ? Math.max((this.pool.tokenYReserve.v.toNumber() - (toTokenSwap)), 0) : (this.pool.tokenYReserve.v.toNumber() + (fromTokenSwap));
        const poolTokenXReserveDelta = { v: (new BN(rawPoolTokenXReserveDelta)) };
        const poolTokenYReserveDelta = { v: (new BN(rawPoolTokenYeserveDelta)) };
        const priceAfterSwap = Math.max((Math.pow(this.calculatePrice(poolTokenXReserveDelta, poolTokenYReserveDelta).v.toNumber(), xToY ? 1 : -1)), 0);
        const priceDelta = Math.min((((price - priceAfterSwap) / price) * 100), 100);
        return priceDelta;
    }
    private calculatePrice(
        tokenXReserve: Token,
        tokenYReserve: Token
    ): FixedPoint {
        return {
            v: tokenYReserve.v.mul(this.DEFAULT_DENOMINATOR).div(tokenXReserve.v),
        };
    };

    public getAccountsForUpdate(): PublicKey[] {
        return [this.poolAddress];
    }

    public update(accountInfoMap: AccountInfo<Buffer>[]): void {
        const [poolAccountInfo] = Object.values(accountInfoMap);
        const pool = this.decodePoolState(poolAccountInfo);
        console.log(pool);
        this.pool = pool;
        // this.tokenAccounts = tokenAccountInfos.map((info) => {
        //     const tokenAccount = deserializeAccount(info.data);
        //     if (!tokenAccount) {
        //       throw new Error('Invalid token account');
        //     }
        //     return tokenAccount;
        //   });
    }

    public getQuote(quoteParams: QuoteParams): Quote {
        const { sourceMint, destinationMint, amount, swapMode } = quoteParams;
        const { tokenX, tokenY, tokenXReserve, tokenYReserve } = this.pool;


        const sourceReserve = sourceMint.equals(tokenX) ? tokenXReserve : tokenYReserve;
        const destinationReserve = destinationMint.equals(tokenX) ? tokenXReserve : tokenYReserve;
        const xToY = sourceMint.equals(tokenX);
        const price = Math.pow(this.calculatePrice(tokenXReserve, tokenYReserve).v.toNumber(), xToY ? 1 : -1);
        const deltaIn = { v: new BN(amount.toString()) };

        const notEnoughLiquidity = deltaIn.v.toNumber() * price > destinationReserve.v.toNumber();
        if (notEnoughLiquidity) {
            return {
                notEnoughLiquidity: notEnoughLiquidity,
                inAmount: amount,
                outAmount: JSBI.BigInt(0),
                feeAmount: JSBI.BigInt(0),
                feeMint: xToY ? tokenY : tokenX,
                feePct: 0,
                priceImpactPct: 0,
            } as Quote;
        }
        const [outAmount, feeAmount, feePct] = this.getOutputAmounts(deltaIn, this.pool, xToY);
        const priceImpactPct = this.calculatePriceImpact(deltaIn, price, xToY);
        return {
            notEnoughLiquidity: notEnoughLiquidity,
            inAmount: amount,
            outAmount: outAmount,
            feeAmount: feeAmount,
            feeMint: xToY ? tokenY : tokenX,
            feePct: feePct,
            priceImpactPct: priceImpactPct,
        }
    }

    public createSwapInstructions(swapParams: SwapParams): TransactionInstruction[] {


        // const stateAddress = new PublicKey("CSeECogtLCCf2B5EVECkEvFaUwJnH2UZYMjJFLQYWLsb");
        // const poolAddress = this.xToY ? this.getPoolAddress(swapParams.sourceMint, swapParams.destinationMint) : this.getPoolAddress(swapParams.destinationMint, swapParams.sourceMint);
        // const tokenX = this.xToY ? swapParams.sourceMint : swapParams.destinationMint;
        // const tokenY = this.xToY ? swapParams.destinationMint : swapParams.sourceMint;
        // const swapperXAccount = this.xToY ? swapParams.userSourceTokenAccount : swapParams.userDestinationTokenAccount;
        // const swapperYAccount = this.xToY ? swapParams.userDestinationTokenAccount : swapParams.userSourceTokenAccount;
        // const programAuthority = new PublicKey("BKWZjWB4jrqJJgSJBNeRJSKtDXRFpnon7Fm14RYLRMu5");

        // return [this.program.instruction.swap(swapParams.inAmount, this.priceLimit, this.xToY, {
        //     accounts: {
        //         state: stateAddress,
        //         pool: poolAddress,
        //         tokenX,
        //         tokenY,
        //         poolXAccount: this.pool.poolXAccount,
        //         poolYAccount: this.pool.poolYAccount,
        //         swapperXAccount,
        //         swapperYAccount,
        //         swapper: swapParams.userTransferAuthority,
        //         referrerXAccount: this.referrerSourceTokenAccount,
        //         referrerYAccount: this.referrerDestinationTokenAccount,
        //         referrer: this.referrer,
        //         programAuthority,
        //         systemProgram: SystemProgram.programId,
        //         tokenProgram: TOKEN_PROGRAM_ID,
        //         associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        //         rent: SYSVAR_RENT_PUBKEY
        //     },
        // })];
        return [] as TransactionInstruction[];
    }
}