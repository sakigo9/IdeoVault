import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  noteInfo: defineTable({
    title: v.string(),
    userId: v.string(),
    isArchived: v.boolean(),
    parentDocument: v.optional(v.id('noteInfo')),
    isPublished: v.boolean(),
    icon: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    content: v.optional(v.string()),
  })
    .index('by_user', ['userId']) // Index for faster query
    .index('by_user_parent', ['userId', 'parentDocument']),
})
