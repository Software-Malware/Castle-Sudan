// components/EthereumWallet.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';

interface WalletData {
  address: string;
  privateKey: string;
  balance: string;
  mnemonic?: string;
}

interface BatchResult {
  wallets: WalletData[];
  qualifiedWallet: WalletData | null;
}

export default function EthereumWallet() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [existingPrivateKey, setExistingPrivateKey] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCount, setSearchedCount] = useState(0);
  const [currentWallets, setCurrentWallets] = useState<WalletData[]>([]);
  const [searchSpeed, setSearchSpeed] = useState(0);
  const searchRef = useRef<boolean>(false);
  const batchSize = 80; // Increased to 80 wallets per batch
  const startTimeRef = useRef<number>(0);

  const provider = new ethers.JsonRpcProvider('https://mainnet.rpc.buidlguidl.com');

  // Stop search when component unmounts
  useEffect(() => {
    return () => {
      searchRef.current = false;
    };
  }, []);

  // Calculate search speed
  useEffect(() => {
    if (isSearching && searchedCount > 0) {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // in seconds
      setSearchSpeed(Math.floor(searchedCount / elapsedTime));
    }
  }, [searchedCount, isSearching]);

  const generateNewWallet = async () => {
    try {
      setLoading(true);
      setError('');

      const newWallet = ethers.Wallet.createRandom();
      const balance = await provider.getBalance(newWallet.address);
      const balanceInEth = ethers.formatEther(balance);

      setWallet({
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        balance: balanceInEth,
        mnemonic: newWallet.mnemonic?.phrase
      });

      setExistingPrivateKey('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate wallet');
    } finally {
      setLoading(false);
    }
  };

  const generateWalletBatch = async (): Promise<BatchResult> => {
    const walletPromises = Array.from({ length: batchSize }, async () => {
      const newWallet = ethers.Wallet.createRandom();
      const balance = await provider.getBalance(newWallet.address);
      const balanceInEth = ethers.formatEther(balance);
      
      return {
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        balance: balanceInEth,
        mnemonic: newWallet.mnemonic?.phrase
      };
    });

    const results = await Promise.allSettled(walletPromises);
    const wallets: WalletData[] = [];
    let qualifiedWallet: WalletData | null = null;

    for (const result of results) {
      if (result.status === 'fulfilled') {
        const walletData = result.value;
        wallets.push(walletData);
        
        // Check if balance meets condition
        const balanceNum = parseFloat(walletData.balance);
        if (balanceNum >= 0.0001 && !qualifiedWallet) {
          qualifiedWallet = walletData;
        }
      }
    }

    return { wallets, qualifiedWallet };
  };

  const startWalletSearch = async () => {
    if (isSearching) {
      stopWalletSearch();
      return;
    }

    setIsSearching(true);
    searchRef.current = true;
    setSearchedCount(0);
    setError('');
    setWallet(null);
    setSearchSpeed(0);
    startTimeRef.current = Date.now();

    console.log(`Starting wallet search with batch size: ${batchSize}`);

    while (searchRef.current) {
      try {
        // Generate batch of 80 wallets
        const batchResult = await generateWalletBatch();
        
        // Update searched count
        setSearchedCount(prev => prev + batchSize);
        
        // Update current wallets display (show last 12 for better visibility)
        setCurrentWallets(prev => {
          const newWallets = [...prev, ...batchResult.wallets.slice(0, 12)];
          return newWallets.slice(-12);
        });

        // Check if we found a qualified wallet
        if (batchResult.qualifiedWallet) {
          console.log(`Found wallet with balance: ${batchResult.qualifiedWallet.balance} ETH`);
          setWallet(batchResult.qualifiedWallet);
          stopWalletSearch();
          return;
        }

        // No delay for maximum speed - we're batching 80 requests
        // Continue immediately to next batch
        
      } catch (err) {
        console.error('Error in wallet search:', err);
        // Continue searching even if there's an error with one batch
        // Small delay on error to prevent rapid failing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const stopWalletSearch = () => {
    searchRef.current = false;
    setIsSearching(false);
    console.log('Wallet search stopped');
  };

  const importWalletFromPrivateKey = async () => {
    if (!existingPrivateKey.trim()) {
      setError('Please enter a private key');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const importedWallet = new ethers.Wallet(existingPrivateKey.trim(), provider);
      const balance = await provider.getBalance(importedWallet.address);
      const balanceInEth = ethers.formatEther(balance);

      setWallet({
        address: importedWallet.address,
        privateKey: importedWallet.privateKey,
        balance: balanceInEth
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid private key');
    } finally {
      setLoading(false);
    }
  };

  const refreshBalance = async () => {
    if (!wallet) return;

    try {
      setLoading(true);
      const balance = await provider.getBalance(wallet.address);
      const balanceInEth = ethers.formatEther(balance);

      setWallet(prev => prev ? { ...prev, balance: balanceInEth } : null);
    } catch (err) {
      setError('Failed to refresh balance');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearWallet = () => {
    setWallet(null);
    setExistingPrivateKey('');
    setError('');
    setCurrentWallets([]);
    setSearchedCount(0);
    setSearchSpeed(0);
  };

  // Security warning effect
  useEffect(() => {
    if (wallet) {
      console.warn('SECURITY WARNING: Never share your private key or mnemonic!');
    }
  }, [wallet]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        ⚡ High-Speed Ethereum Wallet Finder
      </h1>

      {/* Provider Info */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Provider:</strong> https://mainnet.rpc.buidlguidl.com
        </p>
        <p className="text-sm text-blue-800 mt-1">
          <strong>Target:</strong> Find wallet with balance ≥ 0.0001 ETH
        </p>
        <p className="text-sm text-blue-800 mt-1">
          <strong>Batch Size:</strong> {batchSize} wallets simultaneously
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search Status */}
      {isSearching && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-yellow-800">🚀 Ultra-Fast Wallet Search Running...</p>
              <p className="text-sm text-yellow-700">
                Searched: <strong>{searchedCount.toLocaleString()}</strong> wallets | 
                Speed: <strong>{searchSpeed}</strong> wallets/sec |
                Batch Size: <strong>{batchSize}</strong> wallets
              </p>
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        </div>
      )}

      {/* Current Wallets Display */}
      {currentWallets.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Recent Wallets (Last 12)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {currentWallets.map((walletData, index) => (
              <div key={index} className="p-2 bg-white border rounded text-xs">
                <div className="font-mono truncate" title={walletData.address}>
                  {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
                </div>
                <div className={`font-bold text-center ${
                  parseFloat(walletData.balance) >= 0.0001 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {parseFloat(walletData.balance).toFixed(8)} ETH
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={startWalletSearch}
          disabled={loading}
          className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors ${
            isSearching 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } disabled:bg-gray-300`}
        >
          {isSearching ? `🛑 Stop Search (${searchedCount.toLocaleString()})` : '🚀 Start Ultra Search'}
        </button>
        
        <button
          onClick={generateNewWallet}
          disabled={loading || isSearching}
          className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Single Wallet'}
        </button>

        <button
          onClick={refreshBalance}
          disabled={loading || !wallet || isSearching}
          className="flex-1 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors"
        >
          Refresh Balance
        </button>

        <button
          onClick={clearWallet}
          className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Import Wallet Section */}
      <div className="mb-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Import Existing Wallet</h3>
        <div className="flex gap-2">
          <input
            type="password"
            value={existingPrivateKey}
            onChange={(e) => setExistingPrivateKey(e.target.value)}
            placeholder="Enter private key"
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSearching}
          />
          <button
            onClick={importWalletFromPrivateKey}
            disabled={loading || isSearching}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
          >
            Import
          </button>
        </div>
      </div>

      {/* Found Wallet Display */}
      {wallet && (
        <div className="space-y-4 p-4 border-2 border-green-200 rounded-lg bg-green-50">
          <div className="p-3 bg-green-100 border border-green-300 rounded">
            <p className="text-green-700 font-semibold text-lg">
              🎉 SUCCESS! Found wallet with balance ≥ 0.0001 ETH!
            </p>
          </div>

          {/* Security Warning */}
          <div className="p-3 bg-red-100 border border-red-300 rounded">
            <p className="text-red-700 font-semibold text-sm">
              ⚠️ SECURITY WARNING: Never share your private key or mnemonic! 
              This is for demonstration purposes only. Finding a wallet with balance is statistically impossible.
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={wallet.address}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 border rounded font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(wallet.address)}
                className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <div className="px-3 py-2 bg-white border rounded">
              <span className="font-mono text-lg font-bold text-green-600">
                {parseFloat(wallet.balance).toFixed(8)} ETH
              </span>
            </div>
          </div>

          {/* Private Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Private Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={wallet.privateKey}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 border rounded font-mono text-sm"
              />
              <button
                onClick={() => copyToClipboard(wallet.privateKey)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Mnemonic (if available) */}
          {wallet.mnemonic && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mnemonic Phrase
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={wallet.mnemonic}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-100 border rounded font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(wallet.mnemonic!)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      {(searchedCount > 0 || isSearching) && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 text-lg">Search Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div>
              <p className="text-sm text-blue-700">Total Searched</p>
              <p className="text-xl font-bold text-blue-900">{searchedCount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Search Speed</p>
              <p className="text-xl font-bold text-blue-900">{searchSpeed} wallets/sec</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Batch Size</p>
              <p className="text-xl font-bold text-blue-900">{batchSize}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Status</p>
              <p className="text-xl font-bold text-blue-900">
                {isSearching ? 'Running' : wallet ? 'Found' : 'Stopped'}
              </p>
            </div>
          </div>
          {wallet && (
            <p className="text-sm text-green-700 mt-2">
              🎯 Found qualified wallet after searching <strong>{searchedCount.toLocaleString()}</strong> wallets
              at <strong>{searchSpeed}</strong> wallets/second
            </p>
          )}
        </div>
      )}

      {/* Probability Warning */}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-semibold text-red-800 mb-2">⚠️ Important Probability Notice</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• The probability of finding an Ethereum wallet with balance is approximately 1 in 2^160</li>
          <li>• You would need to search for billions of years to find one by chance</li>
          <li>• This demonstration shows the cryptographic security of Ethereum addresses</li>
          <li>• <strong>Never use generated wallets for real funds</strong></li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">How to use:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click "Start Ultra Search" to search 80 wallets simultaneously at maximum speed</li>
          <li>• Search automatically stops when a wallet with balance ≥ 0.0001 ETH is found</li>
          <li>• Real-time statistics show search speed and progress</li>
          <li>• Recent wallets display shows the last 12 generated addresses</li>
          <li>• This is for educational purposes only - finding wallets with balance is impossible</li>
        </ul>
      </div>
    </div>
  );
}