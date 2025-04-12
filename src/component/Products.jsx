import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../UserContext/Context';

function Products({ image, title, price, description, id }) {
  const { token, addToCart } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in first.");
      return;
    }

    addToCart({ id, image, title, price });
  };
  return (
    <Link
      to={`/product/${id}`}
      className="w-full sm:w-[47%] md:w-[30%] lg:w-[23%] h-[60vh] border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-[1.01] p-4 flex flex-col bg-white"
    >
      <div className="w-full h-[55%] bg-gray-50 rounded-xl flex items-center justify-center p-4">
        <img
          src={image}
          alt="product"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between mt-3">
        <h1 className="text-sm font-semibold text-gray-800 truncate mb-2">
          {title}
        </h1>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-green-600">${price}</span>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700 transition duration-300 text-sm" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Products;
