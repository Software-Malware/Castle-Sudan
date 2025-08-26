# High-Level Documentation

## Purpose

This module validates and processes a set of deployed smart contract definitions, ensuring the data conforms to an expected structure. It exports a function that returns properly typed and validated contract data, indexed by blockchain network identifiers and contract names.

---

## Overview

- **Input:** The module reads data from `deployedContracts`, which is expected to be a nested object mapping chain IDs (as strings) to contract definitions (by contract name).
- **Validation:** Each contract definition is validated at runtime to ensure it contains both an `address` (string) and an `abi` (array).
- **Output:** A new, strongly typed object is constructed and returned, mapping each chain ID to its contracts. Invalid entries throw descriptive errors.

---

## API

### getContractData

**Signature:**  
`getContractData(): Record<string, Record<string, ContractData>>`

**Description:**  
Returns a validated and type-safe object containing contract data for each chain. The result is a two-level map:
- **Level 1:** Maps chain IDs (strings) to contract groups.
- **Level 2:** For each chain, maps contract names (strings) to objects describing the contract:
    - `address`: The contract's deployment address (string).
    - `abi`: The contract's ABI (immutable array).

**Errors:**  
- If the chain definition or contract data does not match the expected structure, an error is thrown with a descriptive message.

---

## Internal Types

- **ContractData:**  
  ```typescript
  interface ContractData {
    address: string;
    abi: readonly any[];
  }
  ```

- **Type Guards:**  
  A helper function ensures at runtime that each contract entry strictly conforms to the `ContractData` interface.

---

## Usage

Import and call `getContractData()` to retrieve all networked contract addresses and ABIs, guaranteed to be validated and structured consistently.

---

## Notes

- Assumes `deployedContracts` contains all deployed contract data, organized by chain ID and contract name.
- The function is robust against malformed input due to strict type checks and meaningful error messages.