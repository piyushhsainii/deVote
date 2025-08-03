import { ActionGetResponse, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { Connection, Transaction } from '@solana/web3.js'
import { NextRequest, NextResponse } from 'next/server'
import IDL from '../../../../anchor/target/idl/coffee.json'
import { Program } from '@coral-xyz/anchor'
import { BN } from 'bn.js'
import { convertMoneyInSol } from '@/lib/helper'

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
            href: req.url + '?amount=20',
            label: '20$',
            type: 'transaction',
          },
          {
            href: req.url + '?amount=50',
            label: '50$',
            type: 'transaction',
          },
          {
            href: req.url + '?amount=100',
            label: '100$',
            type: 'transaction',
          },
        ],
      },
    }

    return NextResponse.json(actionData, {
      headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
    })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      },
    )
  }
}

export async function POST(req: NextRequest) {
  console.log('POST request received at /api/coffee')

  try {
    // Setup the connection
    const url = new URL(req.url)
    const moneyAmount = url.searchParams.get('amount')

    // Validate amount parameter
    if (!moneyAmount || isNaN(Number(moneyAmount))) {
      console.log('Invalid amount parameter')
      // return NextResponse.json(
      //   { error: 'Invalid or missing amount parameter' },
      //   {
      //     status: 400,
      //     headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
      //   },
      // )
    }

    const connection = new Connection(
      'https://solana-devnet.g.alchemy.com/v2/eifO49VRqgp-yYQHb1m5ULMSYoQyjT8u',
      'confirmed',
    )
    const program = new Program(IDL, { connection })
    const body = await req.json()

    console.log('Request body:', body)

    // Parse the signer
    const donater = body.account
    if (!donater) {
      // console.log('Missing account in request body')
      // return NextResponse.json(
      //   { error: 'Missing account in request body' },
      //   {
      //     status: 400,
      //     headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
      //   },
      // )
    }

    // Create the instruction
    const solAmt = await convertMoneyInSol(Number(moneyAmount))
    console.log('Sol amount:', solAmt)

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

    console.log('Transaction created successfully')

    return NextResponse.json(transaction, {
      headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
    })
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error', details: error },
      {
        status: 500,
        headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
      },
    )
  }
}

export async function OPTIONS(req: NextRequest) {
  console.log('OPTIONS request received')
  return new Response(null, {
    status: 200,
    headers: ACTIONS_CORS_HEADERS,
  })
}
