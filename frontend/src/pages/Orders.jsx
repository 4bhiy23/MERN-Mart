import Navbar from '@/components/Navbar'
import React from 'react'
const Orders = () => {
  return (
    <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
            <h1 className="text-5xl font-extrabold mb-4">Coming Soon</h1>
            <p className="text-lg text-gray-600 mb-8">Our Orders page is on the way. Stay tuned!</p>
            <div className="w-32 h-32 border-4 border-black border-dashed rounded-full animate-pulse"></div>
        </div>
    </>
  )
}

export default Orders
