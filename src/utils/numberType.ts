// All numbers in TypeScript are floating point
const integer: number = 42;
const float: number = 3.14159;
const hex: number = 0xff; // Hexadecimal
const binary: number = 0b1010; // Binary
const octal: number = 0o744; // Octal

// Mathematical operations
const result: number = integer + float; // TypeScript ensures type safety

// Number methods
const pi: number = 3.14159;
const rounded: number = Math.round(pi); // 3
const fixed: string = pi.toFixed(2); // "3.14" - returns string!

// Working with user input (common frontend scenario)
function calculateDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}

// Form handling example
interface PriceFormData {
  basePrice: number;
  taxRate: number;
  discountCode?: string;
}

function calculateTotal(data: PriceFormData): number {
  const tax = data.basePrice * (data.taxRate / 100);
  return data.basePrice + tax;
}
