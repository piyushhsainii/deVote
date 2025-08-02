import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Accept-Action-Version, X-Accept-Blockchain-Ids',
  )
  res.headers.set('Access-Control-Expose-Headers', 'X-Action-Version, X-Blockchain-Ids')

  // Handle OPTIONS request early
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: res.headers })
  }

  return res
}

// Apply middleware only to API routes
export const config = {
  matcher: '/api/:path*',
}
