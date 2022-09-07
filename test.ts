import MarcoPoloAMM, { MyParams } from "./jupSDK";
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";
import dotenv from "dotenv";
import { getMint } from "@solana/spl-token";
dotenv.config();

const test = async () => {
    const poolAddress = new PublicKey("7ZWeAB277CTSVxSmMxhGr4HM79YL65MVtDe4QTFGDdup");
    const connection = new Connection(process.env.RPC_URL as string);
    const poolInfo = await connection.getAccountInfo(poolAddress);
    const MPAmm = new MarcoPoloAMM(poolAddress, poolInfo as AccountInfo<Buffer>, {} as MyParams);

    const accountsToUpdate = MPAmm.getAccountsForUpdate();
    const updateAccountsInfo = await connection.getMultipleAccountsInfo(accountsToUpdate);
    const updateAMM = MPAmm.update(updateAccountsInfo as AccountInfo<Buffer>[]);

    const tokenIn = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const tokenOut = new PublicKey("DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ");
    const amount = 10;
    const tokenInAmount = JSBI.BigInt(amount * (10** (await getMint(connection, tokenIn)).decimals));

    const quoteParams = {
        sourceMint: tokenIn,
        destinationMint: tokenOut,
        amount: tokenInAmount,
        swapMode: ""
    }
    const quote = MPAmm.getQuote(quoteParams);
    console.log(quote);
    return;
}

test();