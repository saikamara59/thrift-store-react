
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as productService from '../services/productService';
import { CartContext } from '../contexts/CartContext';
import NavBar from './NavBar';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.show(productId); // Fetch product data
        setProduct(productData);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <main>Loading...</main>;

  return (
    <main className="min-h-screen bg-blue-100">
      <NavBar />
      <section className="flex justify-center items-center p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
          
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 font-irish">{product.name}</h1>
            <p className="text-gray-800 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Price: ${product.price}</p>
              <p className="text-gray-600">Size: {product.size}</p>
              <p className="text-gray-600">Condition: {product.condition}</p>
            </div>

            
            <div className="mt-7 flex space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-purple-800 font-irish"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-gray-600 shadow-xl"
              >
                Return to All Products
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;