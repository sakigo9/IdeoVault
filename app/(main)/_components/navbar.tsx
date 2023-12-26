'use client'

import { useParams } from 'next/navigation'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Menu, MenuIcon } from 'lucide-react'
import { Title } from './title'

interface NavbarProps {
  isCollapse: boolean
  onResetWidth: () => void
}
export const Navbar = ({ isCollapse, onResetWidth }: NavbarProps) => {
  const params = useParams()
  const notes = useQuery(api.notes.getById, {
    documentId: params.documentId as Id<'noteInfo'>,
  })
  if (notes === undefined) {
    return (
      <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between'>
        <Title.Skeleton />
      </nav>
    )
  }
  if (notes === null) {
    return null
  }
  return (
    <nav className='bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4'>
      {isCollapse && (
        <MenuIcon
          role='button'
          onClick={onResetWidth}
          className='h-6 w-6 text-muted-foreground'
        />
      )}
      <div className='flex items-center justify-between w-full'>
        {' '}
        <Title initialData={notes} />
      </div>
    </nav>
  )
}
