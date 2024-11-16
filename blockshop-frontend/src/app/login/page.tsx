'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter(); // ใช้ useRouter เพื่อการนำทาง

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(!isValid);

    // Triggering animation
    const emailField = document.getElementById('email');
    if (!isValid && emailField) {
      emailField.classList.add('shake-animation');
      setTimeout(() => emailField.classList.remove('shake-animation'), 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);

    if (!emailError && password) {
      // เมื่อการ validate สำเร็จ ให้เปลี่ยนเส้นทางไปยัง shopping-menu/page.tsx
      router.push('/shopping-menu?email=${encodeURIComponent(email)}');
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Logging in with ${platform}`);
    // Implement login functionality here
  };

  return (
    <div className="flex h-screen bg-[#E5E5E5] px-6 relative">
      {/* Blockshop Logo */}
      <div className="absolute top-5 left-5 text-2xl text-gray-800 font-rakkas">
        blockshop.
      </div>

      {/* Sign-in Box */}
      <div
        className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-10 ml-auto m-32"
        style={{
          marginRight: '30px',
          borderRadius: '40px',
          height: 'fit-content',
        }}
      >
        {/* Header */}
        <div className="flex items-center mb-4">
          <h2 className="font-poppins text-xl text-black">Welcome to</h2>
          <span className="font-rakkas text-2xl text-gray-800 ml-2">blockshop.</span>
        </div>
        <h1 className="text-5xl font-medium text-gray-800 mb-10 font-poppins">Sign in</h1>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2 font-poppins">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full mt-1 px-4 py-3 border-2 rounded-lg ${
                  emailError
                    ? 'bg-red-100 border-red-500 text-red-500 placeholder-red-500 font-poppins'
                    : 'bg-[#F0EFFF] border-[#6A55FF] text-[#6A55FF] placeholder-[#A7A3FF] font-poppins'
                }`}
                placeholder="Enter your email"
                onBlur={() => validateEmail(email)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1 font-poppins">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 font-poppins">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 border-2 rounded-lg bg-[#F0EFFF] border-[#6A55FF] text-[#6A55FF] placeholder-[#A7A3FF] font-poppins"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <Image
                  src={showPassword ? '/eye-off.svg' : '/eye.svg'}
                  alt="Toggle visibility"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-8">
            <a href="#" className="text-[#6A55FF] text-sm font-poppins hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#4D47C3] rounded-lg font-poppins hover:bg-[#3B38A6]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 text-center text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
          or continue with
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => handleSocialLogin('Facebook')}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-[#F0EFFF]"
            aria-label="Sign in with Facebook"
          >
            <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
          </button>
          <button
            onClick={() => handleSocialLogin('Google')}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-[#F0EFFF]"
            aria-label="Sign in with Google"
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
          </button>
          <button
            onClick={() => handleSocialLogin('Apple')}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full hover:bg-[#F0EFFF]"
            aria-label="Sign in with Apple"
          >
            <Image src="/apple.svg" alt="Apple" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
