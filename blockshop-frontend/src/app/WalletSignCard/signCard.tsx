"use client";

import React from "react";
import Image from "next/image";

interface WalletCardProps {
  onConnect: (walletType: string) => void;
}

const WalletCard: React.FC<WalletCardProps> = ({ onConnect }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Connect Wallet</h2>
        <p className="text-gray-600 text-center mb-6">
          Select your wallet to connect.
        </p>
        <button
          onClick={() => onConnect("MetaMask")}
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 mb-4 flex items-center justify-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            alt="MetaMask"
            className="w-6 h-6 mr-3"
          />
          Connect MetaMask
        </button>
        <button
          onClick={() => onConnect("MiniPay")}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 flex items-center justify-center"
        >
          <Image
            src="/images/minipayicon.svg" // เส้นทางภาพ
            alt="MiniPay" // ข้อความ alt
            width={24} // กำหนดความกว้าง
            height={24} // กำหนดความสูง
            className="w-6 h-6 mr-3"
          />
          Connect MiniPay
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
