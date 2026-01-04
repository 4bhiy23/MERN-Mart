import Navbar from "@/components/Navbar";
import React from "react";
import { useState, useEffect } from "react";
import BillSummary from "@/components/BillSummary";
import { Trash2 } from "lucide-react";
import { formatIndianNumber } from "@/lib/utils";
import { deleteFromCart } from "@/lib/utils";
import { clearCart } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrashIcon from "@/components/ui/trash-icon";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const getCartItems = async () => {
      const res = await fetch("http://localhost:3000/cart", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      setCartItems(result);
    };
    getCartItems();
  }, [refresh]);

  const totalBillAmount = () => {
    return cartItems.reduce(
      (sum, e) => sum + e.quantity * e.product.price,
      0
    );
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {/* MAIN CART LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: BILL SUMMARY (FULL HEIGHT) */}
        <div className="w-95 border-r bg-white p-6 sticky top-0 h-full">
          <BillSummary cartItems={cartItems} />
        </div>

        {/* RIGHT: CART TABLE */}
        <div className="flex-1 overflow-y-auto p-8">
          <div 
            className="w-full flex justify-end mb-3 text-red-600"
            onClick={() => {
              clearCart()
              setRefresh(!refresh)
            }}
          >
            <TrashIcon /> Empty cart
          </div>
          <Table>
            <TableCaption>Your Cart ^_^</TableCaption>

            <TableHeader>
              <TableRow className="font-semibold text-lg">
                <TableHead></TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItems.map((e) => (
                <TableRow key={e._id}>
                  <TableCell className="w-10">
                    <Trash2 
                      className="w-5 h-5" 
                      onClick={() => {
                        deleteFromCart(e.product._id)
                        setRefresh(!refresh)
                      }}
                      />
                  </TableCell>
                  <TableCell className="font-medium">
                    {e.product.title}
                  </TableCell>
                  <TableCell>{e.quantity}</TableCell>
                  <TableCell className="text-right">
                    ₹{formatIndianNumber(e.product.price * e.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow className="font-semibold text-lg">
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  ₹{formatIndianNumber(totalBillAmount())}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
