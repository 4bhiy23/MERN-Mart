import AdminProductCard from "@/components/admin/AdminProductCard"
import { useEffect, useState } from "react"
import React from 'react'

const AllProducts =  () => {
    const [products, setProducts] = useState([])
    
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`,{
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.log("Error Fetching Products:", error)
            }
        }
        fetchProducts()
    }, [])
    
    return (
    <div>
        <h1 className="text-4xl mb-6 font-semibold">All Products</h1>
        <div className="grid grid-cols-4 gap-5">
            {products.slice().reverse().map(e => (
                // <p key={e._id}>{e.title}</p>
                <AdminProductCard key={e._id} product={e} />
            ))}
        </div>
    </div>
  )
}

export default AllProducts
