High-Level Documentation

File: utils/contractTypes.ts

Purpose:
This file defines a TypeScript type named ContractFunction. It is intended to model the structure of a smart contract's function as commonly seen in Ethereum JSON ABI specifications.

Description:
- ContractFunction describes the shape of an object representing a contract function's metadata.
- The object has the following properties:
  - name: Name of the contract function (string).
  - type: Always the string literal 'function'.
  - stateMutability: Describes the function's state mutability; can be 'view', 'pure', 'nonpayable', or 'payable'.
  - inputs: An array of objects, each describing an input parameter to the function (with name, type, and internalType).
  - outputs: An array of objects, each describing an output value returned from the function (with name, type, and internalType).

Intended Use:
This type is meant to provide strong typing for working with, or generating, contract ABIs in TypeScript, improving code robustness and developer experience when dealing with contract function data.