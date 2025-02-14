// import React from 'react'
// import { useParams } from 'react-router'
// import * as productService from '../services/productService'

// const ProductDetails = () => {
//     const [product, setProduct] = useState(null);
//     const{productId} = useParams();
//     console.log('productId',productId)

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const productData = await productService.show(productId);
//       setProduct(productData);
//     };
//     fetchProduct();
//   }, [productId]);
//   console.log('product state', product);


//   if (!product) return <main>Loading...</main>;


    
//   return ( <main>
//     <section>
//         <header>
//             <h1> ProductDetails</h1>
//         <img
//               src={product.image_url}
//               alt={product.name}
//               style={{ width: "100px", height: "auto" }}
//             />
//             <h2>{product.name}</h2>
//             <p>Description:{product.description}</p>
//             <p>
//             Price: $  {product.price}
//             </p>
//             <p>Size: {product.size}</p>
//             <p>Condition:
//                 {product.condition}
//             </p>
//             <button type='onClick'>Add to Cart</button>
//         </header>
//     </section>
//    </main>)
// }

// export default ProductDetails

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    <main className="min-h-screen bg-gray-100">
      <NavBar />
      <section className="flex justify-center items-center p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
          
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Price: ${product.price}</p>
              <p className="text-gray-600">Size: {product.size}</p>
              <p className="text-gray-600">Condition: {product.condition}</p>
            </div>

            
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
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