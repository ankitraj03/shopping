import React, { useState } from 'react';

import { useAuth } from '../UserContext/Context';
import axios from 'axios';

function Login({display, setDisplay}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();


  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      const { token } = res.data;
      if (token) {
        login(token);
        console.log('Login successful:', token);
      } else {
        setError('Token not received');
      }
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError('Invalid username or password');
    }
  };

  return (
    <div className={`${display} fixed inset-0 min-h-screen bg-opacity-30 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 relative">
        <button
          className="absolute top-4 right-4 border border-gray-300 rounded-lg p-1 text-lg font-semibold"
          onClick={()=>{
            setDisplay("hidden")
          }}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Your username or email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-200 text-gray-700 font-semibold rounded-md py-2"  onClick={()=>{
            setDisplay("hidden")
          }}
          >
            Log In
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
