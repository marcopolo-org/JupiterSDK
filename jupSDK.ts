import { BN, Program, Provider, utils, StateCoder, Wallet, BorshAccountsCoder, BorshStateCoder } from "@project-serum/anchor";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PublicKey, TransactionInstruction, AccountInfo, Connection, SystemProgram, SYSVAR_RENT_PUBKEY, Keypair } from "@solana/web3.js";
import { IDL, Marcopolo } from "./idl/marcopolo";
import JSBI from "jsbi";
import { AnchorProvider } from "@project-serum/anchor/dist/cjs/provider";

// ----------------
//Required types
// ----------------

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

export interface MyParams {
}

// ----------------
// Custom types
// ----------------

export type TokenMintAddress = PublicKey;
export type SwapMode = any;

// Pool state interface
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
    farmCount: BN;
    bump: number;
}

// Standardizes decimals
export interface FixedPoint {
    v: BN;
}

// Stores the token amount as a big number
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


// Implementation preferred constructor params
export default class MarcoPoloAMM implements Amm {

    // ----------------
    // Class variables
    // ----------------

    // Stores the pubkeys of the tokenX and tokenY mints
    public reserveTokenMints: PublicKey[];

    // Stores the pool state
    public pool: PoolStructure;

    // public tokenAccounts: PublicKey[]

    // Stores the pool address
    public poolAddress: PublicKey;
    
    // Stores the programID
    private programID = new PublicKey("9tKE7Mbmj4mxDjWatikzGAtkoWosiiZX9y6J4Hfm2R8H");

    // Stores the programIDL for decoding the pool state
    private programIDL = IDL;

    // Stores the programAuth for creating the swap instruction
    private programAuthority = new PublicKey("JM78XNzeQRmZXDAP4DSq88ZdErbuSXSLE6fkRsVDKSu");

    //Stores the state address for creating the swap instruction
    private stateAddress = new PublicKey("BE5YRQ6N6LCw7UL3JwzVp317EWa4mzJY6JKDaudcXu7A");

    //Stores the referrer wallet (Should be the Jupiter Ag Wallet)
    private referrer = new PublicKey("MaPoNRu6RgbTkE978RYGuaXKobsciLLTDdgL6juqh68");

    // Stores the program for decoding the pool state
    private program: Program<Marcopolo>;

    //Stores the default denominator for the price calculation
    private DEFAULT_DENOMINATOR = new BN(10).pow(new BN(12));


    // ----------------
    // Constructor
    // ----------------

    constructor(
        address: PublicKey, accountInfo: AccountInfo<Buffer>, params: MyParams
    ) {
        this.poolAddress = address;
        this.programIDL = IDL;
        this.program = new Program(this.programIDL, this.programID, new AnchorProvider(new Connection("https://api.mainnet-beta.solana.com"), new Wallet(Keypair.generate()), AnchorProvider.defaultOptions()));
        this.pool = this.decodePoolState(accountInfo);
        this.reserveTokenMints = [this.pool.tokenX, this.pool.tokenY];
    }

    // ----------------
    // Custom helper methods
    // ----------------

    // Decodes the pool account info into a PoolStructure
    private decodePoolState(accountInfo: AccountInfo<Buffer>) {
        const pool = this.program.coder.accounts.decode("pool", accountInfo.data)
        return pool as PoolStructure;
    }

    // Returns the deltaOut given the current pool state and the deltaIn, checking if it's an x->y or y->x swap
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

    // Returns the total amount of fees charged and the total percent of fees charged as a function of the deltaOut
    private getFeeAmountAndPct(deltaOut: Token, xToY: boolean): [BN, number] {

        // Gets the amount of fees going to the Liquidity Providers
        let lpFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.lpFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        //Gets the amount of fees going to the Marco Polo Team
        let buybackFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.buybackFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        //Gets the amount of fees going to the partnered Project Owner
        let projectFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.projectFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };
        //Gets the amount of fees going to the referrer (Will be paid out permissionlessly within the swap instruction)
        let mercantiFeeAmount: Token = {
            v: deltaOut.v
                .mul(this.pool.mercantiFee.v)
                .add(this.DEFAULT_DENOMINATOR.subn(1))
                .div(this.DEFAULT_DENOMINATOR),
        };

        // Gets the total amount of fees charged by summing the big numbers
        const totalFeeAmount = lpFeeAmount.v.add(buybackFeeAmount.v).add(projectFeeAmount.v).add(mercantiFeeAmount.v);

        // Checks if the totalFeeAmount exceeds the deltaout (Should never happen)
        if (
            totalFeeAmount
                .gt(deltaOut.v)
        ) {
            throw new Error("Fees exceed deltaOut");
        }

        // Gets the total percent of fees charged by dividing the totalFeeAmount by the deltaOut
        const feePct = totalFeeAmount.toNumber() / deltaOut.v.toNumber();
        return [totalFeeAmount, feePct];
    }


    // Calculates the priceImpact of a swap using the deltaIn and deltaOut, as well as the initial price and whether it's a tokenX to tokenY swap, or a tokenX to tokenY swap
    private calculatePriceImpact(deltaIn: Token, deltaOut: Token, initialPrice: FixedPoint, xToY: boolean) {

        // Calculates the difference in pool reserves, depending on whether it's a tokenX to tokenY swap, or a tokenX to tokenY swap
        const poolTokenXReserveDelta = { v: xToY ? this.pool.tokenXReserve.v.add(deltaIn.v) : BN.max((this.pool.tokenXReserve.v.sub(deltaOut.v)), new BN(0)) };
        const poolTokenYReserveDelta = { v: xToY ? BN.max((this.pool.tokenYReserve.v.sub(deltaOut.v)), new BN(0)) : (this.pool.tokenYReserve.v.add(deltaIn.v)) };

        // Calculates the new price of the pool if the swap took place, depending on whether it's a tokenX to tokenY swap, or a tokenX to tokenY swap
        const priceAfterSwap = BN.max(this.calculatePrice(poolTokenXReserveDelta, poolTokenYReserveDelta).v, new BN(0));

        // Calculates the raw price delta, which is the difference between the initial price and the price after the swap
        const priceDelta = Math.abs((initialPrice.v.sub(priceAfterSwap).toNumber()));

        // Calculates the price impact as a decimal of the initial price
        const priceImpactRaw = priceDelta / initialPrice.v.toNumber();

        // Converts the price impact decimal into a percent
        const priceImpactPct = Math.min((priceImpactRaw * 100), 100);
        return priceImpactPct;
    }


    // Returns the ratio of pool token Y to pool token X
    private calculatePrice(
        tokenXReserve: Token,
        tokenYReserve: Token
    ): FixedPoint {
        return {
            v: tokenYReserve.v.mul(this.DEFAULT_DENOMINATOR).div(tokenXReserve.v),
        };
    };

    // Returns the amount of tokenY given the current price and amount of tokenX
    private getYAmount = (xAmount: Token, price: FixedPoint): Token => {
        return { v: xAmount.v.mul(price.v).div(this.DEFAULT_DENOMINATOR) };
    };

    // Returns the amount of tokenX given the current price and amount of tokenY
    private getXAmount = (yAmount: Token, price: FixedPoint): Token => {
        return { v: yAmount.v.mul(this.DEFAULT_DENOMINATOR).div(price.v) };
    };

    // ----------------
    // Required interface methods
    // ----------------

    // Returns the necessary accounts to fetch (Only the pool, tokenX and tokenY account balances are stored on the pool state)
    public getAccountsForUpdate(): PublicKey[] {
        return [this.poolAddress];
    }

    // Returns the quote for a swap, given the swap params and the current pool state
    public getQuote(quoteParams: QuoteParams): Quote {
        // Dereferences the quoteParams for easier readability
        const { sourceMint, destinationMint, amount } = quoteParams;

        // Dereferences the relevant pool state for easier readability
        const { tokenX, tokenXReserve, tokenYReserve } = this.pool;

        // Checks if the swap is an x->y swap or y->x swap by comparing the source mint with the tokenX and tokenY mints
        const xToY = sourceMint.equals(tokenX);

        // If the swap is an x->y swap, the destination mint is tokenY, and vice versa
        const destinationReserve = xToY ? tokenYReserve : tokenXReserve;

        // Gets the current price token Y to token X (not affected by the swap direction)
        const initialPrice = this.calculatePrice(tokenXReserve, tokenYReserve);

        console.log("Initial Price: ", initialPrice.v.toString());
        // Converts the amount of sourceToken that will be swapped into a usable type
        const deltaIn = { v: new BN(amount.toString()) };

        // Gets the deltaOut of the swap by calculating the amount of destinationToken that will be received
        const deltaOut = this.getDeltaOut(deltaIn, xToY);

        // Checks if there is enough liquidity in the pool to complete the swap. If not, returns with true and zeroed out state
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


        // Calculates the fees of the swap using the deltaOut
        const [feeAmount, feePct] = this.getFeeAmountAndPct(deltaOut, xToY);

        // Calculates the actual out amount of the swap by subtracting the total fee amount from the deltaOut. This does not take slippage into consideration currently.
        const outAmount = JSBI.BigInt(deltaOut.v.sub(feeAmount).toString());

        // Calculates the price impact of the swap, can be used to warn the user of the price impact or determine routing. Comes out as a percentage.
        const priceImpactPct = this.calculatePriceImpact(deltaIn, deltaOut, initialPrice, xToY);
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

    // Updates the class state with the new pool state
    public update(accountInfoMap: AccountInfo<Buffer>[]): void {
        const [poolAccountInfo] = Object.values(accountInfoMap);
        const pool = this.decodePoolState(poolAccountInfo);
        // console.log(pool);
        this.pool = pool;
    }


    private getAssociatedTokenAddressSync = (mint: PublicKey, owner: PublicKey): PublicKey => {
        const [address] = PublicKey.findProgramAddressSync(
            [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
            ASSOCIATED_TOKEN_PROGRAM_ID
        );
        return address;
    }

    private getPriceAfterSlippage = (price: FixedPoint, slippage: FixedPoint, xToY: boolean): FixedPoint => {
        if (xToY) {
            return {
                v: price.v
                    .mul(this.DEFAULT_DENOMINATOR.sub(slippage.v))
                    .div(this.DEFAULT_DENOMINATOR),
            };
        } else {
            return {
                v: price.v
                    .mul(this.DEFAULT_DENOMINATOR.add(slippage.v))
                    .div(this.DEFAULT_DENOMINATOR),
            };
        }
    };

    private toFixedPoint = (amount: BN, decimal: BN): FixedPoint => {
        return {
            v: amount.mul(this.DEFAULT_DENOMINATOR.div(new BN(10).pow(decimal))),
        };
    };

    public createSwapInstructions(swapParams: SwapParams): TransactionInstruction[] {
        const { sourceMint, destinationMint, inAmount, userSourceTokenAccount, userDestinationTokenAccount, userTransferAuthority } = swapParams;

        // Dereferences the relevant pool state for easier readability
        const { tokenX, tokenY, price, tokenXReserve, tokenYReserve } = this.pool;

        // Checks if it's an X to Y or Y to X Swap based on source mint matching tokenX of the pool.
        const xToY = sourceMint.equals(tokenX);

        // Converts the amount in to a usable deltaIn
        const deltaIn = { v: new BN(inAmount.toString()) };

        // Assumes that the user has already approved the transfer, so the slippage is 100% (100 * 10**2)
        const slippage = this.toFixedPoint(new BN(100), new BN(2));
        // Gets the price after slippage
        const priceLimit = this.getPriceAfterSlippage(price, slippage, xToY);

        // Aligns the swapperX and swapperY accounts based on xToY
        const swapperXAccount = xToY ? userSourceTokenAccount : userDestinationTokenAccount;
        const swapperYAccount = xToY ? userDestinationTokenAccount : userSourceTokenAccount;

        // Derives the referrer source and destination ATAs. The code creates the ATA if they don't exist, but it's recommended to create them beforehand anyways, such as with handling wrapped SOL.
        const referrerSourceAccount = this.getAssociatedTokenAddressSync(sourceMint, this.referrer);
        const referrerDestinationAccount = this.getAssociatedTokenAddressSync(destinationMint, this.referrer);


        // Aligns the referrer x and y accounts based on xToY
        const referrerXAccount = xToY ? referrerSourceAccount : referrerDestinationAccount;
        const referrerYAccount = xToY ? referrerDestinationAccount : referrerSourceAccount;

        const swapIX = this.program.instruction.swap(deltaIn, priceLimit, xToY, {
            accounts: {
                state: this.stateAddress,
                pool: this.poolAddress,
                tokenX,
                tokenY,
                poolXAccount: this.pool.poolXAccount,
                poolYAccount: this.pool.poolYAccount,
                swapperXAccount,
                swapperYAccount,
                swapper: userTransferAuthority,
                referrerXAccount: referrerXAccount,
                referrerYAccount: referrerYAccount,
                referrer: this.referrer,
                programAuthority: this.programAuthority,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                rent: SYSVAR_RENT_PUBKEY
            },
        });
        return [swapIX] as TransactionInstruction[];
    }
}