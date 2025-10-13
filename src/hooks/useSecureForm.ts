// Secure form handling hook with validation and error handling
import { useState, useCallback } from 'react';
import { z } from 'zod';

import { errorService } from '../services/errorService';
import { rateLimiter } from '../utils/validation';

interface UseSecureFormOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  rateLimitKey?: string;
  maxSubmissions?: number;
  timeWindow?: number;
}

interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  hasSubmitted: boolean;
  submitCount: number;
}

export function useSecureForm<T>({
  schema,
  onSubmit,
  rateLimitKey,
  maxSubmissions = 5,
  timeWindow = 300000 // 5 minutes
}: UseSecureFormOptions<T>) {
  const [formState, setFormState] = useState<FormState<T>>({
    data: {} as T,
    errors: {},
    isSubmitting: false,
    hasSubmitted: false,
    submitCount: 0
  });

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update form data
  const updateField = useCallback((field: keyof T, value: unknown) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field as string]: '' } // Clear field error
    }));
    setGlobalError(null);
  }, []);

  // Validate single field
  const validateField = useCallback((field: keyof T, value: unknown) => {
    try {
      schema.pick({ [field]: true } as Record<keyof T, true>).parse({ [field]: value });
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field as string]: '' }
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message || 'Invalid value';
        setFormState(prev => ({
          ...prev,
          errors: { ...prev.errors, [field as string]: fieldError }
        }));
      }
    }
  }, [schema]);

  // Validate entire form
  const validateForm = useCallback(() => {
    const validation = schema.safeParse(formState.data);
    
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach(error => {
        const field = error.path.join('.');
        errors[field] = error.message;
      });
      
      setFormState(prev => ({ ...prev, errors }));
      return false;
    }
    
    setFormState(prev => ({ ...prev, errors: {} }));
    return true;
  }, [schema, formState.data]);

  // Submit form with security checks
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Clear previous messages
    setGlobalError(null);
    setSuccessMessage(null);

    // Rate limiting check
    if (rateLimitKey && !rateLimiter.isAllowed(rateLimitKey, maxSubmissions, timeWindow)) {
      setGlobalError('Too many submission attempts. Please wait before trying again.');
      return;
    }

    // Validate form
    if (!validateForm()) {
      setGlobalError('Please correct the errors above and try again.');
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const result = await onSubmit(formState.data);
      
      if (result.success) {
        setSuccessMessage('Form submitted successfully!');
        setFormState(prev => ({
          ...prev,
          hasSubmitted: true,
          submitCount: prev.submitCount + 1,
          data: {} as T // Reset form data on success
        }));
      } else {
        setGlobalError(result.error || 'Submission failed. Please try again.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setGlobalError(errorMessage);
      
      errorService.reportError(error as Error, {
        component: 'SecureForm',
        action: 'handleSubmit',
        severity: 'medium'
      });
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.data, onSubmit, rateLimitKey, maxSubmissions, timeWindow, validateForm]);

  // Reset form
  const resetForm = useCallback(() => {
    setFormState({
      data: {} as T,
      errors: {},
      isSubmitting: false,
      hasSubmitted: false,
      submitCount: 0
    });
    setGlobalError(null);
    setSuccessMessage(null);
  }, []);

  // Check if form has errors
  const hasErrors = Object.keys(formState.errors).length > 0;
  
  // Check if form is valid for submission
  const isValid = !hasErrors && Object.keys(formState.data).length > 0;

  return {
    // Form state
    data: formState.data,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    hasSubmitted: formState.hasSubmitted,
    submitCount: formState.submitCount,
    
    // Global state
    globalError,
    successMessage,
    hasErrors,
    isValid,
    
    // Actions
    updateField,
    validateField,
    handleSubmit,
    resetForm,
    
    // Utilities
    setGlobalError,
    setSuccessMessage
  };
}