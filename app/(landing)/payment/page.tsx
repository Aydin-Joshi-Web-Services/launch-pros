"use client"

import { subscribe } from "@/actions/createStripeCheckout";
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Router } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user } = useUser();
  const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
  const router = useRouter()

  useEffect(() => {
    if (!userData) {
      // If user data is still loading, do nothing
      return;
    }

    if (!userData) {
      // Redirect to home if no user data is found
      router.push('/');
    } else if (userData.hasActivePlan) {
      // Redirect to the dashboard if the user has an active plan
      router.push('/dashboard');
    }
  }, [userData, router]);

  // You can add a loading state here
  if (!userData) {
    return <div>Loading...</div>; // or a spinner
  }

  const handlePaymentButton = async () => {

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


  return (
    <div>
    {!userData?.hasActivePlan && (
    <div>
    One last step! In order to access our services, you have to pay.
    <Button onClick={handlePaymentButton}>
      Pay now
    </Button>
  </div>
    )}
    </div>
  )
}
export default Page