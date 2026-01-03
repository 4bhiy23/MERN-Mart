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