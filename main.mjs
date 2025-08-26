import { CoinMarketCap } from 'ts-coinmarketcap';

// If you are using a Pro API endpoint, you need to provide an API key.
const client = new CoinMarketCap({ apiKey: 'b5a1d0f4-514d-4976-9c67-9f0d953c5068' });

try {
  const response = await client.v2.quotes.getQuotesLatest({ symbol: 'ETH' });
  // The key for the data object is the cryptocurrency's CoinMarketCap ID.
  // Bitcoin's ID is 1.
  const btcData = response.data['1'];
  if (btcData && btcData.quote['USD']) {
    console.log(
      `The current price of Bitcoin is: $${btcData.quote['USD'].price.toFixed(2)}`
    );
  } else {
    console.log('Could not retrieve Bitcoin price data.');
  }
} catch (error) {
  console.error('Error fetching Bitcoin price:', error);
}
