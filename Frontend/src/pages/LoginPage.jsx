"use client";
import { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/";
          } else {
            setError(data.message || "An error occurred. Please try again.");
            localStorage.setItem("isLoggedIn", "false");
          }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-black text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-[#050722] shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
            <a
              href="/"
              className="text-2xl font-extrabold text-[#95bbf5] flex items-center"
            >
              Posture Perfect
            </a>
            </div>
            <div className="mt-0 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-100 tracking-wide font-medium bg-[#050722] transform translate-y-1/2">
                    Sign In with Posture Perfect E-mail
                  </div>
                </div>

                <div className="mx-auto">
                  <form onSubmit={handleLogin}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-[#3c437c] text-white-500 w-full py-4 rounded-lg hover:bg-[#8c95e3] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-2 text-white">Sign In</span>
                    </button>
                  </form>
                  {error && <p className="mt-6 text-xs text-red-600 text-center">{error}</p>}
                  <p className="mt-6 text-xs text-gray-400 text-center">
                  I agree to abide by Posture Perfect's{" "}
                  <a
                    href="#"
                    className="border-b border-gray-400 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-400 border-dotted"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <p className="mt-4 text-sm text-gray-400 text-center">
                  Don&lsquo;t have an account?{" "}
                  <a
                    href="/signup"
                    className="text-[#b4bcfd] hover:text-[#8c95e3] font-semibold"
                  >
                    Sign Up
                  </a>
                </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex bg-blue-100 w-[60%] items-center justify-center text-center lg:flex max-lg:hidden">
          <img src="./background.png" className="w-1/2" />
        </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
