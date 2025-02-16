"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-600 mt-2">
            Your payment was cancelled and you haven&apos;t been charged.
            Feel free to try again when you&apos;re ready.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full"
            onClick={() => router.push('/pricing')}
          >
            Return to Pricing
          </Button>
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Having trouble? <button onClick={() => router.push('/contact')} className="text-blue-600 hover:underline">Contact support</button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;