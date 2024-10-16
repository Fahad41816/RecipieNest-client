/* eslint-disable prettier/prettier */
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { GetCurrentUser } from './services/AuthService';

const AuthRoute = ['/login', '/registration','/password/forget'];
const UserRoute = ['/', '/myRecipe', '/profile', '/about', '/contact', '/setting'];
const AdminRoute = ['/dashboard', '/dashboard/users', '/dashboard/recipies'];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const user = await GetCurrentUser();

    // If no user is logged in
    if (!user) {
        // Allow access to authentication routes (login/registration)
        if (AuthRoute.includes(pathname)) {
            return NextResponse.next();
        }
        // Redirect to login for all other routes if not logged in
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }

    // If user is logged in
    if (user) {
        // Allow access to user routes for all logged-in users
        if (UserRoute.includes(pathname)) {
            return NextResponse.next();
        }

        // Allow access to admin routes if the user is an admin
        if (user.role === 'admin' && AdminRoute.includes(pathname)) {
            return NextResponse.next();
        }

        // If a regular user tries to access an admin route, redirect to homepage
        if (AdminRoute.includes(pathname)) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // If none of the routes match, redirect to the homepage as fallback
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/registration', '/', '/MyRecipe', '/contact', '/about', '/profile', '/dashboard/:path*'],
};
