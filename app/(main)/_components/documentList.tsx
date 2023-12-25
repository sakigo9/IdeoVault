'use client'

import { api } from '@/convex/_generated/api'
import { Id, Doc } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Item } from './item'
import { FileIcon } from 'lucide-react'

interface DocumentListProps {
  parentDocumentId?: Id<'noteInfo'>
  level?: number
  data?: Doc<'noteInfo'>[]
}
export const DocumentList = ({
  parentDocumentId,
  level = 0,
  data,
}: DocumentListProps) => {
  const params = useParams()
  const routes = useRouter()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const onExpand = (documentId: string) => {
    setExpanded((preExpand) => ({
      ...preExpand,
      [documentId]: !preExpand[documentId],
    }))
  }
  const onRedirect = (documentId: string) => {
    // routes.push(`/documents/${documentId}`)
  }
  const notes = useQuery(api.notes.getSidebar, {
    parentDocument: parentDocumentId,
  })

  if (notes === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            {' '}
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    )
  }
  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : '12px',
        }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden',
        )}
      >
        No Page Inside
      </p>
      {notes.map((note) => {
        return (
          <div key={note._id}>
            <Item
              id={note._id}
              icon={FileIcon}
              onClick={() => onRedirect(note._id)}
              title={note.title}
              documentIcon={note.icon}
              active={params.documentId === note._id}
              level={level}
              onExpand={() => onExpand(note._id)}
              expanded={expanded[note._id]}
            />
            {expanded[note._id] && (
              <DocumentList parentDocumentId={note._id} level={level + 1} />
            )}
          </div>
        )
      })}
    </>
  )
}
