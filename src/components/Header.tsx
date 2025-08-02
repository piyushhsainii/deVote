import React from 'react'
import { motion } from 'framer-motion'
import { WalletButton } from './solana/solana-provider'
import { ClusterUiSelect } from './cluster/cluster-ui'
import Link from 'next/link'
const Header = () => {
  return (
    <motion.header
      className="relative z-10 flex items-center justify-between p-6 md:p-8 text-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link href={'/'}>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-light tracking-widest bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            DeVote
          </span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <WalletButton className="z-50" />
        <ClusterUiSelect />
      </nav>
    </motion.header>
  )
}

export default Header
