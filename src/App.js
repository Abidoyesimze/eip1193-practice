import React, { useState } from "react";
import Wallet from "./components/Wallet";
import "./App.css";

function App() {
  const account = Wallet();
  const [address, setAddress] = useState('');

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckBalance = () => {
    account.fetchBalance(address);
  };

  return (
    <div className="app-container">
      <h1 className="title">Ethereum Wallet Connection</h1>

      {account.account ? (
        <div className="account-info">
          <p><strong>Connected Account:</strong> {account.account}</p>
          <p><strong>Network:</strong> {account.network ? account.network.name : "Unknown"}</p>
        </div>
      ) : (
        <button
          onClick={() => account.connectWallet()}
          className="connect-button"
        >
          Connect Wallet
        </button>
      )}

      {account.error && <p className="error-message">{account.error}</p>}

      <div className="balance-check">
        <input
          type="text"
          placeholder="Enter Ethereum address"
          value={address}
          onChange={handleInputChange}
          className="address-input"
        />
        <button
          onClick={handleCheckBalance}
          className="check-balance-button"
        >
          Check Balance
        </button>
      </div>

      {account.balance && (
        <div className="balance-display">
          <p><strong>Balance:</strong> {account.balance} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;