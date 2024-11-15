import React from "react"
// import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa"

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left side (optional) */}
        <div className="hidden md:flex w-1/2 h-full bg-blue-500 items-center justify-center">
          <h2 className="text-white text-3xl font-semibold">Welcome Back!</h2>
        </div>
        {/* Right side */}
        <div className="w-full md:w-1/2 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in</h1>
          </div>
          <form className="mt-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            {/* Password field */}
            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            {/* Login button */}
            <button
              type="submit"
              className="w-full mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
          {/* Divider */}
          <div className="mt-6 text-center text-gray-500">or continue with</div>
          {/* Social buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label="Sign in with Facebook"
            >
              {/* <FaFacebook className="text-blue-600" /> */}
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label="Sign in with Google"
            >
              {/* <FaGoogle className="text-red-500" /> */}
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300"
              aria-label="Sign in with Apple"
            >
              {/* <FaApple className="text-black" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
