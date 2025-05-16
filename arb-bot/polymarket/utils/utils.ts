import { clobClient, signer } from "./lib"
import { ETH_PRIVATE_KEY } from "../../config";
import { ethers } from "ethers";
import { getContractConfig } from "@polymarket/clob-client";
import { ctfAbi } from "../abi/ctfAbi";
import { usdcAbi} from "../abi/usdcAbi"


console.log("key : ", process.env.POLYMARKET_PRIVATE_KEY)

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
    console.log("key : ", ETH_PRIVATE_KEY)
    const usdc = getUsdcContract(true, wallet)
    console.log("usdc : ", await usdc.getAddress())
    const ctf = getCtfContract(true, wallet)
    console.log("ctf : ", await ctf.getAddress())

    const udscAllowanceCtf = await usdc.allowance(wallet.address, await ctf.getAddress())
    console.log("usdc allowance : ", udscAllowanceCtf)

}

const createOrder = ()=>{

}

export {
    approveAllowance,
    createOrder
}