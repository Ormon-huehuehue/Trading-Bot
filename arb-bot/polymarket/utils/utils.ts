import { clobClient, signer } from "./lib"
import { ETH_PRIVATE_KEY } from "../../config";
import { ethers, MaxUint256 } from "ethers";
import { getContractConfig, Chain } from "@polymarket/clob-client";
import { ctfAbi } from "../abi/ctfAbi";
import { usdcAbi} from "../abi/usdcAbi"
import type { OrderBookProps } from "../../types";

if(!ETH_PRIVATE_KEY){
    throw new Error("Private key is not set")
}

export function getUsdcContract(mainnetQ: boolean, wallet: ethers.Wallet): ethers.Contract {
    const chainId = mainnetQ ? 137 : 80002;
    const contractConfig = getContractConfig(chainId);
    return new ethers.Contract(contractConfig.collateral, usdcAbi, wallet);
}

export function getCtfContract(mainnetQ: boolean, wallet: ethers.Wallet): ethers.Contract {
    const chainId = mainnetQ ? 137 : 80002;
    const contractConfig = getContractConfig(chainId);
    return new ethers.Contract(contractConfig.conditionalTokens, ctfAbi, wallet);
}

const provider = new ethers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/alcht_c8IgvSAoAaoVfkmuPqoZ6ubKdgV6Mo"); // for Mumbai testnet
const wallet = new ethers.Wallet(ETH_PRIVATE_KEY, provider);




const approveAllowance = async  ()=>{
    const usdc = getUsdcContract(true, wallet)
    const contractConfig = getContractConfig(Chain.POLYGON) //polygon
    const txn = await usdc.approve(contractConfig.conditionalTokens, MaxUint256, {
        gasPrice : 100_000_000_000,
        gasLimit:  200_000,
    })
    console.log("transaction : ", txn)

    console.log("Setting usdc allowance for CTF : ", txn.hash)
    await txn.wait();
    // console.log("usdc : ", await usdc.getAddress())
    const ctf = getCtfContract(true, wallet)
    // console.log("ctf : ", await ctf.getAddress())

    const udscAllowanceCtf = await usdc.allowance(wallet.address, await ctf.getAddress())
    console.log("usdc allowance : ", udscAllowanceCtf)

}

const getPolymarketOrderBook = async (tokenId : string)=>{
    const response = await clobClient.getOrderBook(tokenId);
    let book : OrderBookProps = { buy : {}, sell : {}}

    response.bids.map((bid : {price : string, size : string}) =>{
        book.buy[bid.price] = bid.size;
    })
    response.asks.map((ask : {price : string, size : string}) =>{
        book.sell[ask.price] = ask.size;
    })

    console.log("Polymarket order book : ", book)

    return book

}

const createOrder = async  ()=>{
  
    

}

export {
    approveAllowance,
    createOrder,
    getPolymarketOrderBook
}