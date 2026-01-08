import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft, Heart, ShieldCheck } from "lucide-react";
import { addTOCart } from "@/lib/utils";

const DetailedCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-lg bg-slate-50">
        <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 mb-6">Product details could not be loaded.</p>
          <Button variant="default" onClick={() => navigate(-1)}>
            Return to Store
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-black selection:text-white">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </button>
          <Badge variant="secondary" className="font-mono">{product.category}</Badge>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Visuals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={`http://localhost:3000/product/image/${product._id}`}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Info & Purchase */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-2 mb-6">
              <span className="text-sm font-bold tracking-widest uppercase text-slate-400">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {product.title}
              </h1>
              <p className="text-3xl font-light mt-4 text-slate-700">₹{product.price}</p>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-slate-600 border-l-2 border-slate-100 pl-6 italic">
                {product.description || "Crafted with precision and designed for longevity."}
              </p>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1">Stock Status</p>
                  <p className="font-medium">{product.stock > 0 ? `${product.stock} Units Available` : "Out of Stock"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400 mb-1">Authenticity</p>
                  <p className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-4 h-4 text-green-600" /> Verified
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                    className="flex-1 h-14 rounded-full bg-black text-white hover:bg-slate-800 text-lg font-medium transition-all shadow-xl shadow-slate-200"
                    onClick={() => {
                        addTOCart(product._id)
                        navigate("/cart")
                    }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                <Button variant="outline" className="h-14 w-14 rounded-full border-slate-200 hover:bg-slate-50">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-center text-xs text-slate-400 pt-4">
                Free standard shipping on all orders over ₹500.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailedCard;