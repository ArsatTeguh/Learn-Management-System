import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Daftar halaman yang memerlukan perlindungan
  const protectedRoutes = ['/client', '/add-course'];

  // Daftar halaman yang tidak dapat diakses jika pengguna sudah login
  const publicRoutes = ['/auth/signin', '/auth/register'];

  // Cek untuk rute yang dilindungi dan tidak ada token
  if (protectedRoutes.some((route: string) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Cek untuk rute publik dan adanya token
  if (publicRoutes.includes(pathname) && token) {
    // Redirect ke halaman utama atau dashboard
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
