import React from 'react'
import AdminProductCard from "@/components/admin/AdminProductCard"
import { useEffect, useState } from "react"

const InStock = () => {
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`, {
        method: "GET",
        credentials: "include"
      })
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.log("Error Fetching Products:", error)
    }
  }
  const inStockProducts = products.filter(p => p.stock > 0);
  
  useEffect(() => {
    fetchProducts()
  }, [])
  
  
  return (
    <div>
      <h1 className="text-4xl mb-6 font-semibold">In Stock</h1>
      <div className="grid grid-cols-4 gap-5">
            {inStockProducts.slice().reverse().map(e => (
                // <p key={e._id}>{e.title}</p>
                <AdminProductCard key={e._id} product={e} />
            ))}
        </div>
    </div>
  )
}

export default InStock
