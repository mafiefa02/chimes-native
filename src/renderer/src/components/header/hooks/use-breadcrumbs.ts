import { RouteNode } from '../../../lib/types';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useBreadcrumbs = (routes: RouteNode[]) => {
  const { pathname } = useLocation();

  const breadcrumbs = useMemo(() => {
    const routeMap = new Map(routes.map((route) => [route.href, route]));
    const homeRoute = routeMap.get('/');

    const crumbs: RouteNode[] = homeRoute ? [homeRoute] : [];

    if (pathname === '/') return crumbs;

    const pathSegments = pathname.split('/').filter(Boolean);

    pathSegments.forEach((_, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const routeNode = routeMap.get(href);
      if (routeNode && routeNode.href !== '/') {
        crumbs.push(routeNode);
      }
    });

    return crumbs;
  }, [pathname, routes]);

  return breadcrumbs;
};
