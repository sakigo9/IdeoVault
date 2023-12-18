'use client'
import { cn } from '@/lib/utils'
import useScrollTop from '@/hooks/scroll-to-top'
import Logo from './logo'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

const Navbar = () => {
  const scrollTop = useScrollTop()
  return (
    <div
      className={cn(
        'fixed top-0 z-20 bg-background flex items-center w-full p-4 dark:bg-[#1F1F1F]',
        scrollTop && 'border-b-1 shadow-sm',
      )}
    >
      <Logo />
      <div className='w-full flex md:justify-end justify-between items-center '>
        <Button variant='ghost'>Login</Button>
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
