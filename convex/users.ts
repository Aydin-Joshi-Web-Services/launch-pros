import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateUser = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    email: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, { userId, name, email, avatar }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name,
        email,
      });
      return existingUser._id;
    }

    const newUserId = await ctx.db.insert("users", {
      userId,
      email,
      name,
      avatar,
      hasActivePlan: false, 
      stripeCustomerId: "",
    });

    return newUserId;
  },
});

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
  },
});


export const updateSubscriptionStatus = mutation({
  args: {
    userId: v.string(),
    stripeCustomerId: v.string(),
    hasActivePlan: v.boolean(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db
        .query("users")
        .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
        .first();

      if (!user) {
        return { success: false, message: "User not found" };
      }

      await ctx.db.patch(user._id, {
        stripeCustomerId: args.stripeCustomerId,
        hasActivePlan: args.hasActivePlan
      });

      return { success: true };
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false, message: String(error) };
    }
  },
});
