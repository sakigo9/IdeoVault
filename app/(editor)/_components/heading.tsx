'use client'

import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
const Header = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div className='space-y-4 max-w-3xl'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents, & Plans are Unified. Welcome to{' '}
        <span className='text-stone-600'>IdeoVault</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        All-in-one workspace platform that combines <br />
        note-taking, document sharing and task management.
      </h3>
      {isLoading && (
        <div className='flex justify-center align-center w-full'>
          <Spinner size={'lg'} />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button size='sm' asChild>
          <Link href='/documents'>
            {"Let's Go!"} <ArrowRight className='h-4 w-4 ml-2' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton>
          <Button>
            Explore <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Header
