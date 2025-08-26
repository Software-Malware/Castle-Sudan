// utils/contractTypes.ts
export type ContractFunction = {
  name: string
  type: 'function'
  stateMutability: 'view' | 'pure' | 'nonpayable' | 'payable'
  inputs: {
    name: string
    type: string
    internalType: string
  }[]
  outputs: {
    name: string
    type: string
    internalType: string
  }[]
}