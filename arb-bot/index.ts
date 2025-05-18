require("dotenv")
import { clobClient } from "./polymarket/utils/lib";
import { Side } from "@polymarket/clob-client";
import { approveAllowance } from "./polymarket/utils/utils";
import { getProboOrderBook } from "./probo/utils/utils";

const TOKEN_ID = "104173557214744537570424345347209544585775842950109756851652855913015295701992";

await getProboOrderBook(4050195);

// approveAllowance();



const orderbook = await clobClient.getOrderBook( TOKEN_ID);
// console.log("orderbooks", orderbook);

// Create a buy order for 100 NO for 0.50c
const order = await clobClient.createOrder({
    tokenID: TOKEN_ID,
    price: 0.1,
    side: Side.BUY,
    size: 5,
    feeRateBps: 0,
});

// console.log("Order : ", order)

// const placeOrderResponse = await clobClient.postOrder(order)

// console.log("place order response : ", placeOrderResponse)

	// /v1/checkout/userId/0xB763235228e208eF655dc3Ec24d13B07303c0F55
//market 0xfa48a99317daef1654d5b03e30557c4222f276657275628d9475e141c64b545d


