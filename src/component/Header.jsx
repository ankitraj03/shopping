import React, { useState } from 'react';
import Login from './Login';
import { useAuth } from '../UserContext/Context';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';

function Header({ onCategoryChange }) {
  const [display, setDisplay] = useState("hidden");
  const [menu, setMenu] = useState(false);
  const { token, logout, cart } = useAuth();

  const handleCategoryChange = (e) => {
    onCategoryChange(e.target.value);
    setMenu(false); 
  };

  const handleSearch = () => {
    setMenu(false); 
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md fixed w-full top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-600">LOGO</Link>

        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenu(!menu)}
        >
          <Menu />
        </button>

        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            onChange={handleCategoryChange}
            className="px-3 py-2 border-t border-b border-gray-300 text-gray-600 text-sm outline-none"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <button
            className="px-5 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-700 hover:underline">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {
            !token ? (
              <button
                className="bg-red-400 px-4 py-1 text-white rounded-full hover:bg-red-500"
                onClick={() => setDisplay("block")}
              >
                Login
              </button>
            ) : (
              <button
                className="bg-green-400 px-4 py-1 text-white rounded-full hover:bg-green-500"
                onClick={logout}
              >
                Logout
              </button>
            )
          }
        </div>
      </div>

      {menu && (
        <div className="md:hidden px-4 pt-20 pb-4 flex flex-col gap-3 bg-white shadow-md w-full fixed top-0 z-40">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 text-gray-600 text-sm outline-none rounded-md"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>

          <button
            className="w-full px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>

          <div className="flex items-center justify-between mt-2">
            <Link to="/cart" className="relative text-gray-700 hover:underline">
              <ShoppingCart />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            {
              !token ? (
                <button
                  className="bg-red-400 px-4 py-1 text-white rounded-full hover:bg-red-500"
                  onClick={() => {
                    setDisplay("block");
                    setMenu(false);
                  }}
                >
                  Login
                </button>
              ) : (
                <button
                  className="bg-green-400 px-4 py-1 text-white rounded-full hover:bg-green-500"
                  onClick={() => {
                    logout();
                    setMenu(false);
                  }}
                >
                  Logout
                </button>
              )
            }
          </div>
        </div>
      )}

      <Login display={display} setDisplay={setDisplay} />
    </>
  );
}

export default Header;
 