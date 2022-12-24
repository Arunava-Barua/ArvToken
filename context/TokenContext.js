import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { TokenAddress, TokenAddressABI } from "./constants";

export const TokenContext = React.createContext();

export const TokenProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [owner, setOwner] = useState("");
  const [mintAmount, setMintAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [info, setInfo] = useState([]);
  const [accBalance, setAccBalance] = useState(0);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    // Fetch all the eth accounts------------------------------------here----------------
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    getAccBalance();
  };

  useEffect(() => {
    try {
      checkIfWalletIsConnected();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const tokenTransfer = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      // 1 ----> 1000000000000000000
      const parseAmount = ethers.utils.parseEther(amount);

      const txRes = await contract.transfer(address, parseAmount, {
        gasLimit: 5000000,
      });

      setLoading(true);
      await txRes.wait();
      setLoading(false);

      getAccBalance();

      console.log(txRes);
    }
  };

  const getTokenInfo = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        provider /*signer*/
      );

      const txRes = await contract.getInfo();
      setInfo(txRes);
    }
  };

  const getOwner = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        provider /*signer*/
      );

      const txRes = await contract.getInfo();
      setInfo(txRes);
    }
  };

  const getTotalSupply = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        provider /*signer*/
      );

      const txRes = await contract.getTotalSupply();
      const amount = ethers.utils.formatEther(txRes);
      // console.log(amount);
      setTotalSupply(amount);
    }
  };

  const getMintedAmount = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        provider /*signer*/
      );

      const txRes = await contract.getNumMinted();
      const amount = ethers.utils.formatEther(txRes);
      console.log(amount);
      setMintAmount(amount);
    }
  };

  const getAccBalance = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        provider /*signer*/
      );

      try {
        console.log("Current Account: " + currentAccount);
        const txRes = await contract.balanceOf(currentAccount);
        const amount = ethers.utils.formatEther(txRes);
        console.log(amount);
        setAccBalance(amount);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const mint = async () => {
    if (window.ethereum) {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        TokenAddress,
        TokenAddressABI,
        signer
      );

      // 1 ----> 1000000000000000000
      // console.log(amount);
      const parseAmount = ethers.utils.parseEther(amount);
      // console.log(parseAmount);

      const txRes = await contract.mint(parseAmount);

      setLoading(true);
      await txRes.wait();
      setLoading(false);

      getMintedAmount();
      getTotalSupply();
      getAccBalance();

      // console.log(txRes);
    }
  };

  const checkEvent = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
      TokenAddress,
      TokenAddressABI,
      provider
    );

    contract.on("Transfer", (from, to, amount) => {
      console.log("Transfer event was emmitted");
      console.log(JSON.stringify(from));
      console.log(JSON.stringify(to));
      console.log(JSON.stringify(amount.toString()));
    });
  };

  useEffect(() => {
    getMintedAmount();
    getTotalSupply();
  }, []);

  useEffect(() => {
    getMintedAmount();
    getTotalSupply();
  }, [totalSupply, mintAmount]);

  return (
    <TokenContext.Provider
      value={{
        currentAccount,
        connectWallet,
        setAddress,
        setAmount,
        tokenTransfer,
        getTokenInfo,
        getOwner,
        owner,
        getTotalSupply,
        setMintAmount,
        mintAmount,
        mint,
        checkEvent,
        totalSupply,
        info,
        accBalance,
        loading,
        getAccBalance,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
