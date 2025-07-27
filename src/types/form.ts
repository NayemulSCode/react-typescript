// types/form.ts
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
  };
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Utility type examples
type UserFormData = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>; // For creating new users
type UserUpdateData = Partial<Pick<UserProfile, 'firstName' | 'lastName' | 'phone' | 'preferences'>>; // For updates
type ContactInfo = Pick<UserProfile, 'email' | 'phone' | 'address'>; // For contact display
type UserSettings = Pick<UserProfile, 'preferences'>; // For settings page

// Record type for form validation
type ValidationErrors = Record<keyof UserFormData, string | undefined>;
type FormFieldStatus = Record<keyof UserFormData, 'idle' | 'validating' | 'error' | 'success'>;
