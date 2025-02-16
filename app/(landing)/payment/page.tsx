"use client"

import { subscribe } from "@/actions/createStripeCheckout";
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const { user } = useUser();
  const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
  const router = useRouter()

  const handlePaymentButton = async () => {
    if (!userData) {
      throw new Error("No user!")
    }

    const url = await subscribe({
      userId: userData.userId,
      email: userData.email,
      priceId: "price_1QsuLAKHmIX2ksaNZk6IY7ey",
    })

    if (url) {
      router.push(url)
    } else {
      throw new Error("Failed to subscribe")
    }
  }

  const handleBillingButton = async () => {
    const url = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!

    if (url) {
      router.push(url + "?prefilled_email=" + userData?.email)
    } else {
      throw new Error("Failed to edit payment details")
    }
  }


  return (
    <div>
    {!userData?.hasActivePlan ? (
    <div>
    One last step! In order to access our services, you have to pay.
    <Button onClick={handlePaymentButton}>
      Pay now
    </Button>
  </div>
    ) : (
      <div>
        Edit your subscription details here
        <Button onClick={handleBillingButton}>
          Edit Details
        </Button>
      </div>
    )}
    </div>
  )
}
export default Page