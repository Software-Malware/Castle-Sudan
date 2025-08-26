import { deployedContracts } from '@/contracts/deployedContracts';

interface ContractData {
  address: string;
  abi: readonly any[];
}

// Type guard to validate ContractData shape at runtime
function isContractData(obj: any): obj is ContractData {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.address === 'string' &&
    Array.isArray(obj.abi)
  );
}

// Main function: validates and returns contract data structure
export default function getContractData(): Record<string, Record<string, ContractData>> {
  const result: Record<string, Record<string, ContractData>> = {};

  for (const [chainId, chainConfig] of Object.entries(deployedContracts)) {
    if (chainConfig === null || typeof chainConfig !== 'object') {
      throw new Error(`Invalid chain config for chainId "${chainId}"`);
    }
    const chainResult: Record<string, ContractData> = {};
    for (const [contractName, contractData] of Object.entries(chainConfig)) {
      if (isContractData(contractData)) {
        chainResult[contractName] = {
          address: contractData.address,
          abi: contractData.abi,
        };
      } else {
        throw new Error(`Invalid contract data for "${contractName}" on chain "${chainId}"`);
      }
    }
    result[chainId] = chainResult;
  }

  return result;
}
