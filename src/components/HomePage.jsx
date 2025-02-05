import React from "react"; 
import {Link} from "react-router-dom";



const HomePage = () => {
return (
    <>
    <div>
        <h1 className="text-4xl">
            About
        </h1>
        <p>
            A New York Thrift Store was started by a young developer by the name of Saidu Kamara in 2025 this store sells high end fashion pieces and rare vintage items
        </p>
        <div>
            <Link to="/signin">
            Sign In
            </Link>
            <Link to="/signup">
            Sign Up
            </Link>
        </div>
    </div>
    </>
);
};




export default HomePage;