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
      headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
    })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    // setup the connection
    const url = new URL(req.url)
    const moneyAmount = url.searchParams.get('amount')
    const connection = new Connection(
      'https://solana-devnet.g.alchemy.com/v2/eifO49VRqgp-yYQHb1m5ULMSYoQyjT8u',
      'confirmed',
    )
    const program = new Program(IDL, { connection })
    const body = await req.json()
    // parse the signer
    const donater = body.account
    // created the instruction
    const solAmt = await convertMoneyInSol(Number(moneyAmount))
    const instruction = await program.methods
      .initialize(new BN(solAmt))
      .accounts({
        signer: donater,
      })
      .instruction()
    // get latest block hash
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
        message: 'Buy me a Coffee',
      },
    })
    if (moneyAmount) {
      return NextResponse.json('Invalid Request', { status: 400 })
    }
    return NextResponse.json(transaction, {
      headers: { ...ACTIONS_CORS_HEADERS, 'X-Action-Version': '1', 'X-Blockchain-Ids': 'solana' },
    })
  } catch (error) {
    return NextResponse.json(error)
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      ...ACTIONS_CORS_HEADERS,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-Action-Version': '1',
      'X-Blockchain-Ids': 'solana',
    },
  })
}
