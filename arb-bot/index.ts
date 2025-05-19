require("dotenv")
import { clobClient } from "./polymarket/utils/lib";
import { Side } from "@polymarket/clob-client";
import { approveAllowance, getPolymarketOrderBook } from "./polymarket/utils/utils";
import { getProboOrderBook } from "./probo/utils/utils";
import type { OrderBookProps } from "./types";

// const TOKEN_ID = "104173557214744537570424345347209544585775842950109756851652855913015295701992";
const TOKEN_ID = "72590024726245493077522454398168089576836207607927418208000602748203871211427"
// get token id from /prices-history

const proboBook = await getProboOrderBook(4050195);

// approveAllowance();


const polymarketBook = await getPolymarketOrderBook(TOKEN_ID)

// Create a buy order for 100 NO for 0.50c
const order = await clobClient.createOrder({
    tokenID: TOKEN_ID,
    price: 0.1,
    side: Side.BUY,
    size: 5,
    feeRateBps: 0,
});


const EXPECTED_ARB_PERCENT = 5;
const DOLLAR_PRICE = 85;

// book1 = Rs ( probo ) || book2 = $ ( polymarket )
const findAndExecuteArb1 = (proboBook : OrderBookProps, polymarketBook : OrderBookProps)=>{
	//best price on probo
	const p1 = Object.keys(proboBook.buy).filter(price => Number(proboBook.buy[Number(price)])> 0).map(Number).sort((a,b)=> b-a).pop()! // sort all the prices
	console.log("p1 : ", p1)
	//best price on polymarket ( usually in cents)
	const p2 = Object.keys(polymarketBook.buy).filter(price => Number(polymarketBook.buy[Number(price)])> 0).map(Number).sort((a,b)=> b-a).pop()! // sort all the prices
	console.log("p2 : ", p2)
	// if ( p1 + p2/10 < 10){	// arb exists
	// 	let q1 = 
	// }	

}

const findAndExecuteArb2 = (proboBook : OrderBookProps, polymarketBook : OrderBookProps)=>{
	//best price on probo
	const p1 = Object.keys(proboBook.sell).filter(price => Number(proboBook.sell[Number(price)])> 0).map(Number).sort((a,b)=> b-a).pop()! // sort all the prices
	console.log("p1 : ", p1)
	//best price on polymarket ( usually in cents)
	const p2 = Object.keys(polymarketBook.sell).filter(price => Number(polymarketBook.sell[Number(price)])> 0).map(Number).sort((a,b)=> b-a).pop()! // sort all the prices
	console.log("p2 : ", p2)


	if ( 10 - (p1 + p2*10) >= EXPECTED_ARB_PERCENT/10){	// arb exists
		console.log("Arb : ", 10 - (p1 + p2*10))
		console.log("arb found")
	}	
	else{
		console.warn("Arb not found")
	}

}

const proboTestBook = {
	buy : {
		"4.8" : "100",
	},
	sell : {
		"5.3" : "100"
	}
}

const polyTestBook = {
	buy : {
		"0.4" : "100",
	},
	sell : {
		"0.6" : "100"
	}
}

// findAndExecuteArb2(proboTestBook, polyTestBook)

findAndExecuteArb1(proboBook, polymarketBook)




// console.log("Order : ", order)

// const placeOrderResponse = await clobClient.postOrder(order)

// console.log("place order response : ", placeOrderResponse)

	// /v1/checkout/userId/0xB763235228e208eF655dc3Ec24d13B07303c0F55
//market 0xfa48a99317daef1654d5b03e30557c4222f276657275628d9475e141c64b545d


