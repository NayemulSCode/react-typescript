import React from 'react';
import { cn } from '../../utils/cn'; // Utility for className merging
import { EnhancedButtonProps } from '../../types/components';

const Button: React.FC<EnhancedButtonProps> = ({
  variant,
  size,
  disabled = false,
  loading = false,
  className,
  onClick,
  children,
  ...props
}) => {
  // Conditional styling based on props
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-900 border-gray-300';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent';
      default:
        return '';
    }
  };

  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return '';
    }
  };

  const baseStyles = 'inline-flex items-center justify-center border font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={cn(
        baseStyles,
        getVariantStyles(),
        getSizeStyles(),
        disabledStyles,
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

// Advanced conditional component
interface ConditionalWrapperProps<T extends boolean> {
  condition: T;
  wrapper: T extends true ? React.ComponentType<{children: React.ReactNode}> : never;
  children: React.ReactNode;
}

function ConditionalWrapper<T extends boolean>({
  condition,
  wrapper: Wrapper,
  children
}: ConditionalWrapperProps<T>) {
  if (condition && Wrapper) {
    return <Wrapper>{children}</Wrapper>;
  }
  return <>{children}</>;
}

// Usage example
const ButtonWithConditionalTooltip: React.FC<{
  showTooltip: boolean;
  tooltipText?: string;
} & EnhancedButtonProps> = ({ showTooltip, tooltipText, ...buttonProps }) => {
  const TooltipWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {tooltipText}
      </div>
    </div>
  );

  return (
    <ConditionalWrapper
      condition={showTooltip}
      wrapper={showTooltip ? TooltipWrapper : (undefined as never)}
    >
      <Button {...buttonProps} />
    </ConditionalWrapper>
  );
};

export { Button, ButtonWithConditionalTooltip };
