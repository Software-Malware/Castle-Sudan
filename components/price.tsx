// components/EthereumPriceDisplay.tsx
'use client';

import { useEffect } from 'react';
import { useEthereumPrice } from '@/store/store';

const EthereumPriceDisplay = () => {
  const { price, isFetching, lastUpdated, fetchPrice } = useEthereumPrice();

  useEffect(() => {
    // Fetch price on component mount
    fetchPrice();
    
    // Set up periodic refresh every 60 seconds
    const interval = setInterval(fetchPrice, 120000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  const formatTime = (timestamp: string) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-base-200 rounded-lg shadow-md border border-base-300">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-2">
          <span className="text-white font-bold text-xs">ETH</span>
        </div>
        <div>
          <h2 className="text-base font-semibold">Ethereum Price</h2>
          <p className="text-sm text-base-content/60">Live Mainnet</p>
        </div>
      </div>
      
      <div className="flex-1 text-center sm:text-right">
        {isFetching ? (
          <div className="inline-flex items-center justify-center sm:justify-end">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            <span className="text-base-content/70">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center sm:items-end">
            <span className="text-xl font-bold text-success">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EthereumPriceDisplay;