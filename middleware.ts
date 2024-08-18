import { NextRequest, NextResponse } from 'next/server';
import { ROLE, ROUTE_TYPE, RouteObject, routesList } from '@/constants/routes';

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const routes: RouteObject<string>[] = Object.values(routesList);

  const role = req.cookies.get('role')?.value as ROLE;

  const selectedRoute = routes.find(item =>
    path === '/'
      ? path.toLowerCase() === item.path
      : item.path !== '/' && path.toLowerCase().includes(item.path)
  );

  const isPublicRoute = selectedRoute?.type === ROUTE_TYPE.WITHOUT_AUTHENTICATION;
  const token = req.cookies.get('token');

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(routesList.login.path, req.url));
  } else if (token && path === '/login') {
    return NextResponse.redirect(new URL(routesList.dashboard.path, req.url));
  }

  if (role && !selectedRoute?.accessList.includes(role)) {
    return NextResponse.error();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
