// Basic boolean usage
let isLoggedIn: boolean = false;
let hasPermission: boolean = true;

// Boolean from comparisons
let isAdult: boolean = age >= 18;
let isValidEmail: boolean = email.includes("@");

// Boolean functions
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// Conditional rendering in React
interface ButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ isLoading, isDisabled, children }) => {
  return (
    <button disabled={isDisabled || isLoading}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};

// Form validation
interface ValidationState {
  isEmailValid: boolean;
  isPasswordValid: boolean;
  isFormValid: boolean;
}

function validateForm(email: string, password: string): ValidationState {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;

  return {
    isEmailValid,
    isPasswordValid,
    isFormValid: isEmailValid && isPasswordValid,
  };
}
