import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";

import { TokenContext } from "../context/TokenContext";
import MetamaskBtn from "../components/MetamaskBtn";
import Exchange from "../components/Exchange.jsx";

import styles from "../styles";

import uniswapLogo from "../assets/uniswapLogo.png";

export default function Home() {
  const {
    connectWallet,
    currentAccount,
  } = useContext(TokenContext);

  return (
    <div className="flex flex-col items-center justify-center bg-[#111827] text-white h-screen w-full relative">
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <header className={styles.header}>
            <Image
              src={uniswapLogo}
              width={16}
              height={16}
              alt="uniswap-logo"
              className="w-16 h-16 object-contain"
            />
            <MetamaskBtn
              handleClick={connectWallet}
              currentAccount={currentAccount}
            />
          </header>

          <div className={styles.exchangeContainer}>
            <h1 className={styles.headTitle}>Token Management</h1>
            <p className={styles.subTitle}>Transfer ARV tokens in seconds</p>

            <div className={styles.exchangeBoxWrapper}>
              <div className={styles.exchangeBox}>
                <div className="pink_gradient" />
                <div className={styles.exchange}>
                  <Exchange />
                </div>
                <div className="blue_gradient" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
