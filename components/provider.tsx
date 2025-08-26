'use client'; // Required for client-side components in Next.js 13+

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createConfig, http, cookieStorage, createStorage } from '@wagmi/core'
import { Chain, connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
  trustWallet,
  bybitWallet
} from '@rainbow-me/rainbowkit/wallets';
import { type ReactNode } from 'react'
import { type State } from 'wagmi'
import { hardhat, mainnet, sepolia, arbitrum, base, baseSepolia, optimism } from 'wagmi/chains'

type Props = {
  children: ReactNode,
  initialState: State | undefined,
}

const supportedChains: Chain[] = [sepolia, mainnet, arbitrum, base, baseSepolia, optimism, hardhat];

const projectId = '8f7168ddee799be92bb042a55ec97c2a'

export const connectors = connectorsForWallets(
  [
    {
      groupName: 'REZORYA',
      wallets: [ bybitWallet, trustWallet, walletConnectWallet, metaMaskWallet, injectedWallet ],
    },
  ],
  {
    appName: 'REZORYA',
    projectId: projectId,
  }
);

export const config = createConfig({
  chains: supportedChains as any,
  connectors: connectors,
  storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
    [hardhat.id] : http(),
    [mainnet.id]: http('https://eth-mainnet.alchemyapi.io/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF'),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [optimism.id]: http(),
  },
})


const queryClient = new QueryClient();

export default function Providers({
  children, initialState
}: Readonly<{
  children: React.ReactNode;
  initialState: State | undefined;
}>): React.ReactNode {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
    theme={lightTheme({
      accentColor: '#31a5adff',
      accentColorForeground: 'white',
      borderRadius: 'large',
      fontStack: 'rounded',
      overlayBlur: 'small',
    })}
          >
            {children}
          </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}