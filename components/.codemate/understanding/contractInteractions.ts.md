# High-Level Documentation: useContractInteraction

## Overview

The `useContractInteraction` hook provides a unified React-based interface for interacting with Ethereum smart contracts from the frontend. It enables users to dynamically select contract functions (read or write), enter required parameters, execute contract calls, and handle results, loading states, and error management.

## Features

- **Dynamic Function Listing:** Extracts and exposes all callable functions from a smart contract's ABI, allowing the user to select any for interaction.
- **Input Management:** Handles dynamic input forms for function parameters, resetting inputs on function change.
- **Read and Write Operations:** Internally manages contract read (view/pure) and write (transactional) calls using Wagmi hooks, including transaction simulation.
- **Transaction Lifecycle:** Tracks transaction status, loading spinners, and exposes results or errors.
- **State Exposure:** Returns all state necessary for UI components—function list, selected function, input values, transaction result, loading logic, and errors.
- **Helpers:** Provides methods to update selected function and input parameters and to execute contract calls.

## Core API Returned

- `functions`: Array of contract functions available for interaction.
- `selectedFunction`: Object representing the function currently selected to call.
- `inputValues`: Key-value store of arguments for the selected function.
- `txValue`: Transaction ether value (for payable functions).
- `callResult`: Output from contract read or write operations (data or success message).
- `isLoading`: Boolean indicating ongoing contract interaction.
- `error`: String detailing the latest error, if any.
- `handleSelectFunction(fnName)`: Selects a contract function by name and resets inputs.
- `handleInputChange(inputName, value)`: Updates inputs for the selected function.
- `setTxValue(val)`: Updates the transaction value.
- `executeFunction()`: Executes the selected contract function.
- `address`: Address of the contract being interacted with.

## Usage Scenario

Ideal for dApps requiring a generic, flexible contract interface component (e.g., admin dashboards, test panels, custom UIs) where users may need to interact with any contract function dynamically—either view data or initiate on-chain transactions.

## Dependencies

Utilizes Wagmi hooks (`useReadContract`, `useWriteContract`, `useWaitForTransactionReceipt`, `useSimulateContract`) for blockchain interaction and React's state/hooks for UI management. Assumes ABI and contract address are provided as props, and also uses a deploy hook to initialize contract metadata.