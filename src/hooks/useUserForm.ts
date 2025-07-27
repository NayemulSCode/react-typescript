import { useState, useCallback } from 'react';
import { UserFormData, ValidationErrors, FormFieldStatus } from '../types/form';

interface UseUserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<void>;
}

export const useUserForm = ({ initialData, onSubmit }: UseUserFormProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      country: '',
      zipCode: '',
    },
    preferences: {
      notifications: true,
      newsletter: false,
      darkMode: false,
    },
    ...initialData,
  });

  const [errors, setErrors] = useState<ValidationErrors>({} as ValidationErrors);
  const [fieldStatus, setFieldStatus] = useState<FormFieldStatus>({} as FormFieldStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(<K extends keyof UserFormData>(
    field: K,
    value: UserFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const updateNestedField = useCallback(<
    T extends keyof UserFormData,
    K extends keyof UserFormData[T]
  >(
    parentField: T,
    childField: K,
    value: UserFormData[T][K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value,
      },
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit]);

  return {
    formData,
    errors,
    fieldStatus,
    isSubmitting,
    updateField,
    updateNestedField,
    handleSubmit,
  };
};
