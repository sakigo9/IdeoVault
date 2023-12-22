'use client'
import { cn } from '@/lib/utils'
import useScrollTop from '@/hooks/scroll-to-top'
import Logo from './logo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { Spinner } from '@/components/ui/spinner'

const Navbar = () => {
  const scrollTop = useScrollTop()
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <div
      className={cn(
        'fixed top-0 z-20 bg-background flex items-center w-full p-4 dark:bg-[#1F1F1F]',
        scrollTop && 'border-b-1 shadow-sm',
      )}
    >
      <Logo />
      <div className='w-full flex md:justify-end justify-between items-center gap-x-3'>
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant={'ghost'} size='sm'>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Free Sign In</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant={'ghost'} size='sm' asChild>
              <Link href='/documents'>{"Let's Go!"}</Link>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
