"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./WalletSignCard/Navbar";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import WalletCard from "./WalletSignCard/signCard";

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(true);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

  // ตรวจสอบสถานะการเชื่อมต่อกระเป๋าเมื่อโหลดหน้า
  useEffect(() => {
    const checkWalletConnection = async () => {
      const provider = window.ethereum || window.celo;
      if (provider) {
        try {
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            const address = accounts[0];
            setWalletAddress(address);
            setWeb3Instance(web3);
            await fetchBalance(web3, address);
            setIsPopupVisible(false);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      } else {
        console.log("No provider detected: Please install MetaMask or Celo Wallet.");
      }
    };
    checkWalletConnection();
  }, []);

  // ดึงยอด Balance
  const fetchBalance = async (web3: Web3, address: string) => {
    try {
      const kit = newKitFromWeb3(web3);
      const totalBalance = await kit.getTotalBalance(address);
      const cUSDBalance = totalBalance.cUSD.shiftedBy(-18).toFixed(2);
      setBalance(cUSDBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // ฟังก์ชันเชื่อมต่อกระเป๋า
  const connectWallet = async (walletType: string) => {
    let provider: any;

    if (walletType === "MetaMask") {
      provider = window.ethereum;
      if (!provider) {
        alert("MetaMask not found. Please install MetaMask.");
        return;
      }
    } else if (walletType === "Celo") {
      provider = window.celo;
      if (!provider) {
        alert("Celo Wallet not found. Please install Celo Wallet.");
        return;
      }
      await provider.enable(); // สำหรับ Celo Wallet ต้อง enable ก่อนใช้งาน
    }

    try {
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts(); // ใช้ requestAccounts() เพื่อขอ Address
      if (accounts.length === 0) {
        console.error("No accounts found. Please unlock your wallet.");
        return;
      }

      const address = accounts[0];
      setWalletAddress(address);
      setWeb3Instance(web3);
      await fetchBalance(web3, address);
      setIsPopupVisible(false);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  };

  // ฟังก์ชัน Disconnect กระเป๋า
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
    setWeb3Instance(null);
    setIsPopupVisible(true); // เปิดหน้า Card อีกครั้ง
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        walletAddress={walletAddress}
        balance={balance}
        onDisconnect={disconnectWallet}
      />
      {isPopupVisible && <WalletCard onConnect={connectWallet} />}
    </div>
  );
};

export default App;