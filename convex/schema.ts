import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        userId: v.string(),
        avatar: v.string(),
        hasActivePlan: v.boolean(),
        stripeCustomerId: v.optional(v.string()),
    })
      .index("by_user_id", ["userId"])
      .index("by_user_email", ["email"]),
    
      platforms: defineTable({
        name: v.string(),
        description: v.string(),
        logo: v.string(),
        ownerId: v.id("users"), // Directly linked to the user
      })
        .index("by_owner_id", ["ownerId"]) // Lookup all platforms owned by a user
        .index("by_name", ["name"]),
      
      
})
