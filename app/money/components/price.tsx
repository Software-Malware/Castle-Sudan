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
    const interval = setInterval(fetchPrice, 1200000);
    return () => clearInterval(interval);
  }, [fetchPrice]);

  const formatTime = (timestamp: string) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className=" text-center items-center justify-center flex">
      <button className="bg-gradient-to-br from-[#f8e6c9] to-[#e9d3ae] text-center rounded-4xl block items-center flex justify-center  px-1 py-2">
        {isFetching ? (
          <div className=" items-center px-4 py-2 rounded">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
            <span className="text-base-content/70">Loading...</span>
          </div>
        ) : (
          <div className=" items-center text-center ">
            <span className="text-xl font-bold text-green-600">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
     </button>
    </div>
  );
};

export default EthereumPriceDisplay;