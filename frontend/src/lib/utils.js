import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatIndianNumber(num) {
  if (num === null || num === undefined) return "";

  const [integerPart, decimalPart] = num.toString().split(".");

  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  const formatted =
    otherDigits.length > 0
      ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
      : lastThree;

  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

export const addTOCart = async (productid) => {
  await fetch(`http://localhost:3000/cart/addtocart/${productid}`, {
    method: "GET",
    credentials: "include"
  })
  console.log("Added to Cart")
}

export const deleteFromCart = async (productid) => {
    try {
      const res = await fetch(`http://localhost:3000/cart/deletefromcart/${productid}`, {
      method: "DELETE",
      credentials: "include"
      })
      const result = await res.json()
      console.log(result)
      if (!res.ok){
        console.log("Product deleted")
      }
    } catch (error) {
      console.log(error)
    }
}

export const clearCart = async () => {
  try{
    await fetch("http://localhost:3000/cart/clear",{
      method: "PATCH",
      credentials: "include"
    })
  } catch(error){
    console.log("Error clearing cart:", error)
  }
}