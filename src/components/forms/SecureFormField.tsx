// Secure form field component with validation and accessibility
import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SecureFormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'textarea' | 'select';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  maxLength?: number;
  autoComplete?: string;
  className?: string;
}

export function SecureFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  placeholder,
  helpText,
  options,
  rows = 4,
  maxLength,
  autoComplete,
  className
}: SecureFormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const id = `field-${name}`;
  const hasError = !!error;
  const isValid = !hasError && value.length > 0;

  const fieldClasses = cn(
    'w-full px-3 py-2 border rounded-md bg-background transition-colors',
    'focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    hasError 
      ? 'border-red-500 focus:ring-red-500' 
      : isValid 
        ? 'border-green-500 focus:ring-green-500'
        : 'border-input',
    className
  );

  const renderInput = () => {
    const commonProps = {
      id,
      name,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        onChange(e.target.value),
      onBlur: () => {
        setIsFocused(false);
        onBlur?.();
      },
      onFocus: () => setIsFocused(true),
      disabled,
      placeholder,
      maxLength,
      autoComplete,
      className: fieldClasses,
      'aria-invalid': hasError,
      'aria-describedby': `${id}-help ${id}-error`,
      required
    };

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={rows}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'password':
        return (
          <div className="relative">
            <input
              {...commonProps}
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        );
      
      default:
        return <input {...commonProps} type={type} />;
    }
  };

  return (
    <div className="space-y-2">
      <label 
        htmlFor={id}
        className={cn(
          'block text-sm font-medium',
          hasError ? 'text-red-700 dark:text-red-400' : 'text-foreground'
        )}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {renderInput()}
        
        {/* Field status indicator */}
        {(hasError || isValid) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        )}
      </div>
      
      {/* Character count for text inputs */}
      {maxLength && isFocused && (
        <div className="text-xs text-muted-foreground text-right">
          {value.length}/{maxLength}
        </div>
      )}
      
      {/* Help text */}
      {helpText && (
        <div id={`${id}-help`} className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div id={`${id}-error`} className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}