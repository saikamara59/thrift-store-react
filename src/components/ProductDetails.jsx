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

import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom'; // Corrected import
import * as productService from '../services/productService';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams(); 
  const navigate = useNavigate(); 
  console.log('productId', productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await productService.show(productId); // Fetch product data
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log('product state', product);

  if (!product) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <h1>Product Details</h1>
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: "100px", height: "auto" }}
          />
          <h2>{product.name}</h2>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Size: {product.size}</p>
          <p>Condition: {product.condition}</p>
          <button onClick={() => alert('Added to cart!')}>Add to Cart</button>
          <button onClick={() =>
             navigate('/products')}>Return to All Products</button>
        </header>
      </section>
    </main>
  );
};

export default ProductDetails;