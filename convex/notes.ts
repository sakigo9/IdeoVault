import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { Doc, Id } from './_generated/dataModel'

export const createNotes = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('noteInfo')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('User not authenticated')
    }

    const userId = identity.subject

    const note = await ctx.db.insert('noteInfo', {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    })

    return note
  },
})

export const getNotes = query({
  handler: async (context) => {
    const identity = context.auth.getUserIdentity()
    if (!identity) {
      throw new Error('User not authenticated')
    }
    const notes = await context.db.query('noteInfo').collect()
    return notes
  },
})

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('noteInfo')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const notes = await ctx.db
      .query('noteInfo')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', userId).eq('parentDocument', args.parentDocument),
      )
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect()

    return notes
  },
})

export const archieve = mutation({
  args: { id: v.id('noteInfo') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject
    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) {
      throw new Error('Not found')
    }
    if (existingDocument.userId !== userId) {
      throw new Error('Not authenticated')
    }
    const notes = await context.db.patch(args.id, {
      isArchived: true,
    })
    const recursiveArchieve = async (documentId: Id<'noteInfo'>) => {
      const children = await context.db
        .query('noteInfo')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', documentId),
        )
        .collect()

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: true,
        })

        await recursiveArchieve(child._id)
      }
    }
    recursiveArchieve(args.id)
  },
})

export const getTrashNotes = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }
    const userId = identity.subject
    const trashNotes = await context.db
      .query('noteInfo')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), true))
      .order('desc')
      .collect()

    return trashNotes
  },
})

export const restoreNotes = mutation({
  args: { id: v.id('noteInfo') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }
    const userId = identity.subject
    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) {
      throw new Error(' Not Found')
    }
    if (existingDocument.userId !== userId) {
      throw new Error('Not authenticated')
    }
    const recursiveRestore = async (documentId: Id<'noteInfo'>) => {
      const children = await context.db
        .query('noteInfo')
        .withIndex('by_user_parent', (q) => {
          return q.eq('userId', userId).eq('parentDocument', documentId)
        })
        .collect()

      for (const child of children) {
        await context.db.patch(child._id, {
          isArchived: false,
        })
        await recursiveRestore(child._id)
      }
    }

    const options: Partial<Doc<'noteInfo'>> = {
      isArchived: false,
    }

    if (existingDocument.parentDocument) {
      const parent = await context.db.get(existingDocument.parentDocument)
      if (parent?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const note = await context.db.patch(args.id, options)

    recursiveRestore(args.id)

    return note
  },
})

export const removePermanently = mutation({
  args: { id: v.id('noteInfo') },
  handler: async (context, args) => {
    const identity = await context.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authenticated')
    }
    const userId = identity.subject
    const existingDocument = await context.db.get(args.id)
    if (!existingDocument) {
      throw new Error('Not found')
    }
    if (existingDocument.userId !== userId) {
      throw new Error('Unauthorized')
    }
    const note = await context.db.delete(args.id)
    return note
  },
})

export const getSearch = query({
  handler: async (context) => {
    const identity = await context.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Not authenticated')
    }

    const userId = identity.subject

    const documents = await context.db
      .query('noteInfo')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect()

    return documents
  },
})
