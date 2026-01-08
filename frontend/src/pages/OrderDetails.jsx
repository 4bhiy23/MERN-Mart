import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();


  // Order passed from Orders page
  const order = location.state?.order;
    // console.log(order)
  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <p className="text-lg font-medium text-gray-700">
            Order details not available.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => navigate("/orders")}
          >
            ← Back to Orders
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order Details
              </h1>
              <p className="text-sm text-gray-600">
                Order ID: {order._id}
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          </div>

          {/* Order Summary */}
          <Card className="shadow-none border border-gray-300">
            <CardHeader>
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="capitalize font-medium text-yellow-700">
                  {order.status}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total Amount</span>
                <span>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Items List */}
          <Card className="shadow-none border border-gray-300">
            <CardHeader>
              <CardTitle className="text-xl">Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="space-y-1">
                    <p className="font-medium">
                      {/* Item #{index + 1} */}
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => navigate("/orders")}>
              Back to Orders
            </Button>
            <Button 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => window.print()}
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
