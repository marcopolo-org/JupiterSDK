import MarcoPoloAMM from "./jupSDK";
import { Connection, PublicKey } from "@solana/web3.js";
import JSBI from "jsbi";

import dotenv from "dotenv";
dotenv.config();

const test = async () => {
    const poolAddress = new PublicKey("");
    const connection = new Connection("");
    const poolInfo = await connection.getAccountInfo(poolAddress);
    const MPAmm = new MarcoPoloAMM(poolAddress, poolInfo, {});

    const accountsToUpdate = MPAmm.getAccountsForUpdate();
    const updateAccountsInfo = await connection.getMultipleAccountsInfo(accountsToUpdate);
    const updateAMM = await MPAmm.update(updateAccountsInfo);

    const tokenIn = new PublicKey("DUSTawucrTsGU8hcqRdHDCbuYhCPADMLM2VcCb8VnFnQ");
    const tokenOut = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const amount = JSBI.BigInt(10);
    const quoteParams = {
        sourceMint: tokenIn,
        destinationMint: tokenOut,
        amount: amount,
        swapMode: ""
    }
    const quote = await MPAmm.getQuote(quoteParams);
    console.log(quote);
}

test();