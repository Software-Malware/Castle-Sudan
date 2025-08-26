'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ContractReadDisplay } from "@/components/readcontract";
import getContractData from '@/hooks/deploy';
import { ContractWriteDisplay } from '@/components/writecontracr';
import { useChainId, useAccount } from 'wagmi';
import { 
  SUPPORTED_CHAINS, 
  DEFAULT_CHAIN_ID, 
  getNetworkConfig, 
  isChainSupported 
} from '@/components/confignetwork';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AvatarPlayground from '@/components/AddressAvatar';

interface ContractType {
  address?: string;
  abi?: any;
}

export default function Debug() {
  const [isMounted, setIsMounted] = useState(false);
  const chainId = useChainId();
  const { address } = useAccount();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      const progress = Math.floor((scrollTop / trackLength) * 100);
      setScrollProgress(progress);

      // Check if scrolled beyond 50px for navbar effect
      setIsScrolled(scrollTop > 50);

      // Determine active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || 'home';
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) {
    return (
      <div className="font-sans min-w-auto max-w-auto items-center min-h-screen p-4" data-theme="night">
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg text-lime-400"></span>
          <p className="mt-4 text-lime-200">Loading wallet connection...</p>
        </div>
      </div>
    );
  }

  const currentChainId = chainId || DEFAULT_CHAIN_ID;
  
  // Check if the current chain is supported
  const isSupportedChain = isChainSupported(currentChainId);
  
  // Get contract data
  const ContractData = getContractData();
  
  // Use current chain if supported, otherwise fallback to default
  const targetChainId = isSupportedChain ? currentChainId : DEFAULT_CHAIN_ID;
  
  // Defensive lookup for contract data based on chain.id
  const contract: ContractType | undefined = ContractData?.[targetChainId]?.['YourContract'];
  const contractAddress = contract?.address as `0x${string}` | undefined;
  const abi = contract?.abi;

  // Get network configuration
  const networkConfig = getNetworkConfig(targetChainId);
  
  // Only render ContractReadDisplay when address and abi are available
  const isReady = !!contractAddress && !!abi;

  return (
    <div className="font-sans min-w-auto max-w-auto items-center min-h-screen p-4" data-theme="night">


      {/* Network Info Banner */}
      {networkConfig && (
        <div className="bg-base-200 rounded-3xl p-3 mb-6 text-center py-6 px-auto mt-20">
          <p className="text-sm font-mono">
            Connected to: <span className="text-lime-400">{networkConfig.name}</span> 
            (Chain ID: <span className="text-lime-400">{networkConfig.chainId}</span>)
            <br />
            <span style={{ fontFamily: "InputMono" }}>
              {address ? `Address: ${address}` : 'Not connected'}
            </span>
          </p>
          {contractAddress && (
            <div className="mt-4">
              <p className="text-sm mb-2">Contract Avatar:</p>
              <AvatarPlayground address={contractAddress} />
            </div>
          )}
          {!isSupportedChain && (
            <p className="text-yellow-500 text-xs mt-1">
              Unsupported network. Falling back to default chain.
            </p>
          )}
        </div>
      )}

      <div className="text-5xl md:text-5xl text-center mt-8 mb-8 py-20">
        {isReady ? (
          <ContractReadDisplay
            address={contractAddress}
            abi={abi}
          />
        ) : (
          <div className="text-lg mt-2 text-red-500">
            {networkConfig ? 
              `No contract found on ${networkConfig.name}` : 
              'Loading network configuration...'
            }
          </div>
        )}
      </div>

      <div className="text-5xl md:text-5xl text-center mt-4">
        {isReady ? (
          <ContractWriteDisplay
            address={contractAddress}
            abi={abi}
          />
        ) : (
          <div className="text-lg mt-2 text-red-500">
            {networkConfig ? 
              `No contract found on ${networkConfig.name}` : 
              'Loading network configuration...'
            }
          </div>
        )}
      </div>

      {/* Faucet button for testnets */}
      {networkConfig && networkConfig.chainId !== 1 && ( // Don't show faucet on mainnet
        <div className="text-center mt-6">
          Chain ID: {networkConfig.chainId}
        </div>
      )}
    </div>
  );
}