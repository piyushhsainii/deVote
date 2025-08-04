import { ACTIONS_CORS_HEADERS, ActionsJson } from '@solana/actions'
import { NextResponse } from 'next/server'
import actions from '../public/actions.json'
export const GET = async () => {
  return NextResponse.json(actions, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINK
export const OPTIONS = GET
