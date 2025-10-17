'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import ECPairFactory from 'ecpair';

// Initialize bitcoin libraries
const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);

// Bitcoin network (mainnet or testnet)
const NETWORK = bitcoin.networks.bitcoin;
// const NETWORK = bitcoin.networks.testnet; // Use this for testnet

// Blockchain API endpoints
const BLOCKCHAIN_API_BASE = 'https://blockstream.info/api';

interface BitcoinWalletData {
  address: string;
  privateKey: string;
  wif: string;
  balance: number;
  totalReceived: number;
  totalSent: number;
  transactionCount: number;
  mnemonic?: string;
}

interface Transaction {
  txid: string;
  value: number;
  confirmations: number;
  time: number;
}

export default function BitcoinWalletGenerator() {
  const [wallet, setWallet] = useState<BitcoinWalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [generationSpeed, setGenerationSpeed] = useState(0);
  const [walletsPerSecond, setWalletsPerSecond] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showMnemonic, setShowMnemonic] = useState(false);
  
  const countRef = useRef(0);
  const speedRef = useRef<number[]>([]);
  const startTimeRef = useRef<number>(0);
  const isMountedRef = useRef(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Calculate wallets per second
  useEffect(() => {
    if (isAutoGenerating && startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    const interval = setInterval(() => {
      if (isAutoGenerating && startTimeRef.current > 0 && isMountedRef.current) {
        const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
        const wps = elapsedSeconds > 0 ? countRef.current / elapsedSeconds : 0;
        setWalletsPerSecond(parseFloat(wps.toFixed(2)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoGenerating]);

  const fetchBalance = async (address: string): Promise<{
    balance: number;
    totalReceived: number;
    totalSent: number;
    transactionCount: number;
  }> => {
    try {
      const response = await fetch(`${BLOCKCHAIN_API_BASE}/address/${address}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        balance: data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum,
        totalReceived: data.chain_stats.funded_txo_sum,
        totalSent: data.chain_stats.spent_txo_sum,
        transactionCount: data.chain_stats.tx_count
      };
    } catch (err) {
      console.error('Balance fetch error:', err);
      throw new Error('Failed to fetch balance from blockchain');
    }
  };

  const fetchTransactions = async (address: string): Promise<Transaction[]> => {
    try {
      const response = await fetch(`${BLOCKCHAIN_API_BASE}/address/${address}/txs`);
      
      if (!response.ok) {
        return [];
      }
      
      const txs = await response.json();
      
      return txs.slice(0, 10).map((tx: any) => ({
        txid: tx.txid,
        value: tx.vout.reduce((sum: number, output: any) => {
          const isOurAddress = output.scriptpubkey_address === address;
          return isOurAddress ? sum + output.value : sum;
        }, 0),
        confirmations: tx.status.confirmed ? tx.status.block_height : 0,
        time: tx.status.block_time || Date.now() / 1000
      }));
    } catch (err) {
      console.error('Transactions fetch error:', err);
      return [];
    }
  };

  const generateBitcoinWallet = useCallback(async (useMnemonic: boolean = false) => {
    if (!isMountedRef.current) return;

    try {
      setLoading(true);
      setError('');
      
      const startTime = Date.now();
      
      let privateKey: Buffer;
      let mnemonic: string | undefined;
      
      if (useMnemonic) {
        // Generate from mnemonic (BIP39)
        mnemonic = bip39.generateMnemonic();
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = bip32.fromSeed(seed, NETWORK);
        
        // Derive first account: m/44'/0'/0'/0/0 (BIP44)
        const path = "m/44'/0'/0'/0/0";
        const child = root.derivePath(path);
        
        if (!child.privateKey) {
          throw new Error('Failed to derive private key from mnemonic');
        }
        
        privateKey = Buffer.from(child.privateKey);
      } else {
        // Generate random private key directly
        const keyPair = ECPair.makeRandom({ network: NETWORK });
        if (!keyPair.privateKey) {
          throw new Error('Failed to generate private key');
        }
        privateKey = Buffer.from(keyPair.privateKey as unknown as ArrayBuffer);
      }
      
      // Create key pair from private key
      const keyPair = ECPair.fromPrivateKey(privateKey, { network: NETWORK });
      
      // Generate address (P2PKH - legacy format)
      const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: NETWORK
      });
      
      if (!address) {
        throw new Error('Failed to generate Bitcoin address');
      }
      
      // Get WIF format private key
      const wif = keyPair.toWIF();
      
      // Fetch balance from blockchain
      const balanceData = await fetchBalance(address);
      const walletTransactions = await fetchTransactions(address);
      
      const endTime = Date.now();
      const speed = endTime - startTime;
      
      speedRef.current.push(speed);
      if (speedRef.current.length > 10) speedRef.current.shift();
      
      const avgSpeed = speedRef.current.reduce((a, b) => a + b, 0) / speedRef.current.length;
      setGenerationSpeed(parseInt(avgSpeed.toFixed(0)));

      const walletData: BitcoinWalletData = {
        address,
        privateKey: privateKey.toString('hex'),
        wif,
        balance: balanceData.balance / 100000000, // Convert satoshis to BTC
        totalReceived: balanceData.totalReceived / 100000000,
        totalSent: balanceData.totalSent / 100000000,
        transactionCount: balanceData.transactionCount,
        mnemonic
      };
      
      countRef.current++;
      setGeneratedCount(countRef.current);
      setTransactions(walletTransactions);
      
      // If balance > 0, count as success and stop auto-generation
      if (walletData.balance > 0) {
        setSuccessCount(prev => prev + 1);
        setWallet(walletData);
        setIsAutoGenerating(false);
        startTimeRef.current = 0;
      } else if (isAutoGenerating && isMountedRef.current) {
        // Continue auto-generation if no balance
        generateBitcoinWallet(useMnemonic);
      } else if (isMountedRef.current) {
        setWallet(walletData);
      }
      
    } catch (err) {
      console.error('Wallet generation error:', err);
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to generate Bitcoin wallet');
      }
      
      if (isAutoGenerating && isMountedRef.current) {
        // Small delay on error then continue
        setTimeout(() => {
          if (isMountedRef.current) {
            generateBitcoinWallet(useMnemonic);
          }
        }, 500);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [isAutoGenerating]);

  const startAutoGeneration = (useMnemonic: boolean = false) => {
    setIsAutoGenerating(true);
    setGeneratedCount(0);
    setSuccessCount(0);
    countRef.current = 0;
    speedRef.current = [];
    startTimeRef.current = Date.now();
    generateBitcoinWallet(useMnemonic);
  };

  const stopAutoGeneration = () => {
    setIsAutoGenerating(false);
    startTimeRef.current = 0;
  };

  const generateSingleWallet = (useMnemonic: boolean = false) => {
    if (isAutoGenerating) {
      stopAutoGeneration();
    }
    generateBitcoinWallet(useMnemonic);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
  };

  const formatBTC = (amount: number) => {
    if (amount === 0) return '0.00000000';
    if (amount < 0.000001) return amount.toExponential(8);
    return amount.toFixed(8);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            ₿ Bitcoin Wallet Generator
          </h1>
          <p className="text-amber-200 text-xl">
            Secure Bitcoin Wallet Generator • Real-time Blockchain Balance Check
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-500/30 p-6 mb-6">
          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-orange-500/20 rounded-xl p-4 text-center border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{generatedCount.toLocaleString()}</div>
              <div className="text-orange-200 text-sm">Total Generated</div>
            </div>
            <div className="bg-green-500/20 rounded-xl p-4 text-center border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">{successCount}</div>
              <div className="text-green-200 text-sm">Wallets with BTC</div>
            </div>
            <div className="bg-yellow-500/20 rounded-xl p-4 text-center border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">{generationSpeed}ms</div>
              <div className="text-yellow-200 text-sm">Avg Speed</div>
            </div>
            <div className="bg-amber-500/20 rounded-xl p-4 text-center border border-amber-500/30">
              <div className="text-2xl font-bold text-amber-400">{walletsPerSecond}/s</div>
              <div className="text-amber-200 text-sm">Speed Rate</div>
            </div>
            <div className="bg-red-500/20 rounded-xl p-4 text-center border border-red-500/30">
              <div className="text-2xl font-bold text-red-300">
                {isAutoGenerating ? '🟢 SCANNING' : '🔴 STOPPED'}
              </div>
              <div className="text-red-200 text-sm">Scanner Status</div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => generateSingleWallet(false)}
              disabled={loading || isAutoGenerating}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-orange-400"
            >
              {loading ? '⏳ Generating...' : '🎲 Random Wallet'}
            </button>

            <button
              onClick={() => generateSingleWallet(true)}
              disabled={loading || isAutoGenerating}
              className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-amber-400"
            >
              📝 With Mnemonic
            </button>

            <button
              onClick={() => startAutoGeneration(false)}
              disabled={isAutoGenerating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-green-400"
            >
              🚀 Start Auto Scan
            </button>

            <button
              onClick={stopAutoGeneration}
              disabled={!isAutoGenerating}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 border border-red-400"
            >
              🛑 Stop Scan
            </button>
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
            <div className="mb-6 p-4 bg-amber-500/20 border border-amber-400 text-amber-100 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-400 mr-3"></div>
                  <span className="text-lg font-semibold">Scanning Bitcoin Blockchain...</span>
                </div>
                <div className="text-right">
                  <div className="text-sm">Looking for wallets with BTC balance</div>
                  <div className="text-xs text-amber-300">{walletsPerSecond} wallets/second</div>
                </div>
              </div>
            </div>
          )}

          {/* Wallet Display */}
          {wallet && (
            <div className="space-y-6 animate-fade-in">
              {/* Balance Card */}
              <div className={`p-6 rounded-xl backdrop-blur-sm border-2 ${
                wallet.balance > 0 
                  ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400 shadow-lg shadow-green-500/20' 
                  : 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-amber-400'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xl font-bold text-white">
                    ₿ Bitcoin Balance
                  </label>
                  {wallet.balance > 0 && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                      🎉 BITCOIN FOUND!
                    </span>
                  )}
                </div>
                <div className="text-4xl font-bold text-center mb-2">
                  <span className={wallet.balance > 0 ? 'text-green-400' : 'text-white'}>
                    {formatBTC(wallet.balance)} BTC
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-white/80 text-sm">
                  <div>
                    <div className="font-semibold">Received</div>
                    <div>{formatBTC(wallet.totalReceived)} BTC</div>
                  </div>
                  <div>
                    <div className="font-semibold">Sent</div>
                    <div>{formatBTC(wallet.totalSent)} BTC</div>
                  </div>
                  <div>
                    <div className="font-semibold">Transactions</div>
                    <div>{wallet.transactionCount}</div>
                  </div>
                </div>
              </div>

              {/* Wallet Details */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Address Card */}
                <div className="bg-gray-800/50 rounded-xl p-5 border border-amber-500/30">
                  <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center">
                    <span className="mr-2">🌐</span>
                    Bitcoin Address
                  </label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 text-sm bg-black/40 text-green-400 p-3 rounded-lg border border-green-500/30 break-all font-mono">
                      {wallet.address}
                    </code>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                  <div className="text-xs text-gray-400 mt-2 text-center">
                    {formatAddress(wallet.address)}
                  </div>
                </div>

                {/* WIF Private Key Card */}
                <div className="bg-gray-800/50 rounded-xl p-5 border border-red-500/30">
                  <label className="block text-sm font-semibold text-red-300 mb-3 flex items-center">
                    <span className="mr-2">🔑</span>
                    Private Key (WIF)
                  </label>
                  <div className="flex items-center gap-3">
                    <code className="flex-1 text-sm bg-black/40 text-red-400 p-3 rounded-lg border border-red-500/30 break-all font-mono">
                      {wallet.wif}
                    </code>
                    <button
                      onClick={() => copyToClipboard(wallet.wif)}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>
                  <div className="text-xs text-red-400 mt-2 text-center font-semibold">
                    ⚡ WIF Format - Compatible with most wallets
                  </div>
                </div>
              </div>

              {/* Hex Private Key */}
              <div className="bg-gray-800/50 rounded-xl p-5 border border-purple-500/30">
                <label className="block text-sm font-semibold text-purple-300 mb-3 flex items-center">
                  <span className="mr-2">🔐</span>
                  Private Key (Hex)
                </label>
                <div className="flex items-center gap-3">
                  <code className="flex-1 text-sm bg-black/40 text-purple-400 p-3 rounded-lg border border-purple-500/30 break-all font-mono">
                    {wallet.privateKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(wallet.privateKey)}
                    className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>

              {/* Mnemonic Phrase */}
              {wallet.mnemonic && (
                <div className="bg-gray-800/50 rounded-xl p-5 border border-blue-500/30">
                  <label className="block text-sm font-semibold text-blue-300 mb-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2">📝</span>
                      Recovery Phrase (BIP39)
                    </div>
                    <button
                      onClick={() => setShowMnemonic(!showMnemonic)}
                      className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      {showMnemonic ? 'Hide' : 'Show'}
                    </button>
                  </label>
                  {showMnemonic ? (
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-sm bg-black/40 text-blue-400 p-3 rounded-lg border border-blue-500/30 break-all font-mono">
                        {wallet.mnemonic}
                      </code>
                      <button
                        onClick={() => copyToClipboard(wallet.mnemonic!)}
                        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-110"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 p-4">
                      Click "Show" to reveal the recovery phrase
                    </div>
                  )}
                  <div className="text-xs text-blue-400 mt-2 text-center">
                    🔒 12-word mnemonic - Can recover entire wallet
                  </div>
                </div>
              )}

              {/* Recent Transactions */}
              {transactions.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-5 border border-green-500/30">
                  <label className="block text-sm font-semibold text-green-300 mb-3">
                    📊 Recent Transactions
                  </label>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {transactions.map((tx) => (
                      <div key={tx.txid} className="flex justify-between items-center p-3 bg-black/30 rounded border border-gray-600">
                        <div className="flex-1 truncate mr-4">
                          <div className="text-sm text-gray-300 truncate" title={tx.txid}>
                            TX: {tx.txid.slice(0, 16)}...
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatDate(tx.time)} • {tx.confirmations} confirmations
                          </div>
                        </div>
                        <div className={`font-mono font-bold ${tx.value > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.value > 0 ? '+' : ''}{formatBTC(tx.value / 100000000)} BTC
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Warning */}
              <div className="p-4 bg-red-500/20 border border-red-400 rounded-xl">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🔒</span>
                  <div>
                    <h4 className="font-bold text-red-100 mb-2 text-lg">BITCOIN SECURITY ALERT</h4>
                    <p className="text-red-200">
                      ⚠️ Never share private keys or recovery phrases! • 
                      ⚠️ This tool is for educational purposes only • 
                      ⚠️ Generated wallets are for demonstration • 
                      ⚠️ Use hardware wallets for real Bitcoin storage
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Celebration */}
              {wallet.balance > 0 && (
                <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-center animate-pulse shadow-2xl">
                  <div className="text-3xl font-bold text-white mb-3">
                    🎉 BITCOIN TREASURE FOUND! 🎉
                  </div>
                  <p className="text-white text-lg font-semibold">
                    Wallet contains {formatBTC(wallet.balance)} BTC!
                  </p>
                  <p className="text-white/90 mt-2">
                    Auto-scanning stopped. Secure your private keys immediately!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>Powered by BitcoinJS • Blockchain.info API • BIP39 & BIP32 Compliant</p>
          <p className="mt-1">Educational Purpose Only • Uses Bitcoin Mainnet</p>
        </div>

        {/* Technical Info */}
        <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
          <h3 className="text-amber-400 font-semibold mb-2">💡 Technical Details:</h3>
          <ul className="text-gray-300 text-sm grid grid-cols-1 md:grid-cols-2 gap-1">
            <li>• P2PKH Legacy Addresses</li>
            <li>• BIP39 Mnemonic Support</li>
            <li>• BIP44 Derivation Path</li>
            <li>• WIF Private Key Format</li>
            <li>• Real Blockchain Balance Check</li>
            <li>• Transaction History</li>
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