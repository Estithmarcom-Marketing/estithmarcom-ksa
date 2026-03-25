'use client'

import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'

export default function ClientProviders({ children }: { children: ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position='top-center'/>
      {children}
    </QueryClientProvider>
  )
}