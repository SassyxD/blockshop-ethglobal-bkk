'use client'
import React, { useState } from "react";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(email));
  };

  return (
    <div className="flex h-screen bg-gray-100 px-6 relative">
      {/* Blockshop Logo */}
      <div
        className="absolute top-5 left-5 text-2xl text-gray-800"
        style={{ fontFamily: "Rakkas-Regular, sans-serif" }}
      >
        blockshop.
      </div>

      {/* Sign-in Box */}
      <div
        className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-10 ml-auto"
        style={{
          marginRight: "30px",
          paddingTop: "40px",
          paddingBottom: "40px",
          borderRadius: "40px",
        }}
      >
        {/* Header */}
        <h1
          className="text-5xl font-bold text-gray-800 mb-10"
          style={{
            fontFamily: "Poppins-ExtraLight, sans-serif",
            textAlign: "left",
          }}
        >
          Sign in
        </h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateEmail(email);
          }}
        >
          {/* Email field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
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
                    ? "bg-red-100 border-red-500 text-red-500 focus:outline-none focus:ring-red-500"
                    : "bg-[#F0EFFF] border-[#6A55FF] text-[#6A55FF] focus:outline-none focus:ring-[#6A55FF]"
                }`}
                placeholder="Enter your email"
                onBlur={() => validateEmail(email)}
              />
              {emailError && (
                <p
                  className="text-[#6A55FF] text-sm mt-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>

          {/* Password field */}
          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mt-1 px-4 py-3 border-2 rounded-lg ${
                  passwordError
                    ? "bg-red-100 border-red-500 text-red-500 focus:outline-none focus:ring-red-500"
                    : "bg-[#F0EFFF] border-[#6A55FF] text-[#6A55FF] focus:outline-none focus:ring-[#6A55FF]"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                <Image
                  src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                  alt="Toggle visibility"
                  width={24}
                  height={24}
                />
              </button>
              {passwordError && (
                <p
                  className="text-[#6A55FF] text-sm mt-1"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div
          className="mt-8 text-center text-gray-500"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          or continue with
        </div>

        {/* Social buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label="Sign in with Facebook"
          >
            <Image src="/facebook.svg" alt="Facebook" width={24} height={24} />
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300"
            aria-label="Sign in with Google"
          >
            <Image src="/google.svg" alt="Google" width={24} height={24} />
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300"
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
