"use client"

import { CheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function PricingGrids() {
    const router = useRouter()

    return (
        <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-4xl">
            {/* Left Section - Pricing/Name/Button */}
            <div className="p-8 h-fit rounded-3xl ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-gray-300">
                    LaunchPro SaaS Plan
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Simplify Your SaaS Growth with Our Comprehensive Features
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                        $10
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300">
                        / month (USD)
                    </span>
                </p>
                <Button className="bg-lime-600 w-full text-white shadow-sm hover:bg-lime-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600" onClick={() => router.push("/sign-up")}>
                    Get Started
                </Button>
            </div>

            {/* Right Section - Features */}
            <div className="p-8 ring-1 ring-gray-200 rounded-3xl">
                <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-gray-300">
                    Features Included
                </h3>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> Manage Your SaaS Marketing
                    </li>
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> Track Sales & Growth Insights
                    </li>
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> Centralized Financial Management
                    </li>
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> Developer Tools for Streamlined Workflow
                    </li>
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> Real-Time SaaS Performance Analytics
                    </li>
                    <li className="flex gap-x-3">
                        <CheckIcon className="h-6 w-5 flex-none text-lime-600" /> 24/7 Customer Support
                    </li>
                </ul>
            </div>
        </div>
    )
}
