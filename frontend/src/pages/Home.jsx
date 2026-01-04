import React, { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/product",{
          method: "GET",
          credentials: "include"
        })
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    console.log(products)
  }, [products])
  
  return (
    <>
    <Navbar />
    <div className='min-h-[90vh] bg-gray-100 py-10 px-5'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.slice().reverse().map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Home
