// hooks/useCryptoPrice.ts
import { useQuery } from '@tanstack/react-query';

export const useCryptoPrice = (symbol: string = 'ETH') => {
  return useQuery({
    queryKey: ['crypto-price', symbol],
    queryFn: async () => {
      const response = await fetch(`/api/crypto-price?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }
      return response.json();
    },
    refetchInterval: 60000, // Refetch every minute
  });
};