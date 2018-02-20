# node-red-contrib-coinspot
A [Node RED](https://nodered.org/) Wrapper of the [Coinspot API](https://www.coinspot.com.au/api)
Please Understand the risks associated with trading cryptocurrencies 
Some nodes may require you to complete coinspot's varification process inorder to function, for example "Buy" and "Sell"



## How to use

1. Get a CoinSpot API key and secret from [here](https://www.coinspot.com.au/login)
2. Insert any Coinspot node into the workspace
3. Open the nodes properties and click the "new coinspot credentials" button
4. Enter key and secret and save
5. Select the new credentials from the drop down list
6. Either Fill the remaining details OR ensure the incoming msg object includes msg.cointype msg.amount etc

## Input Message
msg.cointype must be the coin shortname, example value 'BTC', 'LTC', 'DOGE', 'ETH'
msg.amount must be a positive number with upto 6 digits of precission
msg.adress must be a string containing the adress you intend to deposit coins into
msg.rate follows the same constraints as amount and is the minimum or maximum you are willing to sell or buy a coin for respectivly 

## Output Message

msg.payload will be discarded and replaced with the passed JSON string reply from coinspot or the whole error message




