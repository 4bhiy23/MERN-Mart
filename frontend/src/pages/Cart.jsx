import Navbar from "@/components/Navbar";
import React from "react";
import { useState, useEffect } from "react";
import { formatIndianNumber } from "@/lib/utils";

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

import BillSummary from "@/components/BillSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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
  }, []);

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
        <div className="w-[380px] border-r bg-white p-6 sticky top-0 h-full">
          <BillSummary cartItems={cartItems} />
        </div>

        {/* RIGHT: CART TABLE */}
        <div className="flex-1 overflow-y-auto p-8">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>

            <TableHeader>
              <TableRow className="font-semibold text-lg">
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItems.map((e) => (
                <TableRow key={e._id}>
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
                <TableCell colSpan={2}>Total</TableCell>
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
