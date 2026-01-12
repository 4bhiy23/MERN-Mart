import React from "react";
import { Button } from "../ui/button";
import {  Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteProduct } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const AdminProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      className={
        product.stock === 0
          ? "bg-gray-50 opacity-60 border border-gray-300 rounded-xl overflow-hidden"
          : "bg-white rounded-xl shadow-lg overflow-hidden w-72 flex flex-col "
      }
    >
      {/* Product Image */}
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/product/image/${product._id}`}
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
            <span className="text-xl font-bold text-amber-500">
              ₹{product.price}
            </span>

            {/* Stock */}
              <div className="flex gap-4 items-center">
                <span
                  className={`text-md font-medium ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                  >
                  {product.stock}
                </span>
                <Link to={`/admin/edit/${product._id}`} state={product}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <Edit />
                  </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => {
                      deleteProduct(product._id)
                      // navigate("/admin", {replace: true})
                    }}
                  >
                    <Trash2 />
                  </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCard;
