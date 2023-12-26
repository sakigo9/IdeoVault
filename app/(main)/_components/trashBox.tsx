'use client'

import { ConfirmationModal } from '@/components/modal/confirmationModal'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { Search, Trash, Undo } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export const TrashBox = () => {
  const getTrashNotes = useQuery(api.notes.getTrashNotes)
  const restoreTrashNotes = useMutation(api.notes.restoreNotes)
  const removeNotesPermanently = useMutation(api.notes.removePermanently)
  const router = useRouter()
  const params = useParams()
  const [search, setSearch] = useState('')
  const filteredNotes = getTrashNotes?.filter((note) => {
    return note.title.toLowerCase().includes(search.toLowerCase())
  })

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`)
  }

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'noteInfo'>,
  ) => {
    event.stopPropagation()
    const promise = restoreTrashNotes({ id: documentId })
    toast.promise(promise, {
      loading: 'Restoring notes...',
      success: 'Note Restored !',
      error: 'Failed to restore note',
    })
  }
  const onRemove = (documentId: Id<'noteInfo'>) => {
    const promise = removeNotesPermanently({ id: documentId })
    toast.promise(promise, {
      loading: 'Deleting notes...',
      success: 'Deleted note !',
      error: 'Failed to delete note',
    })
    if (params.documentId === documentId) {
      router.push(`/documents`)
    }
  }

  if (getTrashNotes === undefined) {
    return (
      <div className='h-full flex justify-center items-center p-4'>
        <Spinner size={'lg'} />
      </div>
    )
  }
  return (
    <div className='text-sm'>
      <div className='flex items-center gap-x-1 p-2'>
        <Search className='h-4 w-4' />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Filter by notes title.....'
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center text-muted-foreground pb-2'>
          No documents found.
        </p>
        {filteredNotes?.map((note) => {
          return (
            <div
              key={note._id}
              role='button'
              onClick={() => onClick(note._id)}
              className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
            >
              <span className='truncate pl-2'>{note.title}</span>
              <div className='flex items-center'>
                <div
                  onClick={(e) => onRestore(e, note._id)}
                  role='button'
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                >
                  <Undo className='h-4 w-4 text-muted-foreground' />
                </div>
                <ConfirmationModal onConfirm={() => onRemove(note._id)}>
                  <div
                    role='button'
                    className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  >
                    <Trash className='h-4 w-4 text-muted-foreground' />
                  </div>
                </ConfirmationModal>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
