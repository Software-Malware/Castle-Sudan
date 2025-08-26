import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWriteContract, useChainId, useWaitForTransactionReceipt } from 'wagmi'
import { type Address } from 'viem'
import getContractData from '@/hooks/deploy'
import { parseEther } from 'viem'
import { 
  SUPPORTED_CHAINS, 
  DEFAULT_CHAIN_ID, 
  getNetworkConfig, 
  isChainSupported,
  networkConfigToChain,
  type NetworkConfig 
} from '@/components/confignetwork'

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
      address: string
      abi: any[]
    }
  }
}

// --- Helper: parse input strings to types for contract call

function parseInputArg(type: string, val: string): any {
  if (type === 'bool') return val === 'true' || val === '1'
  if (type === 'address') return val.trim()
  if (type.startsWith('uint') || type.startsWith('int')) {
    if (!/^-?\d+$/.test(val.trim())) return undefined
    try {
      return val !== undefined && val !== '' ? BigInt(val.trim()) : undefined
    } catch {
      return undefined
    }
  }
  if (type === 'string') return val
  if (type.startsWith('bytes')) return val
  if (type.endsWith('[]')) {
    try {
      const arr = JSON.parse(val)
      if (Array.isArray(arr)) return arr
      return undefined
    } catch {
      return undefined
    }
  }
  return val
}

function isValidAddress(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr)
}

// --- Subcomponent for each callable writable contract function

function ContractWriteFunction({
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
  const [inputs, setInputs] = useState<string[]>(Array(fn.inputs.length).fill(''))
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  const [txHash, setTxHash] = useState<Address | null>(null)
  const [writeError, setWriteError] = useState<string | null>(null)
  const [inputErrors, setInputErrors] = useState<{ [idx: number]: string | null }>({})
  const [showTransactionData, setShowTransactionData] = useState(false)

  const { writeContractAsync } = useWriteContract()
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined,
  })

  // --- Validate inputs (per input: address, numbers, arrays)
useEffect(() => {
  const errors: { [idx: number]: string | null } = {}
  fn.inputs.forEach((input, idx) => {
    const val = inputs[idx]
    
    if (val === undefined || val === '') {
      errors[idx] = null
      return
    }

    const trimmedVal = val.trim()
    
    if (input.type === 'address' && !isValidAddress(trimmedVal)) {
      errors[idx] = 'Invalid address format'
    } else if (input.type.startsWith('uint') || input.type.startsWith('int')) {
      // Handle ETH values (e.g., "1 ETH", "0.5 eth", "0.01")
      if (trimmedVal.includes('ETH') || trimmedVal.includes('eth')) {
        const ethValue = trimmedVal.replace(/ETH|eth/gi, '').trim()
        if (!/^\d*\.?\d+$/.test(ethValue)) {
          errors[idx] = 'Invalid ETH amount'
        } else {
          try {
            parseEther(ethValue) // Test if it can be parsed to BigNumber
            errors[idx] = null
          } catch {
            errors[idx] = 'Invalid ETH value'
          }
        }
      } 
      // Handle regular decimal values that should be converted to BigNumber (wei)
      else if (/^\d*\.?\d+$/.test(trimmedVal)) {
        try {
          parseEther(trimmedVal) // Test if it can be parsed to BigNumber
          errors[idx] = null
        } catch {
          errors[idx] = 'Invalid decimal value for BigNumber conversion'
        }
      }
      // Handle regular integer values (convert to BigInt)
      else if (!/^-?\d+$/.test(trimmedVal)) {
        errors[idx] = 'Must be integer, decimal, or ETH value for BigNumber conversion'
      } else {
        // Validate that integer can be converted to BigInt
        try {
          BigInt(trimmedVal)
          errors[idx] = null
        } catch {
          errors[idx] = 'Invalid integer value for BigInt conversion'
        }
      }
    } else if (input.type.endsWith('[]')) {
      try {
        const arr = JSON.parse(trimmedVal)
        if (!Array.isArray(arr)) {
          errors[idx] = 'Must be JSON array, e.g. ["foo",1]'
        } else {
          errors[idx] = null
        }
      } catch {
        errors[idx] = 'Must be a valid JSON array, e.g. ["foo",1]'
      }
    } else {
      errors[idx] = null
    }
  })
  setInputErrors(errors)
}, [inputs, fn.inputs])

  // Clear inputs after confirmed tx
  useEffect(() => {
    if (isConfirmed) {
      setInputs(Array(fn.inputs.length).fill(''))
      setShowTransactionData(true)
    }
  }, [isConfirmed, fn.inputs.length])

  const handleInputChange = (i: number, val: string) => {
    setInputs((prev) => {
      const next = prev.slice()
      next[i] = val
      return next
    })
  }

  // All argument inputs present and valid
  const areAllArgsPresent =
    fn.inputs.length === 0 ||
    fn.inputs.every((input, idx) => {
      const val = inputs[idx]
      if (val === undefined || val === '') return false
      if (input.type === 'address' && !isValidAddress(val.trim())) return false
      if (
        (input.type.startsWith('uint') || input.type.startsWith('int')) &&
        !/^-?\d+$/.test(val.trim())
      )
        return false
      if (input.type.endsWith('[]')) {
        try {
          const arr = JSON.parse(val)
          if (!Array.isArray(arr)) return false
        } catch {
          return false
        }
      }
      return true
    })

  const parsedArgs: any[] =
    fn.inputs.length === 0
      ? []
      : areAllArgsPresent
      ? fn.inputs.map((input, i) => parseInputArg(input.type, inputs[i]))
      : []

  const onWrite = async () => {
    setWriteError(null)
    setShowTransactionData(false)
    if (!contractAddress || !areAllArgsPresent || isButtonLoading) return
    setIsButtonLoading(true)
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: abi,
        functionName: fn.name,
        args: parsedArgs,
        chainId,
      })
      setTxHash(hash)
    } catch (error: any) {
      setWriteError(
        error && typeof error === 'object' && error.message
          ? error.message
          : String(error),
      )
      console.error('Transaction error:', error)
    } finally {
      setIsButtonLoading(false)
    }
  }

  // Prepare transaction data for JSON display
  const transactionData = useMemo(() => {
    if (!receipt || !txHash) return null
    
    return {
      transactionHash: txHash,
      blockNumber: receipt.blockNumber.toString(),
      blockHash: receipt.blockHash,
      from: receipt.from,
      to: receipt.to,
      contractAddress: contractAddress,
      functionName: fn.name,
      args: parsedArgs,
      status: receipt.status,
      gasUsed: receipt.gasUsed.toString(),
      cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
      effectiveGasPrice: receipt.effectiveGasPrice?.toString(),
      logs: receipt.logs.map(log => ({
        address: log.address,
        topics: log.topics,
        data: log.data,
        transactionHash: log.transactionHash,
        blockNumber: log.blockNumber.toString(),
      }))
    }
  }, [receipt, txHash, contractAddress, fn.name, parsedArgs])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-200 border border-lime-100 shadow-sm rounded-4xl"
    >
      <div className="rounded-3xl card-body p-4">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-lg text-lime-700 font-mono">
            {fn.name}
            {'('}
            {fn.inputs.map(input => input.type).join(', ')}
            {')'}
          </h3>
          <button
            type="button"
            onClick={onWrite}
            disabled={
              !contractAddress ||
              !areAllArgsPresent ||
              isButtonLoading ||
              isConfirming
            }
            className={`btn btn-circle btn-sm ${
              isButtonLoading || isConfirming
                ? 'btn-success'
                : 'btn-outline'
            } transition-colors hover:bg-lime-100`}
            title="Execute"
          >
            {isButtonLoading || isConfirming ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Function inputs */}
        {fn.inputs.length > 0 && (
          <div className="mt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fn.inputs.map((input, idx) => (
                <div
                  key={`${fn.name}(${fn.inputs.map(i => i.type).join(',')})-${input.name}-${idx}`}
                  className="form-control rounded-4xl"
                >
                  <label className="label rounded-3xl">
                    <span className="label-text px-4 py-2 text-lime-600 rounded-4xl">
                      {input.name} ({input.type})
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder={
                      input.type.endsWith('[]')
                        ? `JSON array (e.g. ["value1", 2])`
                        : `Enter ${input.type}`
                    }
                    className={`input input-bordered input-sm transition-all rounded-4xl ${
                      inputErrors[idx] ? 'input-error' : ''
                    }`}
                    value={inputs[idx] || ''}
                    onChange={e => handleInputChange(idx, e.target.value)}
                    maxLength={
                      input.type === 'address' ? 42 : undefined
                    }
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {inputErrors[idx] && (
                    <span className="text-xs text-red-500 px-2 py-1">
                      {inputErrors[idx]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction status */}
        <div className="mt-3">
          {isButtonLoading || isConfirming ? (
            <div className="flex flex-col space-y-2 text-lime-600">
              <div className="flex items-center space-x-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span className="text-sm">
                  {isButtonLoading
                    ? 'Sending transaction...'
                    : 'Waiting for confirmation...'}
                </span>
              </div>
              {txHash && (
                <div className="text-xs font-mono break-all">
                  Tx Hash: {txHash}
                </div>
              )}
            </div>
          ) : writeError ? (
            <div className="alert alert-error shadow-sm rounded-4xl">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">Error: {writeError}</span>
              </div>
            </div>
          ) : txError ? (
            <div className="alert alert-error shadow-sm rounded-4xl">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">
                  Error:{' '}
                  {txError instanceof Error
                    ? txError.message
                    : 'Transaction failed'}
                </span>
              </div>
            </div>
          ) : isConfirmed && receipt ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 p-3 bg-base-300 rounded-4xl"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex  items-center">
                  <button
                    onClick={() => setShowTransactionData(!showTransactionData)}
                    className="btn btn-sm btn-ghost text-lime-600 rounded-3xl border-lime-200"
                  >
                    {showTransactionData ? 'Hide Data' : 'Show Data'}
                  </button>
                </div>

                {showTransactionData && transactionData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3"
                  >
                    <div className="bg-base-100 rounded-2xl p-3">
                      <h4 className="text-sm font-semibold text-lime-600 mb-2">
                        Transaction Data
                      </h4>
                      <div className="bg-base-200 rounded-xl p-3 max-h-60 overflow-auto">
                        <pre className="flex flex-col items-start text-start text-xs text-lime-800 whitespace-pre-wrap break-words">
                          {JSON.stringify(transactionData, (key, value) => {
                            if (typeof value === 'bigint') {
                              return value.toString()
                            }
                            return value
                          }, 2)}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

// --- Main component

export const ContractWriteDisplay = ({
  address,
  abi: abiProp,
}: ContractReadDisplayProps) => {
  // --- ASYNC Contract Data
  const [contractData, setContractData] = useState<ContractData | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    Promise.resolve(getContractData()).then((d) => {
      if (!cancelled) setContractData(d)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  // Use network config instead of hardcoded chains
  const chainId = useChainId()
  const targetChainId = chainId && isChainSupported(chainId) ? chainId : DEFAULT_CHAIN_ID
  const networkConfig = getNetworkConfig(targetChainId)
  
  const chain = useMemo(() => {
    if (networkConfig) {
      return networkConfigToChain(networkConfig)
    }
    // Fallback to first supported chain if no config found
    const fallbackConfig = SUPPORTED_CHAINS[0]
    return networkConfigToChain(fallbackConfig)
  }, [networkConfig])

  // --- contractAddress: prefer prop, else contractData (and validate)
  const contractAddress: Address | undefined = useMemo(() => {
    if (address && isValidAddress(address)) {
      return address as Address
    }
    const chainData = contractData?.[chain.id]
    if (chainData?.YourContract?.address && isValidAddress(chainData.YourContract.address)) {
      return chainData.YourContract.address as Address
    }
    return undefined
  }, [address, contractData, chain.id])

  // --- ABI: prefer prop, else lookup contractData
  const abi = useMemo(() => {
    if (Array.isArray(abiProp)) return abiProp
    const chainData = contractData?.[chain.id]
    return Array.isArray(chainData?.YourContract?.abi) ? chainData.YourContract.abi : []
  }, [abiProp, contractData, chain.id])

  // --- Filter writable functions (non-view/pure)
  const writableFunctions: ContractFunction[] = useMemo(
    () =>
      Array.isArray(abi)
        ? abi.filter(
            (fn: any) =>
              fn.type === 'function' &&
              fn.stateMutability !== 'view' &&
              fn.stateMutability !== 'pure',
          )
        : [],
    [abi],
  )

  // --- UI
  const [isExpanded, setIsExpanded] = useState(false)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg text-lime-600"></span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl bg-green-500 font-black justify-center items-center w-96 text-lime-700 mb-6 font-geist-mono border rounded-full py-2">Write Contract</h1>
      
      {/* Network status indicator */}
      <div className="mb-4 text-center">
        <div className={`badge ${isChainSupported(targetChainId) ? 'badge-success' : 'badge-warning'} gap-2`}>
          {isChainSupported(targetChainId) ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {chain.name} (ID: {chain.id})
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="CurrentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="mt-4 space-y-4 mb-20">
        {contractAddress === undefined ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="alert alert-warning shadow-lg rounded-3xl"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                No contract found for {chain.name} (Chain ID: {chain.id})
              </span>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {writableFunctions.map(fn => (
              <ContractWriteFunction
                key={`${fn.name}(${fn.inputs.map(i => i.type).join(',')})`}
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
                  <h5 className="card-title text-sm text-lime-600">
                    ABI Functions
                  </h5>
                  <p className="font-mono text-lime-800">
                    {writableFunctions.length} writable function
                    {writableFunctions.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 border border-lime-100 rounded-4xl">
                <div className="card-body flex items-center">
                  <h5 className="card-title text-sm text-lime-600">Network</h5>
                  <p className="font-mono text-lime-800">
                    {chain.name} (ID: {chain.id})
                  </p>
                </div>
              </div>
              <div className="card bg-base-200 border border-lime-100 col-span-2 rounded-4xl">
                <div className="card-body flex items-center">
                  <h5 className="card-title text-sm text-lime-600">
                    Contract Address
                  </h5>
                  <p className="font-mono text-sm text-lime-800 break-all">
                    {contractAddress}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}