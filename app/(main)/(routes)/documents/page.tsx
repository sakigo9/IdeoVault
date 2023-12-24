'use client'

import Image from 'next/image'
import { useUser } from '@clerk/clerk-react'
import { use } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

const DocumentsPage = () => {
  const { user } = useUser()
  const create = useMutation(api.notes.createNotes)

  const handleCreateNote = () => {
    const promise = create({ title: 'Untitled' })
    toast.promise(promise, {
      loading: 'Creating a new note',
      success: 'New Note created !',
      error: 'Failed to create a new note',
    })
  }

  return (
    <div className='h-full flex flex-col space-y-4 justify-center items-center'>
      <Image
        src={'/empty.png'}
        alt='document'
        height='300'
        width='300'
        className='dark:hidden'
      />
      <Image
        src={'/empty-dark.png'}
        alt='document'
        height='300'
        width='300'
        className='hidden dark:block'
      />
      <h2 className='text-lg font-medium'>
        {' '}
        Hi {user?.firstName}! {"Let's get started"}
      </h2>
      <Button onClick={handleCreateNote}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a Note
      </Button>
    </div>
  )
}

export default DocumentsPage
