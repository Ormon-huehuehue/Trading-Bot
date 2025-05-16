import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import { Chain, ClobClient, Side, type ApiKeyCreds } from "@polymarket/clob-client";

const ETH_PRIVATE_KEY=process.env.POLYSCAN_PRIVATE_KEY;

if(!ETH_PRIVATE_KEY){
    throw new Error("Private key is not set")
}

const host = process.env.CLOB_API_URL || "https://clob.polymarket.com";

const signer = new Wallet(ETH_PRIVATE_KEY);

const creds: ApiKeyCreds = {
    key: `${process.env.CLOB_API_KEY}`,
    secret: `${process.env.CLOB_SECRET}`,
    passphrase: `${process.env.CLOB_PASS_PHRASE}`,
};

const TOKEN_ID = "82166576079764006761825181275046720651902024375882554924066032642626349601858";


const chainId = parseInt(`${process.env.CHAIN_ID || Chain.POLYGON}`) as Chain;


const clobClient = new ClobClient(host, chainId, signer);

const tokenIds = ["82166576079764006761825181275046720651902024375882554924066032642626349601858", "88634212839177629881904812415362988110512683891896837917752990343452841586516"]

const orderbook = await clobClient.getOrderBook( TOKEN_ID);
console.log("orderbooks", orderbook);



// Create a buy order for 100 NO for 0.50c
const order = await clobClient.createOrder({
    tokenID: TOKEN_ID,
    price: 0.5,
    side: Side.BUY,
    size: 5,
    feeRateBps: 0,
});

console.log("Order : ", order)



	// /v1/checkout/userId/0xB763235228e208eF655dc3Ec24d13B07303c0F55
//market 0xfa48a99317daef1654d5b03e30557c4222f276657275628d9475e141c64b545d


