import { ActionGetResponse, ACTIONS_CORS_HEADERS_MIDDLEWARE, createPostResponse } from '@solana/actions'
import { Connection, Transaction } from '@solana/web3.js'
import { NextRequest, NextResponse } from 'next/server'
import IDL from '../../../../anchor/target/idl/coffee.json'
import { Program } from '@coral-xyz/anchor'
import { BN } from 'bn.js'
import { convertMoneyInSol } from '@/lib/helper'

// Helper function to create CORS headers from your middleware
function createCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': ACTIONS_CORS_HEADERS_MIDDLEWARE.origin,
    'Access-Control-Allow-Methods': ACTIONS_CORS_HEADERS_MIDDLEWARE.methods.join(', '),
    'Access-Control-Allow-Headers': ACTIONS_CORS_HEADERS_MIDDLEWARE.allowedHeaders.join(', '),
    'Access-Control-Expose-Headers': ACTIONS_CORS_HEADERS_MIDDLEWARE.exposedHeaders.join(', '),
    'X-Action-Version': '1',
    'X-Blockchain-Ids': 'solana',
  }
}

export async function GET(req: NextRequest) {
  try {
    const actionData: ActionGetResponse = {
      icon: 'https://res.cloudinary.com/dzow59kgu/image/upload/v1752593263/portfolioImg_fbovbd.png',
      description: 'Buy coffee for your favourite dev!',
      label: 'Buy',
      title: 'Buy me a Coffee',
      links: {
        actions: [
          {
            href: '/api/coffee?amount=20',
            label: '20$',
            type: 'transaction',
          },
          {
            href: '/api/coffee?amount=50',
            label: '50$',
            type: 'transaction',
          },
          {
            href: '/api/coffee?amount=100',
            label: '100$',
            type: 'transaction',
          },
        ],
      },
    }

    return NextResponse.json(actionData, {
      headers: createCorsHeaders(),
    })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: createCorsHeaders(),
      },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    // Setup the connection
    const url = new URL(req.url)
    const moneyAmount = url.searchParams.get('amount')

    // Validate amount parameter
    if (!moneyAmount || isNaN(Number(moneyAmount))) {
      return NextResponse.json(
        { error: 'Invalid or missing amount parameter' },
        {
          status: 400,
          headers: createCorsHeaders(),
        },
      )
    }

    const connection = new Connection(
      'https://solana-devnet.g.alchemy.com/v2/eifO49VRqgp-yYQHb1m5ULMSYoQyjT8u',
      'confirmed',
    )
    const program = new Program(IDL, { connection })
    const body = await req.json()

    // Parse the signer
    const donater = body.account
    if (!donater) {
      return NextResponse.json(
        { error: 'Missing account in request body' },
        {
          status: 400,
          headers: createCorsHeaders(),
        },
      )
    }

    // Create the instruction
    const solAmt = await convertMoneyInSol(Number(moneyAmount))
    const instruction = await program.methods
      .initialize(new BN(solAmt))
      .accounts({
        signer: donater,
      })
      .instruction()

    // Get latest block hash
    const blockHash = await connection.getLatestBlockhash()
    const tx = new Transaction({
      feePayer: donater,
      blockhash: blockHash.blockhash,
      lastValidBlockHeight: blockHash.lastValidBlockHeight,
    }).add(instruction)

    const transaction = await createPostResponse({
      fields: {
        transaction: tx,
        type: 'transaction',
        message: `Buy me a Coffee - $${moneyAmount}`,
      },
    })

    return NextResponse.json(transaction, {
      headers: createCorsHeaders(),
    })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: createCorsHeaders(),
      },
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Handle PUT requests if needed
    const body = await req.json()

    // Your PUT logic here
    const result = { message: 'PUT request handled', data: body }

    return NextResponse.json(result, {
      headers: createCorsHeaders(),
    })
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: createCorsHeaders(),
      },
    )
  }
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(null, {
    status: 200,
    headers: createCorsHeaders(),
  })
}
