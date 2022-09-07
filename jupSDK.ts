import { BN, Program, Provider, utils, StateCoder, Wallet, BorshAccountsCoder, BorshStateCoder } from "@project-serum/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, TransactionInstruction, AccountInfo, Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Keypair } from "@solana/web3.js";
import { IDL, Marcopolo } from "./idl/marcopolo";
import JSBI from "jsbi";
import { AnchorProvider } from "@project-serum/anchor/dist/cjs/provider";



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

export interface MyParams {
}

interface Amm {
    /* Reserve token mints for the purpose of routing, usually only 2 elements */
    reserveTokenMints: PublicKey[];
    getAccountsForUpdate(): PublicKey[];
    update(accountInfoMap: any): void;
    getQuote(quoteParams: QuoteParams): Quote;
    createSwapInstructions(swapParams: SwapParams): TransactionInstruction[];
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


    constructor(
        address: PublicKey, accountInfo: AccountInfo<Buffer>, params: MyParams
    ) {
        this.programID = this.poolAddress = address;
        this.programIDL = IDL;
        this.program = new Program(this.programIDL, this.programID, new AnchorProvider(new Connection("https://api.mainnet-beta.solana.com"), new Wallet(Keypair.generate()), AnchorProvider.defaultOptions()));
        this.pool = this.decodePoolState(accountInfo);
        this.reserveTokenMints = [this.pool.tokenX, this.pool.tokenY];
        // console.log(this.program);
    }

    private decodePoolState(accountInfo: AccountInfo<Buffer>) {
        const pool = this.program.coder.accounts.decode("pool", accountInfo.data)
        return pool as PoolStructure;
    }

    private getDeltaOut(deltaIn: Token, xToY: boolean) {
        let denominator = xToY
            ? deltaIn.v.add(this.pool.tokenXReserve.v)
            : deltaIn.v.add(this.pool.tokenYReserve.v);

        let fraction = this.pool.constK.v.div(denominator);
        let deltaOut = {
            v: xToY
                ? this.pool.tokenYReserve.v.sub(fraction)
                : this.pool.tokenXReserve.v.sub(fraction)
        };
        return deltaOut;
    }
    private getFeeAmountAndPct(deltaOut: Token, xToY: boolean): [BN, number] {
        let lpFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.lpFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let buybackFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.buybackFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let projectFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.projectFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        let mercantiFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.mercantiFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };

        const totalFeeAmount = lpFeeAmount.v.add(buybackFeeAmount.v).add(projectFeeAmount.v).add(mercantiFeeAmount.v);
        console.log("totalFeeAmount", totalFeeAmount.toNumber());
        if (
            totalFeeAmount
                .gt(deltaOut.v)
        ) {
            throw new Error("Fees exceed deltaOut");
        }
        const feePct = totalFeeAmount.toNumber() / deltaOut.v.toNumber();
        console.log("feePct", feePct);
        return [totalFeeAmount, feePct];
    }

    private calculatePriceImpact(deltaIn: Token, deltaOut: Token, initialPrice: FixedPoint, xToY: boolean) {


        const fromTokenSwap = deltaIn;
        const toTokenSwap = deltaOut;
        console.log("fromTokenSwap", fromTokenSwap.v.toNumber());
        console.log("toTokenSwap", toTokenSwap.v.toNumber());

        const rawPoolTokenXReserveDelta = xToY ? this.pool.tokenXReserve.v.add(fromTokenSwap.v) : BN.max((this.pool.tokenXReserve.v.sub(toTokenSwap.v)), new BN(0));
        console.log("rawPoolTokenXReserveDelta", rawPoolTokenXReserveDelta.toNumber());

        const rawPoolTokenYeserveDelta = xToY ? BN.max((this.pool.tokenYReserve.v.sub(toTokenSwap.v)), new BN(0)) : (this.pool.tokenYReserve.v.add(fromTokenSwap.v));

        console.log("rawPoolTokenYeserveDelta", rawPoolTokenYeserveDelta.toNumber());

        const poolTokenXReserveDelta = { v: rawPoolTokenXReserveDelta };
        const poolTokenYReserveDelta = { v: rawPoolTokenYeserveDelta };

        console.log("poolTokenXReserveDelta", poolTokenXReserveDelta.v.toNumber());
        console.log("poolTokenYReserveDelta", poolTokenYReserveDelta.v.toNumber());

        console.log("priceBeforeSwap", initialPrice.v.toNumber());

        const priceAfterSwap = BN.max(this.calculatePrice(poolTokenXReserveDelta, poolTokenYReserveDelta).v, new BN(0));
        console.log("priceAfterSwap", priceAfterSwap.toNumber());


        const priceDelta =(initialPrice.v.sub(priceAfterSwap).toNumber());
        console.log("priceDelta", priceDelta);

        const priceImpactRaw = priceDelta / initialPrice.v.toNumber();
        console.log("priceImpactRaw", priceImpactRaw);
        const priceImpactPct = Math.min((priceImpactRaw*100), 100);
        console.log("priceImpactPercent", priceImpactPct);
        return priceImpactPct;
    }
    private calculatePrice(
        tokenXReserve: Token,
        tokenYReserve: Token
    ): FixedPoint {
        return {
            v: tokenYReserve.v.mul(this.DEFAULT_DENOMINATOR).div(tokenXReserve.v),
        };
    };

    private getYAmount = (xAmount: Token, price: FixedPoint): Token => {
        return { v: xAmount.v.mul(price.v).div(this.DEFAULT_DENOMINATOR) };
    };

    private getXAmount = (yAmount: Token, price: FixedPoint): Token => {
        return { v: yAmount.v.mul(this.DEFAULT_DENOMINATOR).div(price.v) };
    };
    public getAccountsForUpdate(): PublicKey[] {
        return [this.poolAddress];
    }

    public getQuote(quoteParams: QuoteParams): Quote {

        console.log("quoteParams", quoteParams);

        const { sourceMint, destinationMint, amount, swapMode } = quoteParams;
        const { tokenX, tokenY, tokenXReserve, tokenYReserve } = this.pool;
        console.log({
            tokenX: tokenX.toString(),
            tokenY: tokenY.toString(),
            tokenXReserve: tokenXReserve.v.toString(),
            tokenYReserve: tokenYReserve.v.toString()
        });

        const xToY = sourceMint.equals(tokenX);
        const sourceReserve = xToY ? tokenXReserve : tokenYReserve;
        const destinationReserve = xToY ? tokenXReserve : tokenYReserve;
        const initialPrice = this.calculatePrice(tokenXReserve, tokenYReserve);
        const deltaIn = { v: new BN(amount.toString()) };

        const deltaOut = this.getDeltaOut(deltaIn, xToY);

        console.log("Price", initialPrice.v.toNumber());
        console.log("deltaIn", deltaIn.v.toNumber());
        console.log("deltaOut", deltaOut.v.toNumber());

        const [feeAmount, feePct] = this.getFeeAmountAndPct(deltaOut, xToY);
        const outAmount = JSBI.BigInt(deltaOut.v.sub(feeAmount).toString());

        console.log("OutAmount", outAmount.toString());

        const notEnoughLiquidity = deltaOut.v.gt(destinationReserve.v);
        if (notEnoughLiquidity) {
            return {
                notEnoughLiquidity: notEnoughLiquidity,
                inAmount: amount,
                outAmount: JSBI.BigInt(0),
                feeAmount: JSBI.BigInt(0),
                feeMint: destinationMint,
                feePct: 0,
                priceImpactPct: 0,
            } as Quote;
        }

        const priceImpactPct = this.calculatePriceImpact(deltaIn, deltaOut, initialPrice, xToY);
        console.log("priceImpactPct", priceImpactPct);
        return {
            notEnoughLiquidity: notEnoughLiquidity,
            inAmount: amount,
            outAmount: outAmount,
            feeAmount: feeAmount,
            feeMint: destinationMint,
            feePct: feePct,
            priceImpactPct: priceImpactPct,
        }
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