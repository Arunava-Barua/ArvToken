import React, { useEffect, useState, useContext } from "react";
import TransferBtn from "./TransferBtn";

import { TailSpin } from "react-loader-spinner";

import { TokenContext } from "../context/TokenContext";

const Exchange = () => {
  const {
    tokenTransfer,
    connectWallet,
    setAddress,
    setAmount,
    getOwner,
    getTokenInfo,
    getTotalSupply,
    setMintAmount,
    mint,
    checkEvent,
    owner,
    totalSupply,
    info,
    mintAmount,
    currentAccount,
    accBalance,
    loading,
    getAccBalance
  } = useContext(TokenContext);

  useEffect(() => {
    getAccBalance();
  }, [])
  

  return (
    <div className="flex flex-col p-4 w-full items-center bg-[#0E1726] rounded-3xl ">
      <label className="flex mb-4 font-bold text-2xl items-center justify-center">
        Transfer
      </label>
      <h3 className="mb-2 font-bold text-[#50d71e] ">
        Balance: {accBalance ? `${accBalance} ARV` : "Click Connect button" }
      </h3>

      <input
        type="text"
        className="bg-[#181f2f] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
          block p-2.5 mb-4 min-w-[300px]
          "
        placeholder="Recipient address"
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        type="number"
        className="bg-[#181f2f] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          p-2.5 mb-4 min-w-[300px]
          "
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      {loading ? (
        <TailSpin
          height="60"
          width="60"
          color=" #ff52d8"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <TransferBtn title="Send" handleClick={tokenTransfer} />
      )}
      {/* //---------------------------------------------------------- */}

      <label className="flex mb-4 mt-4 font-bold text-2xl">Mint</label>
      <h3 className="mb-2 font-bold text-[#f95d3e]">
        Total Supply: {totalSupply} {`ARV`}
      </h3>
      <h3 className="mb-2 font-bold text-[#febf8e]">
        Minted: {mintAmount} {`ARV`}
      </h3>

      <input
        type="number"
        className="bg-[#181f2f] border border-gray-900 text-secondary-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
          p-2.5 mb-4 min-w-[300px]
          "
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      {loading ? (
        <TailSpin
          height="60"
          width="60"
          color=" #ff52d8"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <TransferBtn title="Mint" handleClick={mint} />
      )}
    </div>
  );
};

export default Exchange;
