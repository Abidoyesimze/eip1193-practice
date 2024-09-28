import React, {useState} from "react";
import Wallet from "./components/Wallet";
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
    
    <div className="min-h-screen bg-gray-100 p-8">
     
       <h1 className="text-2xl font-bold mb-4">Ethereum Wallet Connection</h1>
       
      {account.account ? (
        <div className="mb-4">
          <p><strong>Connected Account:</strong> {account.account}</p>
          <p><strong>Network:</strong> {account.network ? account.network.name : "Unknown"}</p>
        </div>
      ) : (
        <button
          onClick={() => account.connectWallet()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Connect Wallet
        </button>
      )}

      {/* Error Handling */}
      {account.error && <p className="text-red-500 mb-4">{account.error}</p>}

      {/* Address Input and Balance */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Ethereum address"
          value={address}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleCheckBalance}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Check Balance
        </button>
      </div>

      {account.balance && (
        <div className="mt-4">
          <p><strong>Balance:</strong> {account.balance} ETH</p>
        </div>
      )}
      </div>
  );
}

export default App;
