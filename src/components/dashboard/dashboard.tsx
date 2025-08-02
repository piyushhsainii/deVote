'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Vote } from 'lucide-react'
import { ClusterUiSelect } from '../cluster/cluster-ui'
import { WalletButton } from '../solana/solana-provider'
import Link from 'next/link'
import Header from '../Header'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 overflow-hidden relative text-black ">
      {/* Animated Background Blobs */}
      <div className="  overflow-hidden">
        {/* Blue Blob */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          style={{
            top: '20%',
            left: '10%',
          }}
        />

        {/* Violet Blob */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-violet-400/30 to-purple-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 2,
          }}
          style={{
            top: '40%',
            right: '15%',
          }}
        />

        {/* Additional smaller blobs for depth */}
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-br from-indigo-300/20 to-blue-200/10 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 4,
          }}
          style={{
            bottom: '20%',
            left: '60%',
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Glassmorphic Card */}
          <motion.div
            className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 md:p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h1
              className="text-5xl font-extralight font-sans text-center leading-tight mb-4 bg-gradient-to-r from-blue-500 via-violet-600 to-blue-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore Custom <span className="font-semibold"> Blinks!</span>
              <br className="hidden sm:block" />
              All Built on <span className="font-semibold">Solana </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed text-center max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Browse existing polls Anyone can vote using Blinks — fast, secure, and fully on-chain with Solana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link href={'/polls'}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.span className="flex items-center space-x-2" whileHover={{ x: 2 }}>
                      <Vote className="w-5 h-5" />
                      <span>Explore My Blinks</span>
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats or features */}
            <motion.div
              className="flex justify-center space-x-8 mt-8 pt-8 border-t border-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-slate-500">Active Polls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-600">50K+</div>
                <div className="text-sm text-slate-500">Votes Cast</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-500">Transparent</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
