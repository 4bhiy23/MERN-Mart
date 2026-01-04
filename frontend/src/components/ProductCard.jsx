import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge"; // Assuming you use shadcn/ui badges
import { ShoppingCart, ExternalLink } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    // Prevents the card's onClick from firing when clicking the button
    e.stopPropagation();
    navigate(`/details/${product._id}`, { state: { product } });
  };

  return (
    <div
      className="group relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden w-72 flex flex-col cursor-pointer"
      onClick={() => console.log("Card background clicked")}
    >
      {/* Badge Overlay */}
      <div className="absolute top-3 left-3 z-10">
        <Badge 
          variant={product.stock > 0 ? "secondary" : "destructive"}
          className="backdrop-blur-md bg-white/80 dark:bg-black/50"
        >
          {product.stock > 0 ? "In Stock" : "Sold Out"}
        </Badge>
      </div>

      {/* Product Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <h2 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[40px]">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-semibold">Price</span>
            <span className="text-xl font-extrabold text-primary">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          <Button
            size="icon"
            variant="default"
            disabled={product.stock === 0}
            className="rounded-full h-12 w-12 shadow-md hover:scale-105 transition-transform"
            onClick={handleNavigation}
          >
            <ExternalLink className="h-5 w-5" />
            <span className="sr-only">View Details</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;