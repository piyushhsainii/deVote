import { NextRequest, NextResponse } from 'next/server'
import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest } from '@solana/actions'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program } from '@coral-xyz/anchor'
export async function GET(req: NextRequest) {
  try {
    const actionMetaData: ActionGetResponse = {
      title: 'Coffee',
      description: 'Espresso',
      icon: 'https://cdn-icons-png.flaticon.com/512/8230/8230211.png',
      label: 'Vote',
      links: {
        actions: [
          {
            type: 'message',
            href: '/#',
            label: 'Vote for coffee',
          },
          {
            type: 'message',
            href: '/#',
            label: 'Vote for chai',
          },
        ],
      },
    }
    return NextResponse.json(actionMetaData, { headers: ACTIONS_CORS_HEADERS })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const candidate = url.searchParams.get('candidate')
    if (candidate !== 'starbucks' && candidate !== 'sleepyOwl') {
      return NextResponse.json('Invalid candidate', { status: 400, headers: ACTIONS_CORS_HEADERS })
    }
    const connection = new Connection('', 'confirmed')
    const program: Program<Voting> = new Program(IDL, { connection })
    const body: ActionPostRequest = await req.json()
    const voter = new PublicKey(body.account)
    if (!voter) {
      return NextResponse.json('Could not find account with this public key', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      })
    }
  } catch (error) {}
}
