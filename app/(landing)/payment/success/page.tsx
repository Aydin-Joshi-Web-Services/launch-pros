"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dashboard after 2 seconds
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500); // 2000 ms = 2 seconds
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-green-700">Payment Successful!</h1>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
