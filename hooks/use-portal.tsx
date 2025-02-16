"use client"

import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"

export default function handleBillingButton() {
    const { user } = useUser()
    const router = useRouter()
    const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip")
    const url = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!

    if (url) {
      router.push(url + "?prefilled_email=" + userData?.email)
    } else {
      throw new Error("Failed to edit payment details")
    }
  }