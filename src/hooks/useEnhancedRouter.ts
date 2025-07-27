import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { EnhancedRouteObject } from '../types/extensions';

export const useEnhancedRouter = (routes: EnhancedRouteObject[]) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = useMemo(() => {
    const findRoute = (routeList: EnhancedRouteObject[], path: string): EnhancedRouteObject | null => {
      for (const route of routeList) {
        if (route.path === path) return route;
        if (route.children) {
          const found = findRoute(route.children, path);
          if (found) return found;
        }
      }
      return null;
    };

    return findRoute(routes, location.pathname);
  }, [routes, location.pathname]);

  const navigateWithAnalytics = useCallback((to: string, options?: { replace?: boolean }) => {
    // Track navigation event
    if (window.analytics) {
      window.analytics.track('page_navigation', {
        from: location.pathname,
        to,
        timestamp: new Date().toISOString(),
      });
    }

    navigate(to, options);
  }, [navigate, location.pathname]);

  const breadcrumbs = useMemo(() => {
    const crumbs: Array<{ label: string; path: string }> = [];
    const pathSegments = location.pathname.split('/').filter(Boolean);

    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const route = routes.find(r => r.path === currentPath);
      if (route?.meta?.breadcrumb) {
        crumbs.push({
          label: route.meta.breadcrumb,
          path: currentPath,
        });
      }
    }

    return crumbs;
  }, [routes, location.pathname]);

  return {
    currentRoute,
    navigateWithAnalytics,
    breadcrumbs,
    requiresAuth: currentRoute?.meta?.requiresAuth ?? false,
    pageTitle: currentRoute?.meta?.title ?? 'App',
  };
};
