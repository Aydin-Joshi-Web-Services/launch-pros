import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    logo: v.string(),
    ownerId: v.id("users"), // Must be a valid user ID
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("platforms", {
      name: args.name,
      description: args.description,
      logo: args.logo,
      ownerId: args.ownerId,
    });
  },
});

export const by_owner_id = query({
    args: { ownerId: v.id("users") }, // 🔹 Query by `ownerId`
    handler: async (ctx, { ownerId }) => {
      return await ctx.db
        .query("platforms")
        .withIndex("by_owner_id", (q) => q.eq("ownerId", ownerId))
        .collect();
    }
})
