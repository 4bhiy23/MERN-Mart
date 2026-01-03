import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarFold } from "lucide-react";

const ProductCard = ({ product }) => {
  
  const addTOCart = async () => {
    await fetch(`http://localhost:3000/cart/addtocart/${product._id}`,{
      method: "GET",
      credentials: "include"
    })
    console.log("Added to Cart")
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-72 flex flex-col">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />

      {/* Product Details */}
      <div className="p-4 flex flex-col grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>

        {/* Spacer to push button to the bottom */}
        <div className="flex flex-col mt-auto">
          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-amber-500">₹{product.price}</span>
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <Button
            className="mt-3 w-full"
            disabled={product.stock === 0}
            // onClick={() => test(product._id)}
            onClick={() => addTOCart()}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
