export const convertMoneyInSol = async (usdAmount: number): Promise<number> => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')

    if (!response.ok) {
      throw new Error('Failed to fetch price data')
    }

    const data = await response.json()
    const solPriceInUSD = data.solana.usd // USD per SOL

    if (!solPriceInUSD) {
      throw new Error('Price data not available')
    }

    const solEquivalent = usdAmount / solPriceInUSD // Convert USD → SOL
    return parseFloat(solEquivalent.toFixed(6)) // round to 6 decimal places
  } catch (error) {
    console.error(error)
    throw new Error('Conversion failed')
  }
}
