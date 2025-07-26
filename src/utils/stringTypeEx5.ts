// Basic string types
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`; // Template literal

// String methods with TypeScript
const message: string = "Hello World";
const upperMessage: string = message.toUpperCase(); // TypeScript knows this returns string
const messageLength: number = message.length; // TypeScript knows this returns number

// String literal types
type Theme = "dark" | "light" | "auto";
const currentTheme: Theme = "dark"; // Only these three values allowed

// Working with user input
function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

// Example in React component
interface UserProps {
  username: string;
  email: string;
}

// const UserCard: React.FC<UserProps> = ({ username, email }) => {
//   return (
//     <div>
//       <h3>{username}</h3>
//       <p>{email}</p>
//     </div>
//   );
// };
