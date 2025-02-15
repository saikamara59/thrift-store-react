import NavBar from "../components/NavBar";
import React, { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../contexts/CartContext";

const ProductIndex = ({ products }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <main className="min-h-screen bg-blue-200">
      <NavBar />
      <h1 className="text-3xl font-bold mb-4 text-center font-irish p-3"> Products </h1>
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center w-auto"
            >
              <Link to={`/products/${product.product_id}`}>
                <article className="flex flex-col items-center text-center">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-md text-gray-600 mt-1">{product.description}</p>
                  <p className="text-md font-bold mt-1">Price: ${product.price}</p>
                  <p className="text-md text-gray-600 mt-1">Size: {product.size}</p>
                  <p className="text-md text-gray-600 mt-1">Condition: {product.condition}</p>
                </article>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mt-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductIndex;