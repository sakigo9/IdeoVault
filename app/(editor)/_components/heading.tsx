'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const Header = () => {
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
      <Button>
        Explore <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </div>
  )
}

export default Header
