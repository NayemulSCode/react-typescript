// | বিষয়                         | `interface`                                 | `type`                                             |
// | ---------------------------- | ------------------------------------------- | -------------------------------------------------- |
// | **Use Case**                 | সাধারণত object এর জন্য                      | object, union, primitives সব কিছুর জন্য            |
// | **Extend/Inheritance**       | multiple `extends` দিয়ে সহজে extend করা যায় | `&` দিয়ে intersection করতে হয়                      |
// | **Declaration merging**      | ✔️ হ্যাঁ, সম্ভব                             | ❌ না, সম্ভব না                                     |
// | **Union/Intersection**       | ❌ সরাসরি না                                 | ✔️ হ্যাঁ, ভালোভাবে handle করে                      |
// | **Primitives, Tuples, etc.** | ❌ না, শুধু object structure                 | ✔️ হ্যাঁ, primitive/string/tuple সব define করা যায় |

// INTERFACES
interface UserInterface {
  id: number;
  name: string;
}

// Can be extended
interface AdminInterface extends UserInterface {
  permissions: string[];
}

// Can be reopened (declaration merging)
interface UserInterface {
  email: string; // This gets merged
}

// Can be implemented by classes
class User implements UserInterface {
  constructor(public id: number, public name: string, public email: string) {}
}

// TYPES
type UserType = {
  id: number;
  name: string;
};

// Can be extended using intersection
type AdminType = UserType & {
  permissions: string[];
};

// Cannot be reopened (no declaration merging)
// type UserType = { email: string; } // Error!

// Can create unions
type Status = "loading" | "success" | "error";
type ID = string | number;

// Can create complex type manipulations
type EventHandler<T> = (event: T) => void;
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// WHEN TO USE WHICH

// Use INTERFACE for:
// 1. Object shapes that might be extended
interface ComponentProps {
  className?: string;
}

interface ButtonProps extends ComponentProps {
  onClick: () => void;
}

// 2. API contracts that might evolve
interface ApiUser {
  id: string;
  name: string;
}

// 3. Class contracts
interface Repository<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
}

// Use TYPE for:
// 1. Union types
type Theme = "light" | "dark" | "auto";
type ResponseStatus = "success" | "error" | "loading";

// 2. Function signatures
type EventCallback = (data: any) => void;
type AsyncOperation<T> = () => Promise<T>;

// 3. Computed/conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// 4. Primitive aliases
type UserId = string;
type Timestamp = number;

// PRACTICAL EXAMPLE - Building a form system

// Interface for extensible component props
interface BaseFieldProps {
  name: string;
  label: string;
  error?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type: "text" | "email" | "password";
  placeholder?: string;
}

interface SelectFieldProps extends BaseFieldProps {
  options: Array<{ value: string; label: string }>;
}

// Type for union of possible field props
type FieldProps = TextFieldProps | SelectFieldProps;

// Type for form configuration
type FormConfig = {
  fields: FieldProps[];
  submitHandler: (data: Record<string, any>) => void;
  validationRules?: Record<string, (value: any) => boolean>;
};

// Interface for form context (might be extended by plugins)
interface FormContext {
  values: Record<string, any>;
  errors: Record<string, string>;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
}
