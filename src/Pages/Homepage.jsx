import React, { useEffect, useState } from 'react';
import Products from '../component/Products';
import axios from 'axios';
import Header from '../component/Header';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = filter
    ? products.filter(product => product.category === filter)
    : products;

  return (
    <>
      <Header onCategoryChange={setFilter} />

      <div className="pt-28 px-4">
        <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <Products
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Homepage;
