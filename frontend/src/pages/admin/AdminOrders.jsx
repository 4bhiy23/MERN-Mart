import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const AdminOrders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("http://localhost:3000/admin/orders", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      setOrders(result);
    };
    fetchOrders();
  }, []);
  
  return (
      <div className="min-h-screen bg-gray-100 px-6 py-10 w-full">
        <div className=" w-6xl space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Your Orders
          </h1>

          {orders.length === 0 && (
            <p className="text-gray-600">No orders placed yet.</p>
          )}

          {orders.map((order, index) => (
            <div
              key={order._id}
              className="relative flex items-center justify-between bg-white w-full px-6 py-5 rounded-xl border border-dashed border-gray-300 shadow-sm"
            >
              {/* Left Section */}
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">
                  Order #{index + 1}
                </p>

                <p className="text-sm text-gray-600">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <p className="text-sm">
                  Status:{" "}
                  <span className="capitalize font-medium text-yellow-700">
                    {order.status}
                  </span>
                </p>
              </div>

              {/* Ticket Divider */}
              <div className="hidden md:block h-16 border-l border-dashed border-gray-300 mx-6" />

              {/* Right Section */}
              <div className="flex items-center gap-6">
                <p className="text-lg font-semibold text-gray-900">
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </p>

                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                  onClick={() => {
                    navigate(`/orders/${order._id}`, {state: {order: order}})
                  }}
                >
                  View Details →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default AdminOrders
