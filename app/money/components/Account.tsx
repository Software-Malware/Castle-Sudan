'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { createPublicClient, http, formatEther } from 'viem';
import { mainnet } from 'viem/chains';

interface WalletData {
  address: string;
  privateKey: string;
  balance: string;
}

// Multiple RPC endpoints for better performance
const RPC_ENDPOINTS = [
  'https://mainnet.rpc.buidlguidl.com',
  'https://eth.llamarpc.com',
  'https://rpc.ankr.com/eth',
  'https://cloudflare-eth.com'
];

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(RPC_ENDPOINTS[0])
});

export default function WalletGenerator() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [generationSpeed, setGenerationSpeed] = useState(0);
  const [walletsPerSecond, setWalletsPerSecond] = useState(0);
  const [currentRpc, setCurrentRpc] = useState(RPC_ENDPOINTS[0]);
  
  const countRef = useRef(0);
  const speedRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);

  // Calculate wallets per second
  useEffect(() => {
    if (isAutoGenerating && startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    const interval = setInterval(() => {
      if (isAutoGenerating && startTimeRef.current > 0) {
        const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
        const wps = elapsedSeconds > 0 ? countRef.current / elapsedSeconds : 0;
        setWalletsPerSecond(parseFloat(wps.toFixed(2)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoGenerating]);

  const generateWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const startTime = Date.now();
      
      // Generate new wallet - this is very fast
      const newWallet = ethers.Wallet.createRandom();
      
      // Get balance using viem with timeout
      const balance = await Promise.race([
        publicClient.getBalance({
          address: newWallet.address as `0x${string}`
        }),
        new Promise<bigint>((_, reject) => 
          setTimeout(() => reject(new Error('Balance check timeout')), 5000)
        )
      ]);
      
      const endTime = Date.now();
      const speed = endTime - startTime;
      
      speedRef.current.push(speed);
      if (speedRef.current.length > 10) speedRef.current.shift();
      
      const avgSpeed = speedRef.current.reduce((a, b) => a + b, 0) / speedRef.current.length;
      setGenerationSpeed(parseInt(avgSpeed.toFixed(0)));

      const walletData: WalletData = {
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        balance: formatEther(balance)
      };
      
      countRef.current++;
      setGeneratedCount(countRef.current);
      
      const balanceEth = parseFloat(walletData.balance);
      const threshold = 0.0001; // 0.0001 ETH threshold
      
      // If balance > 0.0001 ETH, count as success and stop auto-generation
      if (balanceEth > threshold) {
        setSuccessCount(prev => prev + 1);
        setWallet(walletData);
        setIsAutoGenerating(false);
        startTimeRef.current = 0;
      } else if (isAutoGenerating) {
        // Continue auto-generation if no sufficient balance
        // No delay for maximum speed
        generateWallet();
      } else {
        setWallet(walletData);
      }
      
    } catch (err) {
      console.error('Wallet generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate wallet');
      
      if (isAutoGenerating) {
        // Switch RPC endpoint on error
        const currentIndex = RPC_ENDPOINTS.indexOf(currentRpc);
        const nextIndex = (currentIndex + 1) % RPC_ENDPOINTS.length;
        setCurrentRpc(RPC_ENDPOINTS[nextIndex]);
        
        // Small delay on error then continue
        setTimeout(() => {
          generateWallet();
        }, 100);
      }
    } finally {
      setLoading(false);
    }
  }, [isAutoGenerating, currentRpc]);

  const startAutoGeneration = () => {
    setIsAutoGenerating(true);
    setGeneratedCount(0);
    setSuccessCount(0);
    countRef.current = 0;
    speedRef.current = [];
    startTimeRef.current = Date.now();
  };

  const stopAutoGeneration = () => {
    setIsAutoGenerating(false);
    startTimeRef.current = 0;
  };

  const generateSingleWallet = () => {
    if (isAutoGenerating) {
      stopAutoGeneration();
    }
    generateWallet();
  };

  useEffect(() => {
    if (isAutoGenerating) {
      generateWallet();
    }
  }, [isAutoGenerating, generateWallet]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num === 0) return '0.000000';
    if (num < 0.000001) return num.toExponential(6);
    return num.toFixed(6);
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ⚡ Turbo Wallet Scanner
          </h1>
          <p className="text-blue-200 text-xl">
            High-Speed Ethereum Wallet Generator • Scanning for wallets with &gt; 0.0001 ETH
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-cyan-500/30 p-6 mb-6">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-blue-500/20 rounded-xl p-4 text-center border border-blue-500/30">
              <div className="text-2xl font-bold text-cyan-400">{generatedCount.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">Total Scanned</div>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 text-center border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{successCount}</div>
              <div className="text-green-200 text-sm">Wallets Found</div>
            </div>
            <div className="bg-yellow-500/20 rounded-xl p-4 text-center border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{generationSpeed}ms</div>
              <div className="text-yellow-200 text-sm">Avg Speed</div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">{walletsPerSecond}/s</div>
              <div className="text-purple-200 text-sm">Speed Rate</div>
            </div>
            <div className="bg-cyan-500/20 rounded-xl p-4 text-center border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-300">
                {isAutoGenerating ? '🟢 RUNNING' : '🔴 STOPPED'}
              </div>
              <div className="text-cyan-200 text-sm">Scanner Status</div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={generateSingleWallet}
              disabled={loading || isAutoGenerating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-blue-400"
            >
              {loading ? '⏳ Scanning...' : '🎲 Quick Scan'}
            </button>

            <button
              onClick={startAutoGeneration}
              disabled={isAutoGenerating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-green-400"
            >
              🚀 Start Turbo Scan
            </button>

            <button
              onClick={stopAutoGeneration}
              disabled={!isAutoGenerating}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-red-400"
            >
              🛑 Emergency Stop
            </button>

            <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-600">
              <div className="text-xs text-gray-400">RPC Endpoint</div>
              <div className="text-sm text-cyan-400 truncate" title={currentRpc}>
                {currentRpc.split('//')[1]}
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400 text-red-100 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-lg mr-2">⚠️</span>
                <span className="flex-1">{error}</span>
                <button 
                  onClick={() => setError('')}
                  className="text-red-200 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Auto Generation Status */}
          {isAutoGenerating && (
            <div className="mb-6 p-4 bg-cyan-500/20 border border-cyan-400 text-cyan-100 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400 mr-3"></div>
                  <span className="text-lg font-semibold">Turbo Scanning Active...</span>
                </div>
                <div className="text-right">
                  <div className="text-sm">Looking for wallets with &gt; 0.0001 ETH</div>
                  <div className="text-xs text-cyan-300">{walletsPerSecond} wallets/second</div>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Display */}
          {wallet && (
            <div className="space-y-6 animate-fade-in">
              {/* Balance Card */}
              <div className={`p-6 rounded-xl backdrop-blur-sm border-2 ${
                parseFloat(wallet.balance) > 0.0001 
                  ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400 shadow-lg shadow-green-500/20' 
                  : 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-400'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xl font-bold text-white">
                    💰 Wallet Balance
                  </label>
                  {parseFloat(wallet.balance) > 0.0001 && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                      🎉 FOUND 0.0001+ ETH!
                    </span>
                  )}
                </div>
                <div className="text-4xl font-bold text-center mb-2">
                  <span className={parseFloat(wallet.balance) > 0.0001 ? 'text-green-400' : 'text-white'}>
                    {formatBalance(wallet.balance)} ETH
                  </span>
                </div>
                <div className="text-center text-white/80">
                  {parseFloat(wallet.balance) > 0.0001 
                    ? '🎊 Congratulations! This wallet meets the threshold!' 
                    : '❌ Below threshold. Continue turbo scanning...'
                  }
                </div>
              </div>

              {/* Wallet Details */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Address Card */}
                <div className="bg-gray-800/50 rounded-xl p-5 border border-cyan-500/30">
                  <label className="block text-sm font-semibold text-cyan-300 mb-3 flex items-center">
                    <span className="mr-2">🌐</span>
                    Wallet Address
                  </label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 text-sm bg-black/40 text-green-400 p-3 rounded-lg border border-green-500/30 break-all font-mono">
                      {wallet.address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="p-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 text-center">
                    {formatAddress(wallet.address)}
                  </div>
                </div>

                {/* Private Key Card - Only show if balance > 0.0001 */}
                {parseFloat(wallet.balance) > 0.0001 && (
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-red-500/30">
                    <label className="block text-sm font-semibold text-red-300 mb-3 flex items-center">
                      <span className="mr-2">🔑</span>
                      Private Key
                    </label>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-sm bg-black/40 text-red-400 p-3 rounded-lg border border-red-500/30 break-all font-mono">
                        {wallet.privateKey}
                      </code>
                      <button
                        onClick={() => copyToClipboard(wallet.privateKey)}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                    <div className="text-xs text-red-400 mt-2 text-center font-semibold">
                      ⚡ CRITICAL SECURITY - SAVE IMMEDIATELY!
                    </div>
                  </div>
                )}
              </div>

              {/* Security Warning */}
              <div className="p-4 bg-red-500/20 border border-red-400 rounded-xl">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🔒</span>
                  <div>
                    <h4 className="font-bold text-red-100 mb-2 text-lg">SECURITY ALERT</h4>
                    <p className="text-red-200">
                      ⚠️ Never share private keys! • ⚠️ This is educational only • 
                      ⚠️ Real wallets with balance are extremely rare • 
                      ⚠️ Use proper security measures for any found assets
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Celebration */}
              {parseFloat(wallet.balance) > 0.0001 && (
                <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-center animate-pulse shadow-2xl">
                  <div className="text-3xl font-bold text-white mb-3">
                    🎉 TREASURE FOUND! 🎉
                  </div>
                  <p className="text-white text-lg font-semibold">
                    Wallet contains {formatBalance(wallet.balance)} ETH!
                  </p>
                  <p className="text-white/90 mt-2">
                    Turbo scanning stopped. Secure your private key immediately!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>Powered by Ethers.js & Viem • Multi-RPC Endpoints • High Performance Scanning</p>
          <p className="mt-1">Educational Purpose Only • Probability of finding ETH is extremely low</p>
        </div>

        {/* Performance Tips */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
          <h3 className="text-cyan-400 font-semibold mb-2">💡 Performance Tips:</h3>
          <ul className="text-gray-300 text-sm grid grid-cols-1 md:grid-cols-2 gap-1">
            <li>• Uses multiple RPC endpoints for reliability</li>
            <li>• No delays between scans for maximum speed</li>
            <li>• Automatic RPC failover on errors</li>
            <li>• Real-time speed optimization</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}