'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReadContract, useChainId } from 'wagmi'
import { type Address } from 'viem'
import getContractData from '@/hooks/deploy'
import { parseEther } from 'viem'
import { 
  SUPPORTED_CHAINS, 
  DEFAULT_CHAIN_ID, 
  getNetworkConfig, 
  isChainSupported,
  type NetworkConfig 
} from '@/components/confignetwork'
import AvatarPlayground from "@/components/AddressAvatar";

// --- Types

interface ContractFunction {
  name: string
  inputs: {
    name: string
    type: string
    internalType: string
  }[]
  stateMutability: string
  type: string
}

interface ContractReadDisplayProps {
  address?: Address
  abi?: any[]
}

interface ContractData {
  [chainId: number]: {
    YourContract?: {
      address: string;
      abi: any[];
    }
  }
}

// --- Helper

function safeJSONStringify(obj: any) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return '[Unserializable]'
  }
}

function isValidAddress(addr: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

// --- Subcomponent for each "readable" contract function
function ContractReadFunction({
  fn,
  contractAddress,
  abi,
  chainId,
}: {
  fn: ContractFunction
  contractAddress: Address | undefined
  abi: any[]
  chainId: number
}) {
  // State for user inputs per argument
  const [inputs, setInputs] = useState<string[]>(Array(fn.inputs.length).fill(''))
  // Controls loading spinner per-button
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  // Handle input edit per argument
  const handleInputChange = (i: number, val: string) => {
    setInputs(prev => {
      const next = prev.slice()
      next[i] = val
      return next
    })
  }

  // Parse inputs->args with defensive logic

const areAllArgsPresent =
  fn.inputs.length === 0 ||
  fn.inputs.every((input, idx) => {
    const val = inputs[idx]
    return val !== undefined && val !== ''
  })

const parsedArgs: any[] | undefined =
  fn.inputs.length === 0
    ? undefined
    : areAllArgsPresent
      ? fn.inputs.map((input, i) => {
          const val = inputs[i]
          
          // Handle uint/int types
          if (input.type.startsWith('uint') || input.type.startsWith('int')) {
            try {
              if (val === undefined || val === '') return undefined
              
              // Handle ETH values (convert to wei)
              if (val.includes('ETH') || val.includes('eth')) {
                const ethValue = val.replace(/ETH|eth/gi, '').trim()
                return parseEther(ethValue)
              }
              
              // Handle regular numeric values
              return BigInt(val)
            } catch {
              return undefined
            }
          }
          
          // Handle bool types
          if (input.type === 'bool') {
            return val === 'true' || val === '1' || val === '0x1' || val === '0x01'
          }
          
          // Handle address types
          if (input.type === 'address') {
            return val?.toLowerCase() // Normalize to lowercase
          }
          
          // Handle string bytes types that might contain ETH values
          if (input.type === 'string' || input.type.startsWith('bytes')) {
            if (val.includes('ETH') || val.includes('eth')) {
              const ethValue = val.replace(/ETH|eth/gi, '').trim()
              return parseEther(ethValue).toString()
            }
          }
          
          return val
        })
      : undefined

  // Manual ("lazy") query: only fetch after user clicks Refresh
  const { data, isLoading, isError, error, refetch } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: fn.name,
    args: parsedArgs,
    chainId,
    query: {
      enabled: false,
    }
  })

  // Button handler
  const onRefresh = async () => {
    if (!contractAddress || !areAllArgsPresent || isLoading) return
    setIsButtonLoading(true)
    try {
      await refetch()
    } finally {
      setIsButtonLoading(false)
    }
  }

  return (
    <motion.div
      key={fn.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-200 border border-lime-100 shadow-sm rounded-4xl p-6 shadow-lime-400/10" 
    >
      <div className="rounded-3xl card-body p-4">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-lg text-lime-700">
            {fn.name}({fn.inputs.map(input => input.type).join(', ')})
          </h3>
          <button
            type="button"
            onClick={onRefresh}
            disabled={!contractAddress || !areAllArgsPresent || isLoading || isButtonLoading}
            className={`btn btn-circle btn-sm ${(isLoading || isButtonLoading) ? 'btn-success' : 'btn-outline'} transition-colors hover:bg-lime-100`}
            title="Refresh"
          >
            {(isLoading || isButtonLoading) ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Function inputs */}
        {fn.inputs.length > 0 && (
          <div className="mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fn.inputs.map((input, idx) => (
                <div key={`${fn.name}-${input.name}-${idx}`} className="form-control rounded-4xl">
                  <label className="label rounded-3xl">
                    <span className="label-text px-4 py-2 text-lime-600 rounded-4xl">
                      {input.name} ({input.type})
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${input.type}`}
                    className="input input-bordered input-sm transition-all rounded-4xl hover:ring-2 hover:ring-lime-400"
                    value={inputs[idx] || ''}
                    onChange={e => handleInputChange(idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        <div className="mt-3">
          {isLoading || isButtonLoading ? (
            <div className="flex items-center space-x-2 text-lime-600">
              <span className="loading loading-spinner loading-xs"></span>
              <span className="text-sm">Querying contract...</span>
            </div>
          ) : isError ? (
            <div className="alert alert-error shadow-sm rounded-4xl">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">Error: {error instanceof Error ? error.message : 'Unknown error'}</span>
              </div>
            </div>
          ) : data !== undefined ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 p-3 bg-base-300 rounded-lg"
            >
              <div className="flex">
                <div className='flex'>
                  <p className="text-[17px] text-lime-500">Result:</p>
                  <p className="font-mono text-sm text-lime-800 break-all px-2">
                    {typeof data === 'object'
                      ? safeJSONStringify(data)
                      : String(data)}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

// --- Main component

export const ContractReadDisplay = ({
  address,
  abi: abiProp,
}: ContractReadDisplayProps) => {
  // Fix hydration: Load contract data on client only
  const [contractData, setContractData] = useState<ContractData>({})
  const [loading, setLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    const data = getContractData()
    setContractData(data)
    setLoading(false)
  }, [])

  // Get chain info using network config
  const chainId = useChainId()
  const targetChainId = useMemo(() => {
    if (chainId && isChainSupported(chainId)) {
      return chainId
    }
    return DEFAULT_CHAIN_ID
  }, [chainId])

  const networkConfig = getNetworkConfig(targetChainId)
  const chain = useMemo(() => {
    return {
      id: targetChainId,
      name: networkConfig?.name || `Chain ${targetChainId}`
    }
  }, [targetChainId, networkConfig])

  // Check if current chain is supported
  const isSupportedChain = isChainSupported(targetChainId)

  // --- Address: prefer prop, else lookup contractData
  const contractAddress: Address | undefined = useMemo(() => {
    if (address && isValidAddress(address)) {
      return address as Address
    }
    const chainData = contractData[chain.id]
    if (chainData?.YourContract?.address && isValidAddress(chainData.YourContract.address)) {
      return chainData.YourContract.address as Address
    }
    return undefined
  }, [address, contractData, chain.id])

  // --- ABI: prefer prop, else lookup contractData
  const abi = useMemo(() => {
    if (Array.isArray(abiProp)) return abiProp
    const chainData = contractData[chain.id]
    return Array.isArray(chainData?.YourContract?.abi) ? chainData.YourContract.abi : []
  }, [abiProp, contractData, chain.id])

  // --- Filter readable functions (view/pure)
  const readableFunctions: ContractFunction[] = useMemo(
    () =>
      Array.isArray(abi)
        ? abi.filter(
            (fn: any) =>
              fn.type === 'function' &&
              (fn.stateMutability === 'view' || fn.stateMutability === 'pure')
          )
        : [],
    [abi]
  )

  // --- UI
  const [isExpanded, setIsExpanded] = useState(false)

  // Don't render anything until mounted to prevent hydration mismatch
  if (!isMounted || loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg text-lime-600"></span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl bg-green-500 font-black justify-center items-center w-96 text-lime-700 mb-6 border rounded-full py-2">Read Contract</h1>
      
      {/* Network status indicator */}
      <div className="mb-4 text-center">
        <div className={`badge ${isSupportedChain ? 'badge-success' : 'badge-warning'} gap-2`}>
          {isSupportedChain ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {networkConfig?.name} (ID: {chain.id})
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Unsupported Network (ID: {chain.id})
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-circle btn-sm btn-ghost text-lime-600 hover:text-lime-800 hover:bg-lime-100 transition-colors"
        >
          {isExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {!contractAddress ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="alert alert-warning shadow-lg rounded-3xl"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>No contract found for {chain.name} (Chain ID: {chain.id})</span>
            </div>
          </motion.div>
        ) : readableFunctions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="alert alert-warning shadow-lg rounded-3xl"
          >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>No readable functions found in the ABI</span>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {readableFunctions.map(fn => (
              <ContractReadFunction
                key={fn.name}
                fn={fn}
                contractAddress={contractAddress}
                abi={abi}
                chainId={chain.id}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="divider my-4"></div>
            <h4 className="text-lg font-semibold text-lime-700 mb-3">
              Contract Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card bg-base-200 border border-lime-100 rounded-4xl">
                <div className="card-body flex items-center">
                  <h5 className="card-title text-sm text-lime-600">ABI Functions</h5>
                  <p className="font-mono text-lime-800">
                    {readableFunctions.length} readable function{readableFunctions.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 border border-lime-100 rounded-4xl">
                <div className="card-body flex items-center">
                  <h5 className="card-title text-sm text-lime-600">Network</h5>
                  <p className="font-mono text-lime-800">{chain.name} (ID: {chain.id})</p>
                </div>
              </div>
              <div className="card bg-base-200 border border-lime-100 col-span-2 rounded-4xl">
                <div className="card-body flex items-center">
                  <h5 className="card-title text-sm text-lime-600"> Contract Address</h5>
                  <AvatarPlayground address={contractAddress} />
                  <p className="font-mono text-sm text-lime-800 break-all">{contractAddress}</p>
                </div>
              </div>
              {networkConfig && (
                <div className="card bg-base-200 border border-lime-100 col-span-2 rounded-4xl">
                  <div className="card-body">
                    <h5 className="card-title text-sm text-lime-600">Network Configuration</h5>
                    <div className="text-xs font-mono text-lime-800 break-all">
                      RPC: {networkConfig.rpcUrl}
                      {networkConfig.blockExplorerUrl && (
                        <div className="mt-1">Explorer: {networkConfig.blockExplorerUrl}</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}