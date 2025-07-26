// Primitive types (immutable, stored by value)
const num: number = 42;
const str: string = "hello";
const bool: boolean = true;

// Non-primitive types (mutable, stored by reference)
const arr: number[] = [1, 2, 3];
const obj: { name: string } = { name: "John" };

// Demonstration of difference
let a = 5;
const b = a; // b gets a copy of a's value
a = 10;
console.log(b); // Still 5

const arr1 = [1, 2, 3];
const arr2 = arr1; // arr2 gets reference to same array
arr1.push(4);
console.log(arr2); // [1, 2, 3, 4] - both arrays are affected
