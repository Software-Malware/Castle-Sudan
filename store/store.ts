import { create } from "zustand";
import scaffoldConfig from "@/store/scaffold.config";
import { ChainWithAttributes, NETWORKS_EXTRA_DATA } from "@/store/networks";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
    lastUpdated: string;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  setLastUpdated: (timestamp: string) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  fetchEthereumPrice: () => Promise<void>;
};

// Real Ethereum price service using CoinGecko API
const fetchEthereumPriceFromService = async (): Promise<number> => {
  try {
    // Using CoinGecko API to get real Ethereum price
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      {
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-cache' as RequestCache
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.ethereum.usd;
  } catch (error) {
    console.error('Failed to fetch from CoinGecko:', error);
    
    // Fallback to Coinbase API
    try {
      const response = await fetch(
        'https://api.coinbase.com/v2/prices/ETH-USD/spot',
        {
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-cache' as RequestCache
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return parseFloat(data.data.amount);
    } catch (fallbackError) {
      console.error('Failed to fetch from Coinbase:', fallbackError);
      throw new Error('All price APIs failed');
    }
  }
};

export const useGlobalState = create<GlobalState>((set, get) => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
    lastUpdated: '',
  },
  
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ 
      nativeCurrency: { 
        ...state.nativeCurrency, 
        price: newValue 
      } 
    })),
  
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ 
      nativeCurrency: { 
        ...state.nativeCurrency, 
        isFetching: newValue 
      } 
    })),
  
  setLastUpdated: (timestamp: string): void =>
    set(state => ({
      nativeCurrency: {
        ...state.nativeCurrency,
        lastUpdated: timestamp
      }
    })),
  
  targetNetwork: {
    ...scaffoldConfig.targetNetworks[0],
    ...NETWORKS_EXTRA_DATA[scaffoldConfig.targetNetworks[0].id],
  },
  
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => 
    set(() => ({ targetNetwork: newTargetNetwork })),
  
  fetchEthereumPrice: async (): Promise<void> => {
    const { setIsNativeCurrencyFetching, setNativeCurrencyPrice, setLastUpdated } = get();
    
    setIsNativeCurrencyFetching(true);
    
    try {
      const price = await fetchEthereumPriceFromService();
      setNativeCurrencyPrice(price);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Failed to fetch Ethereum price:', error);
      // Keep the existing price if fetch fails
    } finally {
      setIsNativeCurrencyFetching(false);
    }
  },
}));

// Utility hook for easy access to Ethereum price
export const useEthereumPrice = () => {
  const { nativeCurrency, fetchEthereumPrice } = useGlobalState();
  
  return {
    price: nativeCurrency.price,
    isFetching: nativeCurrency.isFetching,
    lastUpdated: nativeCurrency.lastUpdated,
    fetchPrice: fetchEthereumPrice,
    refreshPrice: fetchEthereumPrice,
  };
};

/*************  ✨ Windsurf Command ⭐  *************/
/*******  98348023-a066-45d2-b257-bdee470fc4a0  *******/  
/**
 * Updates the isFetching state of the native currency.
 * @param newValue boolean value to set the isFetching state to.
 */