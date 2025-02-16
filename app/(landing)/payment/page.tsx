"use client"

import { subscribe } from "@/actions/createStripeCheckout";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user } = useUser();
  const userData = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
  const router = useRouter();

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
    return <div className="text-center py-12">Loading...</div>; // or a spinner
  }

  const handlePaymentButton = async () => {
    const url = await subscribe({
      userId: userData.userId,
      email: userData.email,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID as string,
    });

    if (url) {
      router.push(url);
    } else {
      throw new Error("Failed to subscribe");
    }
  };

  return (
    <div className="min-h-screen mx-auto px-6 py-12">
      {!userData?.hasActivePlan && (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">One Last Step!</h2>
          <p className="text-lg text-gray-600 mb-6">
            To access all our services, please complete your payment.
          </p>
          <Button
            onClick={handlePaymentButton}
            className="bg-lime-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-lime-500 transition-colors duration-200"
          >
            Pay Now
          </Button>
        </div>
      )}
    </div>
  );
}

export default Page;
