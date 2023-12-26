'use client'

import { Id } from '@/convex/_generated/dataModel'
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUser } from '@clerk/clerk-react'

interface itemProps {
  onClick?: () => void
  title: string
  icon: LucideIcon
  id?: Id<'noteInfo'>
  documentIcon?: string
  active?: boolean
  expanded?: boolean
  isSearch?: boolean
  level?: number
  onExpand?: () => void
  onSearch?: () => void
}

export const Item = ({
  onClick,
  title,
  icon: Icon,
  id,
  isSearch,
  expanded,
  level = 0,
  onExpand,
  documentIcon,
  active,
}: itemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight
  const createNote = useMutation(api.notes.createNotes)
  const archieve = useMutation(api.notes.archieve)
  const router = useRouter()
  const { user } = useUser()
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    onExpand?.()
  }

  const onCreateNestedFile = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation()
    if (!id) return
    const promise = createNote({ title: 'Untilted', parentDocument: id }).then(
      (noteId) => {
        if (!expanded) {
          onExpand?.()
        }
        router.push(`/documents/${noteId}`)
      },
    )
    toast.promise(promise, {
      loading: 'Creating a new note',
      success: 'New Note created !',
      error: 'Failed to create a new note',
    })
  }

  const onArchieve = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!id) return
    const promise = archieve({ id })
    toast.promise(promise, {
      loading: 'Moving note to archieve',
      success: 'Note Moved inside bin !',
      error: 'Failed to move the note',
    })
  }
  return (
    <div
      onClick={onClick}
      role='button'
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
      }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary',
      )}
    >
      {!!id && (
        <div
          role='button'
          className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground' />
      )}
      <span className='truncate'>{title}</span>
      {isSearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                role='button'
                className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
              >
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-60' forceMount>
              <DropdownMenuItem onClick={onArchieve}>
                <Trash className='h-4 w-4 mr-2' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='text-xs text-muted-foreground p-2'>
                Last modified by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            role='button'
            onClick={onCreateNestedFile}
            className=' opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'
          >
            <Plus className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  )
}
Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : '12px' }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='h-4 w-4' />
      <Skeleton className='h-4 w-[30%]' />
    </div>
  )
}
