// "এই bugs গুলো runtime এ গিয়ে ধরা পড়লো। কিন্তু আমরা কি development time এই এগুলো ধরতে পারি না?"

// উত্তর: হ্যাঁ! TypeScript ব্যবহার করে আমরা development time এই এই সব errors ধরতে পারি।
// TypeScript compiler আমাদের code লেখার সময়ই বলে দেয় কোথায় সমস্যা আছে, যাতে production এ গিয়ে users এই errors না দেখে।

// JavaScript + Types = TypeScript
// Microsoft এর তৈরি
// JavaScript এর superset
// Development time এ error catch করে
// Production এ JavaScript compile হয়

// Basic syntax
const variableName: type = value;

// Type inference - TypeScript can often infer types
const inferredString = "Hello"; // TypeScript knows this is a string
const explicitString: string = "World"; // Explicitly declared string

// এই JavaScript code এ কি সমস্যা দেখতে পাচ্ছেন?
function calculateTotal(price, tax) {
  return price + tax;
}

const total = calculateTotal("100", "15"); // "10015" 😱
const total2 = calculateTotal(100); // NaN 😱
const total3 = calculateTotal(100, 15); //115 😱

// এই bugs গুলো runtime এ গিয়ে ধরা পড়লো। কিন্তু আমরা কি development time এই এগুলো ধরতে পারি না?"

// JavaScript এ
function greet(name) {
  return "Hello " + name.toUpperCase();
}

greet(123); // Runtime error!

// TypeScript এ
function greet(name: string) {
  return "Hello " + name.toUpperCase();
}

greet(123); // Development time এই error দেখাবে! ✅

// Benefits যা highlight করবেন:

// Early Error Detection
// Better IDE Support (autocomplete, refactoring)
// Self-documenting Code
// Easier Refactoring
// Team Collaboration improved
