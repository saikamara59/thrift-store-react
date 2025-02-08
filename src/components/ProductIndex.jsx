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


import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";


const ProductIndex = ({ products }) => {
  const {addToCart} = useContext(CartContext)

  return (
    <main>
      {products.map((product) => (
        <Link key={product.product_id} to={`/products/${product.product_id}`}>
          <article>
            <h3>{product.name}</h3> 
            <img
              src={product.image_url}
              alt={product.name}
              style={{ width: "100px", height: "auto" }}
            />
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Size: {product.size}</p>
            <p>Condition: {product.condition}</p>
           
             <button onClick={() => addToCart(product)}>Add to Cart</button>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default ProductIndex;