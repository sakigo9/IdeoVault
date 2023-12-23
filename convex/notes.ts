import { mutation, query } from './_generated/server'
import { v } from 'convex/values'
import { Doc } from './_generated/dataModel'

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
