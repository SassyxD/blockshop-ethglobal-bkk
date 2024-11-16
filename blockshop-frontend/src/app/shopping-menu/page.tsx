'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const ShoppingMenu: React.FC = () => {
  const [username, setUsername] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // รับค่า email จาก query

  const handlePopupSubmit = () => {
    if (username.trim()) {
      setShowPopup(false);
    }
  };

  const mockProducts = [
    { id: 1, name: 'Product 1', price: '$10', img: '/tshirt.png' },
    { id: 2, name: 'Product 2', price: '$15', img: '/bottle.png' },
    { id: 3, name: 'Product 3', price: '$20', img: '/oven.png' },
    { id: 4, name: 'Product 1', price: '$10', img: '/tshirt.png' },
    { id: 5, name: 'Product 2', price: '$15', img: '/bottle.png' },
    { id: 6, name: 'Product 3', price: '$20', img: '/oven.png' },
    { id: 7, name: 'Product 1', price: '$10', img: '/tshirt.png' },
    { id: 8, name: 'Product 2', price: '$15', img: '/bottle.png' },
    { id: 9, name: 'Product 3', price: '$20', img: '/oven.png' },
    { id: 10, name: 'Product 1', price: '$10', img: '/tshirt.png' },
    { id: 11, name: 'Product 2', price: '$15', img: '/bottle.png' },
    { id: 12, name: 'Product 3', price: '$20', img: '/oven.png' },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#E5E5E5]">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-lg p-4">
        <div className="flex items-center space-x-4">
          <Image src="/face.png" alt="Avatar" width={40} height={40} className="rounded-full" />
          <span className="font-poppins text-gray-800 text-lg">{username || 'Guest'}</span>
        </div>
      </nav>

      {/* Product Section */}
      <div className="flex overflow-x-scroll p-4 space-x-4">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[200px] bg-white shadow-lg rounded-xl p-4 flex flex-col items-center"
          >
            <Image src={product.img} alt={product.name} width={100} height={100} />
            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-poppins text-gray-800 mb-4">Enter your username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-2 mb-4 border-2 rounded-lg focus:outline-none"
            />
            <button
              onClick={handlePopupSubmit}
              className="w-full py-2 bg-[#4D47C3] text-white rounded-lg hover:bg-[#3B38A6]"
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
