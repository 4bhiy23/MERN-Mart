import React from "react";
import { formatIndianNumber } from "../lib/utils";
import { Button } from "./ui/button";

const BillSummary = ({ cartItems }) => {
  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryFee = itemsTotal > 500 ? 0 : 50;
  const tax = Math.round(itemsTotal * 0.18);
  const grandTotal = itemsTotal + deliveryFee + tax;

  return (
    <div className="w-full max-w-sm border rounded-lg p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Bill Details</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span>₹{formatIndianNumber(itemsTotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              `₹${formatIndianNumber(deliveryFee)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span>GST (18%)</span>
          <span>₹{formatIndianNumber(tax)}</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-base">
          <span>Total Payable</span>
          <span>₹{formatIndianNumber(grandTotal)}</span>
        </div>
      </div>

      <Button className="w-full mt-4">
        Place Order →
      </Button>
    </div>
  );
};

export default BillSummary;
