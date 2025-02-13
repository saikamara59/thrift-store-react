// import React from 'react'
// import { Link } from 'react-router';



// const ProductIndex = (props) => {
//   console.log(props)

//     if (!props.products) {
//     return <div>Loading...</div>; // Loading state
//   }

//   if (props.products.length === 0) {
//     return <div>No products found.</div>; // Empty state
//   }
//   return (
//     <main>
//       {props.products.map((product) => (
//        <Link key={product._id}to={`/products/${product._id}`}>
//        <article> 
//         <h3>{product.name}</h3>
//        <p>
//       Description:{product.description}</p>
//        <p>Price:{product.price}</p>
//       <p>Size: {product.size}</p>
//       <p>Conditon:{product.condition}</p>
//       <img
//       src={product.image_url}
//       alt={product.name}
//       style={{width:"100px", height: "auto"}}
// />
//        </article>
//        </Link>
//       ))}
//     </main>
//   );
// };

// export default ProductIndex

import NavBar from "../components/NavBar";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const ProductIndex = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <main>
      <NavBar />
      <div className="flex overflow-x-auto gap-4 p-4"> 
        {products.map((product) => (
          <div
            key={product.product_id}
            className="min-w-[250px] bg-white rounded-lg shadow-md p-4 flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/products/${product.product_id}`}>
              <article className="flex flex-col items-center text-center">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md mb-2"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <p className="text-md font-bold mt-1">Price: ${product.price}</p>
                <p className="text-sm text-gray-700 mt-1">Size: {product.size}</p>
                <p className="text-sm text-gray-700 mt-1">Condition: {product.condition}</p>
              </article>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md mt-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductIndex;