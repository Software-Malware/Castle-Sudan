# Security Vulnerability Report

#### Codebase: `lib/contractInteraction.ts`
#### Date: June 2024

---

## 1. **Lack of Input Validation for User-Supplied Contract Function Inputs**

**Findings:**
- The code constructs contract call arguments directly from uncontrolled user inputs:
  ```ts
  const prepareArgs = () => {
    if (!selectedFunction) return [];
    return selectedFunction.inputs.map((input) => inputValues[input.name]);
  };
  ```
- No validation or type-checking of `inputValues` before they are used in contract calls, which can lead to:
  - Unexpected or malformed data being passed to the contract
  - Potential for data corruption, failed transactions, or unexpected contract behavior
  - If the contract has any functions with access control, this can possibly allow for privilege escalation or unauthorized operations if the user can control all input

**Remediation:**
- Strictly validate and sanitize all user input based on ABI specifications (type and allowed values) before passing them as arguments.

---

## 2. **User-Supplied Values for Value Transfers**

**Findings:**
- The amount of Ether to send (`txValue`) is set directly via state and passed as BigInt, derived from user-controlled input:
  ```ts
  value: txValue ? BigInt(txValue) : undefined,
  ```
- There is no validation or check to ensure that:
  - The value is a valid, safe, non-negative integer
  - The user cannot attempt to send excessive values (which could lead to loss of funds or Denial of Service through high-value failed transactions)

**Remediation:**
- Add numeric validation and enforce upper/lower bounds on value transfer amounts
- Ensure values cannot underflow, overflow, or be negative

---

## 3. **Arbitrary Function Selection and Execution**

**Findings:**
- Users can select *any* function in the ABI and pass arbitrary parameters for execution.
- If the ABI includes admin, upgrade, or sensitive operations, or if the contract is not correctly permissioned, this UI could allow unexpected or dangerous calls. Example:
  ```ts
  const handleSelectFunction = (fnName: string) => {
    const func = functions.find((f) => f.name === fnName);
    ...
  };
  ```
  and
  ```ts
  if (selectedFunction.type === 'write' && writeConfig?.request) {
    await writeContract(writeConfig.request);
  }
  ```

**Remediation:**
- Restrict the available functions users can invoke through the UI
- Implement a whitelist of safe contract methods, and avoid exposing admin-level or sensitive functions

---

## 4. **Potential Information Disclosure**

**Findings:**
- Error messages from `simulateError` or `writeError` are used directly in UI:
  ```ts
  setError((simulateError || writeError)?.message || 'Transaction failed');
  ```
- If the library or RPC returns sensitive error details, these could be exposed to users, potentially leaking stack traces, contract states, node info, etc.

**Remediation:**
- Sanitize and/or standardize error messages before rendering to users

---

## 5. **Environment/Network Hardcoding Risk**

**Findings:**
- The contract data is sourced from a hardcoded network ID (`31337`) and contract name:
  ```ts
  const address = ContractData['31337']['YourContract'].address
  ```
- If this gets deployed to a public environment inadvertently or contract data is incorrectly mapped, users may interact with an unintended contract.

**Remediation:**
- Clearly segregate test/development and production networks; avoid hardcoding where possible

---

## 6. **No Re-Entrancy/Transaction Replay Controls**

**Findings:**
- The UI has no timeouts, transaction debouncing, or re-entry guards for rapid repeated writes (send spam/DoS).

**Remediation:**
- Implement request debouncing, transaction queueing, and lock the UI while transactions are pending

---

# **Summary Table**

| Type                                | Risk Level | Description                                            | Remediation                      |
|--------------------------------------|------------|--------------------------------------------------------|----------------------------------|
| Unvalidated Contract Inputs          | High       | Arbitrary, unchecked user input injected to functions  | Input validation/sanitization    |
| Arbitrary Value Transfer             | High       | User controls ETH value; no validation                 | Bound and check input values     |
| Arbitrary Contract Function Access   | High       | User can invoke any contract ABI function              | Function whitelist               |
| Sensitive Error Info Exposure        | Medium     | Raw error messages may disclose internals              | Error sanitization               |
| Hardcoded Testnet Config             | Medium     | Possible network confusion, wrong contract usage       | Correct environment segregation  |
| Re-Entrancy/Repetition (UI DoS)      | Medium     | No UI controls for rapid repeated operations           | Lock UI while tx pending         |

---

# **Recommendations**

1. **Sanitize ALL user inputs** prior to invoking any contract function.
2. **Whitelist contract functions** that are safe to expose in the UI.
3. **Strictly validate ETH transfer amounts**.
4. **Avoid displaying raw error messages**—show user-friendly and generic notifications.
5. **Separate and protect configuration** between environments.
6. **Add transaction throttling & UI state locks** during pending operations.

---

# End of Report