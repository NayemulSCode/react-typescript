import React, { useEffect } from "react";
import { useEnhancedRouter } from "../hooks/useEnhancedRouter";
import { EnhancedRouteObject } from "../types/extensions";

interface LayoutProps {
  routes: EnhancedRouteObject[];
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ routes, children }) => {
  const { currentRoute, breadcrumbs, pageTitle } = useEnhancedRouter(routes);

  // Update document title based on route meta
  useEffect(() => {
    document.title = `${pageTitle} | Your App`;
  }, [pageTitle]);

  // Track page views
  useEffect(() => {
    if (window.gtag && currentRoute) {
      window.gtag("event", "page_view", {
        page_title: currentRoute.meta?.title,
        page_location: window.location.href,
      });
    }
  }, [currentRoute]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-3 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && (
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span
                    className={
                      index === breadcrumbs.length - 1
                        ? "text-gray-900 font-medium"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  >
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
