import  {useState, useEffect} from 'react';
import {ethers} from "ethers";

function Wallet() {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);

    const connectWallet = async () =>{
        console.log("working")
        if(window.ethereum){
            try{
              const provider = new ethers.BrowserProvider(window.ethereum);
              await window.ethereum.request({method: 'eth_requestAccounts'});
              const networkDetails = await provider.getNetwork();
              setAccount(account[0]);
              setNetwork(networkDetails);
              setError(null);
    
            } catch (error) {
                console.log("Error connecting to metamask", error);
                setError(error.message);
            }
        } else {
            setError("Metamask is not installed")
        }
    }
      const fetchBalance = async (address) => {
        if (window.ethereum && ethers.isAddress(address)){
            try{
                const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        setBalance(ethers.formatEther(balance));
        setError(null);
            } catch (error) {
                console.log("Error fetching balance:", error);
                setError(error.message);
            }
        } else {
            setError("Invalid Address or metamask not available")
        }
      };

      useEffect(() => {
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                setAccount(accounts[0] || null);
            };
            const handlechainChanged = (_chainId) => {
                window.location.reload();
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handlechainChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                window.ethereum.removeListener('chainChanged', handlechainChanged);
            };
        }
      }, []);
  return {
    account,
    balance,
    network,
    error,
    connectWallet,
    fetchBalance,
  }
}

export default Wallet