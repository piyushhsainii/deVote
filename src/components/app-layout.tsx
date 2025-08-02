'use client'

import { ThemeProvider } from './theme-provider'
import { Toaster } from './ui/sonner'
import React from 'react'
import { ClusterChecker, ClusterUiSelect } from '@/components/cluster/cluster-ui'
import { AccountChecker } from '@/components/account/account-ui'
import { WalletButton } from './solana/solana-provider'

export function AppLayout({
  children,
  links,
}: {
  children: React.ReactNode
  links: { label: string; path: string }[]
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
