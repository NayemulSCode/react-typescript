// types/extensions.ts

// Extending React Router types
// import { RouteObject } from "react-router-dom";

// Example: Enhanced route type for React Router
// If you want to use this, ensure RouteObject is a valid object type to extend
export type EnhancedRouteObject = {
  path?: string;
  element?: React.ReactNode;
  meta?: {
    title: string;
    description?: string;
    requiresAuth?: boolean;
    roles?: string[];
    breadcrumb?: string;
    icon?: string;
  };
  children?: EnhancedRouteObject[];
};

// Extending React types
declare module "react" {
  interface HTMLAttributes<T = unknown> {
    // Add custom data attributes
    "data-analytics-id"?: string;
    "data-tour-step"?: string;
  }

  interface CSSProperties {
    // Add CSS custom properties support
    "--primary-color"?: string;
    "--border-radius"?: string;
  }
}

// Extending third-party UI library (example: Tailwind UI or similar)
// Remove invalid module augmentation for @headlessui/react
// If you need to extend DialogProps, do it in your own component props

// Extending global Window object
declare global {
  interface Window {
    gtag?: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    analytics?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (userId: string, traits?: Record<string, unknown>) => void;
    };
  }
}

// Extending Vite's ImportMeta for environment variables
// Remove invalid module augmentation for vite/client
// If you need to type ImportMetaEnv, use ambient declaration:
export interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_ANALYTICS_ID: string;
  readonly VITE_FEATURE_FLAGS: string;
}

// Create enhanced fetch with better typing
export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  status: "success" | "error";
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

// Enhanced fetch function with better error handling
export type EnhancedFetch = <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit & {
    timeout?: number;
    retries?: number;
  }
) => Promise<ApiResponse<T>>;
