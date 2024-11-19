'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ShoppingMenu: React.FC = () => {
  const [username, setUsername] = useState('');
  const [displayUsername, setDisplayUsername] = useState('Guest');
  const [showPopup, setShowPopup] = useState(true);
  const [isIconFilled, setIsIconFilled] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // รับค่า email จาก query

  const handlePopupSubmit = () => {
    if (username.trim()) {
      setDisplayUsername(username);
      setShowPopup(false);
    }
  };

  const toggleIcon = () => setIsIconFilled(!isIconFilled);

  const mockProducts = [
    { id: 1, name: 'Product 1', price: '$10', img: '/tshirt.png' },
    { id: 2, name: 'Product 2', price: '$15', img: '/bottle.png' },
    { id: 3, name: 'Product 3', price: '$20', img: '/oven.png' },
    { id: 4, name: 'Product 4', price: '$25', img: '/tshirt.png' },
    { id: 5, name: 'Product 5', price: '$30', img: '/bottle.png' },
    { id: 6, name: 'Product 6', price: '$35', img: '/oven.png' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#E5E5E5]">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-lg p-4">
        <div className="flex items-center space-x-4">
          <Image src="/face.png" alt="Avatar" width={40} height={40} className="rounded-full" />
          <div>
            <span className="font-poppins text-[#4D47C3] text-lg">{displayUsername}</span>
            {email && (
              <p className="text-sm text-gray-500 font-poppins mt-1">{email}</p>
            )}
          </div>
        </div>
      </nav>

      {/* Product Section */}
      <div className="flex overflow-x-scroll p-4 space-x-4">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
          >
            <Image
              src={product.img}
              alt={product.name}
              width={100}
              height={100}
              className="object-contain"
            />
            <h3 className="mt-4 text-lg font-semibold text-center text-[#4D47C3] min-h-[30px]">
              {product.name}
            </h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-poppins text-[#4D47C3] mb-4">Enter your username</h2>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                className="w-full px-4 py-3 border-2 bg-[#F0EFFF] text-[#4D47C3] rounded-md focus:outline-none"
              />
              <button
                onClick={toggleIcon}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <Image
                  src={isIconFilled ? '/icon-filled.svg' : '/icon.svg'}
                  alt="Icon"
                  width={24}
                  height={24}
                  color='#4D47C3'
                />
              </button>
            </div>
            <button
              onClick={handlePopupSubmit}
              className="w-full py-2 mt-4 bg-[#4D47C3] text-white rounded-lg hover:bg-[#3B38A6]"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingMenu;
