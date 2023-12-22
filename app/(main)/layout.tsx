'use client'

import { Spinner } from '@/components/ui/spinner'
import { useConvexAuth } from 'convex/react'
import { Navigation } from 'lucide-react'
import { redirect } from 'next/navigation'
import Navigator from './_components/navigation'
const MainPage = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  if (isLoading) {
    return (
      <div className='f-full flex justify-center align-center'>
        <Spinner size={'lg'} />
      </div>
    )
  }
  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <div className='h-full flex dark:[#1f1f1f]'>
      <Navigator />
      <main className='h-full flex-1 overflow-y-auto'>{children}</main>
    </div>
  )
}
export default MainPage
