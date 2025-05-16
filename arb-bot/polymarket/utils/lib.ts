import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import { Chain, ClobClient, Side, type ApiKeyCreds } from "@polymarket/clob-client";


export const ETH_PRIVATE_KEY=process.env.POLYMARKET_PRIVATE_KEY;

console.log("key  >>", ETH_PRIVATE_KEY)

if(!ETH_PRIVATE_KEY){
    throw new Error("Private key is not set")
}

const host = process.env.CLOB_API_URL || "https://clob.polymarket.com";

export const signer = new Wallet(ETH_PRIVATE_KEY);

const creds: ApiKeyCreds = {
    key: `${process.env.CLOB_API_KEY}`,
    secret: `${process.env.CLOB_SECRET}`,
    passphrase: `${process.env.CLOB_PASS_PHRASE}`,
};

const TOKEN_ID = "104173557214744537570424345347209544585775842950109756851652855913015295701992";


const chainId = parseInt(`${process.env.CHAIN_ID || Chain.AMOY}`) as Chain;


export const clobClient = new ClobClient(host, chainId, signer, creds);