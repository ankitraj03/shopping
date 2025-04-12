import React, { useState, useEffect } from 'react';
import { useAuth } from '../UserContext/Context';

function Cart() {
  const { cart, removeFromCart, setCart } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    setCart([]); 
    setShowPopup(true); 
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer); 
    }
  }, [showPopup]);

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto relative">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-xl shadow flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-semibold transition-opacity duration-300">
          Order placed successfully!
        </div>
      )}
    </div>
  );
}

export default Cart;
