import { Blink, useBlink } from '@dialectlabs/blinks'
import { useBlinkSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { Loader } from 'lucide-react'
import React from 'react'

const MarketPlace = () => {
  const blinkApiUrl =
    'https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fbonkblinks.com%2Fapi%2Factions%2Flock%3F_brf%3Da0898550-e7ec-408d-b721-fca000769498%26_bin%3Dffafbecd-bb86-435a-8722-e45bf139eab5'
  const { adapter } = useBlinkSolanaWalletAdapter(
    'https://dial.to/?action=solana-action%3Ahttps%3A%2F%2Fbonkblinks.com%2Fapi%2Factions%2Flock%3F_brf%3Da0898550-e7ec-408d-b721-fca000769498%26_bin%3Dffafbecd-bb86-435a-8722-e45bf139eab5',
  )

  const { blink, isLoading } = useBlink({ url: blinkApiUrl })

  return (
    <div className="h-auto w-full text-black">
      {isLoading ? (
        <div className="h-full flex justify-center items-center mx-auto w-full text-3xl brightness-75 font-light">
          {' '}
          Loading Marketplace....{' '}
        </div>
      ) : (
        <div className="flex flex-wrap mx-auto max-w-[1500px] items-center justify-center">
          <div className="w-96 h-auto m-5">{blink && <Blink blink={blink} adapter={adapter} />}</div>
          <div className="w-96 h-auto m-5">{blink && <Blink blink={blink} adapter={adapter} />}</div>
          <div className="w-96 h-auto m-5">{blink && <Blink blink={blink} adapter={adapter} />}</div>
          <div className="w-96 h-auto m-5">{blink && <Blink blink={blink} adapter={adapter} />}</div>
          <div className="w-96 h-auto m-5">{blink && <Blink blink={blink} adapter={adapter} />}</div>
        </div>
      )}
    </div>
  )
}

export default MarketPlace
