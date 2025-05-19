import axios from "axios";
import type { OrderBookProps } from "../../types";


const getProboOrderBook = async (eventId: number) =>{
    const headers = {
        "authority" : "prod.api.probo.in",
        "Authorization" : `Bearer ${process.env.PROBO_AUTHORIZATION_TOKEN}`,
        "content-type" : "application/json"
    }

    const response = await axios.get(`https://prod.api.probo.in/api/v3/tms/trade/bestAvailablePrice?eventId=${eventId}`,
        {
            headers
        }
    )

    let book : OrderBookProps = { buy : {}, sell : {}}

    Object.keys(response.data.data.available_qty.buy).forEach((key : string, index)=>{
        book.buy[key] = response.data.data.available_qty.buy[key];
    })
    Object.keys(response.data.data.available_qty.sell).forEach((key : string, index)=>{
        book.sell[key] = response.data.data.available_qty.sell[key];
    })

    return book;

}



const placeOrderProbo = async (eventId : number, offerType : "buy" | "sell", quantity : number, price : number  )=>{
    const response = await axios.post("https://prod.api.probo.in/api/v1/oms/order/initiate", {
        "headers": {
          "accept": "*/*",
          "accept-language": "en,en-US;q=0.9,sv;q=0.8",
          "appid": "in.probo.pro",
          "authorization": `Bearer ${process.env.PROBO_AUTHORIZATION_TOKEN}`,
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"135\", \"Not-A.Brand\";v=\"8\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-device-os": "ANDROID",
          "x-version-name": "10",
          "Referer": "https://probo.in/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": {
            "event_id": eventId,
            "offer_type": offerType,
            "order_type": "LO",
            "l1_order_quantity": quantity,
            "l1_expected_price": price,
            "advanced_options": {
              "auto_cancel": {
                "minutes": 2,
                "disable_trigger": true 
              },
              "book_profit": {
                "price": 1,
                "quantity": 1,
                "disable_trigger": true
              },
              "stop_loss": {
                "price": 0.5,
                "quantity": 1,
                "disable_trigger": true
              }
            }
          }          
      });
}


export { getProboOrderBook}