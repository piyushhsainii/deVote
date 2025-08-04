import { ACTIONS_CORS_HEADERS, ActionsJson } from '@solana/actions'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const actions: ActionsJson = {
    rules: [
      {
        pathPattern: '/*',
        apiPath: '/api/actions/*',
      },
      // fallback
      {
        pathPattern: '/api/actions/**',
        apiPath: '/api/actions/**',
      },
    ],
  }

  return NextResponse.json(actions, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINK
export const OPTIONS = GET
