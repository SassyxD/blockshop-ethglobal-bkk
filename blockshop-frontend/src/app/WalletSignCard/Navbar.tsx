"use client";

import React from "react";

interface NavbarProps {
  walletAddress: string | null;
  balance: string | null;
  onDisconnect: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ walletAddress, balance, onDisconnect }) => {
  const shortenAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* โลโก้หรือชื่อแอป */}
      <h1 className="text-xl font-bold">My DApp</h1>

      {/* ส่วนที่แสดงสถานะกระเป๋า */}
      {walletAddress ? (
        <div className="flex items-center space-x-4">
          {/* แสดง Balance */}
          <span className="text-sm">Balance: {balance} cUSD</span>
          {/* ปุ่ม Disconnect */}
          <button
            onClick={onDisconnect}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Disconnect
          </button>
          {/* แสดง Address แบบย่อ */}
          <span className="bg-gray-700 px-4 py-2 rounded-lg">
            {shortenAddress(walletAddress)}
          </span>
        </div>
      ) : (
        <span className="text-sm">Not Connected</span>
      )}
    </nav>
  );
};

export default Navbar;