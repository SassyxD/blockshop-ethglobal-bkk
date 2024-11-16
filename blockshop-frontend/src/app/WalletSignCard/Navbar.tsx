"use client";

import React, { useState } from "react";

interface NavbarProps {
  walletAddress: string | null;
  balance: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ walletAddress, balance }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  const shortenAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">My DApp</h1>

      {walletAddress ? (
        <div className="relative">
          {/* ปุ่ม Address */}
          <button
            onClick={toggleDetails}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            {shortenAddress(walletAddress)}
          </button>

          {/* Card แสดงรายละเอียด */}
          {showDetails && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-40 backdrop-blur-md flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
                  Wallet Details
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Address:{" "}
                  {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Balance: {balance || "Loading..."} cUSD
                </p>
                <div className="space-y-2">
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Withdraw
                  </button>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                    Transfer
                  </button>
                  <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm">Not Connected</p>
      )}
    </div>
  );
};

export default Navbar;
