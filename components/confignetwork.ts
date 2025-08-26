// confignetwork.ts
import { Chain } from 'viem/chains';
import { mainnet, hardhat, sepolia, } from 'viem/chains';

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExplorerUrl?: string;
}

export const SUPPORTED_CHAINS: NetworkConfig[] = [
  {
    chainId: 31337, // Hardhat
    name: 'Hardhat',
    rpcUrl: 'http://127.0.0.1:8545',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  {
    chainId: 11155111, // Sepolia
    name: 'Sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY || ''}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://sepolia.etherscan.io',
  },
  {
    chainId: 1, // Mainnet
    name: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY || ''}`,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrl: 'https://etherscan.io',
  },
  // Add more networks as needed
];

export const DEFAULT_CHAIN_ID = hardhat.id; // Hardhat as default

export function getNetworkConfig(chainId: number): NetworkConfig | undefined {
  return SUPPORTED_CHAINS.find(network => network.chainId === chainId);
}

export function getDefaultNetwork(): NetworkConfig {
  return SUPPORTED_CHAINS.find(network => network.chainId === DEFAULT_CHAIN_ID) || SUPPORTED_CHAINS[0];
}

export function isChainSupported(chainId: number): boolean {
  return SUPPORTED_CHAINS.some(network => network.chainId === chainId);
}

export function networkConfigToChain(config: NetworkConfig): Chain {
  return {
    id: config.chainId,
    name: config.name,
    network: config.name.toLowerCase(),
    nativeCurrency: config.nativeCurrency,
    rpcUrls: {
      default: { http: [config.rpcUrl] },
      public: { http: [config.rpcUrl] },
    },
    blockExplorers: config.blockExplorerUrl ? {
      default: { name: 'Explorer', url: config.blockExplorerUrl },
    } : undefined,
  } as Chain;
}