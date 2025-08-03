import { ActionsJson, ACTIONS_CORS_HEADERS } from '@solana/actions'

export const GET = async () => {
  const payload: ActionsJson = {
    rules: [
      // Map your coffee API endpoint
      {
        pathPattern: '/api/coffee',
        apiPath: '/api/coffee',
      },
      // Optional: Map with query parameters
      {
        pathPattern: '/api/coffee/*',
        apiPath: '/api/coffee',
      },
    ],
  }

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

export const OPTIONS = async () => Response.json(null, { headers: ACTIONS_CORS_HEADERS })
