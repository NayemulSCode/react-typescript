// types/extensions.ts

// Extending React Router types
import { RouteObject } from 'react-router-dom';

interface EnhancedRouteObject extends RouteObject {
  meta?: {
    title: string;
    description?: string;
    requiresAuth?: boolean;
    roles?: string[];
    breadcrumb?: string;
    icon?: string;
  };
  children?: EnhancedRouteObject[];
}

// Extending React types
declare module 'react' {
  interface HTMLAttributes<T> {
    // Add custom data attributes
    'data-analytics-id'?: string;
    'data-tour-step'?: string;
  }

  interface CSSProperties {
    // Add CSS custom properties support
    '--primary-color'?: string;
    '--border-radius'?: string;
  }
}

// Extending third-party UI library (example: Tailwind UI or similar)
declare module '@headlessui/react' {
  interface DialogProps {
    analyticsId?: string;
    tourStep?: string;
  }
}

// Extending global Window object
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event',
      targetId: string,
      config?: any
    ) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, any>) => void;
      identify: (userId: string, traits?: Record<string, any>) => void;
    };
  }
}

// Extending Vite's ImportMeta for environment variables
declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_ANALYTICS_ID: string;
    readonly VITE_FEATURE_FLAGS: string;
  }
}

// Create enhanced fetch with better typing
interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: 'success' | 'error';
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}

// Enhanced fetch function with better error handling
type EnhancedFetch = <T = any>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    timeout?: number;
    retries?: number;
  }
) => Promise<ApiResponse<T>>;
