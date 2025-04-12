import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../UserContext/Context';

function Productdetails() {
  const { token, addToCart } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in first.");
      return;
    }

    addToCart({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    });
  };

  if (!product) return <div className="p-6 text-lg">Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 mx-auto max-w-6xl mt-24 bg-white rounded-2xl">

      <div className="w-full md:w-1/2 flex justify-center items-center rounded-xl shadow border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-[300px] object-contain w-full p-4"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="rounded-2xl p-6 shadow border border-gray-200">
          <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-700">{product.title}</h1>
          <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
        </div>

        <button
          className="bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700 transition duration-300 text-sm"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <div className="rounded-2xl p-6 shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Product Details</h2>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>
          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Productdetails;
