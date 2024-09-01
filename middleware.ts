import { NextResponse, NextRequest } from 'next/server'
import auth from './auth.json'

interface AuthPages {
  [key: string]: { roles: number[] }
}

async function fetchUserRole(token: any) {
  if (!token) {
    return
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    return parseInt(data.role)
  } catch (error) {
    // Handle any errors here
    console.error('Error fetching user role:', error)
    throw error
  }
}

export async function middleware(request: NextRequest) {
  const token: any = request.cookies.get('token')?.value

  if (auth.public.includes(request.nextUrl.pathname) || request.nextUrl.pathname.startsWith('/projet')) {
    return
  }

  if (request.nextUrl.pathname.startsWith('/connexion') && !token) {
    return
  }

  if (!token && !auth.public.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const role = await fetchUserRole(token)

  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.match(/\bespace-admin\b/) && role !== 1)
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }

  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.match(/\bespace-adminprojet\b/) && role !== 2)
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }

  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.match(/\bespace-expert\b/) && role !== 3)
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }

  if (
    auth.public.includes(request.nextUrl.pathname) ||
    (request.nextUrl.pathname.match(/\bespace-incube\b/) && role !== 4)
  ) {
    const url = new URL('/401', request.url)

    return NextResponse.redirect(url)
  }

  if (request.nextUrl.pathname && role && (auth.pages as AuthPages)[request.nextUrl.pathname]) {
    if (!(auth.pages as AuthPages)[request.nextUrl.pathname].roles.includes(role)) {
      const url = new URL('/401', request.url)

      return NextResponse.redirect(url)
    }
  }
}

export const config = {
  matcher: [
    '/',
    '/connexion',
    '/espace-incube/:path*',
    '/espace-expert/:path*',
    '/espace-admin/:path*',
    '/espace-adminprojet/:path*',
    '/projet/:path*'
  ]
}
