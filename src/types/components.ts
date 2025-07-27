// types/components.ts

// Base component props
interface BaseProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

// Specific component props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

interface LinkProps {
  href: string;
  target?: '_blank' | '_self';
  external?: boolean;
}

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

// Intersection types for enhanced components
type EnhancedButtonProps = BaseProps & ButtonProps & {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

type EnhancedLinkProps = BaseProps & LinkProps & {
  children: React.ReactNode;
};

// Conditional types for flexible component APIs
type WithIcon<T> = T extends { icon?: any }
  ? T & { icon: IconProps }
  : T;

type ComponentSize<T extends string> = T extends 'sm'
  ? { padding: 'small'; fontSize: 12 }
  : T extends 'md'
  ? { padding: 'medium'; fontSize: 14 }
  : T extends 'lg'
  ? { padding: 'large'; fontSize: 16 }
  : never;

// Advanced conditional type for responsive props
type ResponsiveValue<T> = T | {
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

type ResponsiveButtonProps = BaseProps & {
  variant: ResponsiveValue<ButtonProps['variant']>;
  size: ResponsiveValue<ButtonProps['size']>;
  children: React.ReactNode;
  onClick: () => void;
};

// Conditional type to extract theme-aware props
type ThemeAware<T> = T & {
  theme?: 'light' | 'dark' | 'auto';
  themeClass?: T extends { theme: 'dark' } ? 'dark:' : '';
};
