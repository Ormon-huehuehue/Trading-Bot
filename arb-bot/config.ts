require('dotenv').config({})

const ETH_PRIVATE_KEY = process.env.POLYMARKET_PRIVATE_KEY;

console.log("ETH_PRIVATE_KEY : ", ETH_PRIVATE_KEY)

export { ETH_PRIVATE_KEY }