import { NextRequest, NextResponse } from 'next/server'
import { ACTIONS_CORS_HEADERS, ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse } from '@solana/actions'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { Program } from '@coral-xyz/anchor'
import {Voting} from "../../../../anchor/target/types/voting"
import IDL from "../../../../anchor/target/idl/voting.json"
import { BN } from 'bn.js'

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
            href: '/api/action?candidate=Coffee',
            label: 'Vote for coffee',
          },
          {
            type: 'message',
            href: '/api/action?candidate=Chai',
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
    // settin up the IDL
    const program: Program<Voting> = new Program(IDL, { connection })
    const body: ActionPostRequest = await req.json()
    // setting up the instruction
    const voter = new PublicKey(body.account)
    if (!voter) {
     const instruction = await program.methods.vote(new BN(0)).accounts({
        signer:voter,
      }).instruction()
      const recentBlockhash = await connection.getLatestBlockhash()
      // after setting instruction, set up the transaction
      const transaction = new Transaction({
        feePayer:voter,
        blockhash:recentBlockhash.blockhash,
        lastValidBlockHeight:recentBlockhash.lastValidBlockHeight,
      }).add(instruction)
      // create post action handler
      const action = await createPostResponse({
        fields:{
          transaction:transaction,
          type:"transaction",
        }
      })
      return NextResponse.json(action)
    }
  } catch (error) {
    return NextResponse.json('Could not find account with this public key', {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    })

  }
}
