'use client'
import React from 'react'
import '@dialectlabs/blinks/index.css'
import MarketPlace from './marketplace-dashboard'
import Header from '@/components/Header'

const page = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <Header />
      <MarketPlace />
    </div>
  )
}

export default page
