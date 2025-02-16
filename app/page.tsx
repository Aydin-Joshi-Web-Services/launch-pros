import { Button } from "@/components/ui/button"
import {
  BrainCogIcon,
  EyeIcon,
  GlobeIcon,
  MonitorSmartphoneIcon,
  ServerCogIcon,
  ZapIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PricingGrids from "@/components/PricingGrids"


const features = [
  {
    name: "Effortless SaaS Management",
    description: "Manage every aspect of your SaaS business, from marketing and sales to development and growth, all in one place.",
    icon: GlobeIcon,
  },
  {
    name: "Boost Your Growth",
    description: "Experience rapid business growth with data-driven insights and tools designed to streamline marketing and sales strategies.",
    icon: ZapIcon,
  },
  {
    name: "Simplified Financial Tracking",
    description: "Easily manage and track your SaaS financials, from revenue and expenses to profits, so you can focus on scaling your business.",
    icon: BrainCogIcon,
  },
  {
    name: "All-in-One Dashboard",
    description: "Get a comprehensive view of your SaaS business with a single, easy-to-navigate dashboard that tracks your key metrics.",
    icon: EyeIcon,
  },
  {
    name: "Seamless Integration",
    description: "Integrate with your existing tools and platforms, saving you time and effort by keeping everything in one place.",
    icon: ServerCogIcon,
  },
  {
    name: "Access Anywhere, Anytime",
    description: "Access and manage your SaaS business from any device, whether it's your desktop, tablet, or smartphone, for maximum flexibility.",
    icon: MonitorSmartphoneIcon,
  },
]

export default async function Home() {

  return (
<main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-lime-400 to-lime-600">
    <div className="bg-white dark:bg-black py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-base font-semibold leading-7 text-[#">
                    Introducing LaunchPro, your All-in-One SaaS Management Tool
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-6xl">
                    Empowering Developers to Grow Their SaaS
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Say goodbye to struggling with SaaS growth. LaunchPro is here to help you manage every aspect of your SaaS business effortlessly—marketing, sales, financials, and development—all in one platform. Whether you&apos;re a developer or a solopreneur trying to scale your business, LaunchPro is designed for you.
                </p>
            </div>
            <div className="flex justify-center items-center mx-5 mt-10">
                <div className="text-center">
                    <Button asChild className="mr-5 text-white">
                        <Link href="/sign-up">Join our Beta Users</Link>
                    </Button>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                        We are offering a free 6-month plan to our first 50 beta users!
                    </p>
                </div>
            </div>
        </div>


          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-14rem)] aspect-[1155/678] w-[50rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#87ff31] to-[#d5ff31] opacity-50 sm:left-[calc(50%-35rem)] sm:w-[80rem]"
            />
          </div>

          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Image 
              alt="App screenshot"
              src="/hero-image.png"
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 -inset-x-32 bg-gradient-to-t from-white/95 pt-[5%] dark:-inset-x-0" />
            </div>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon 
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-lime-500"
                    />
                  </dt>

                  <dd>{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="py-24 sm:px-32 mt-5">
            <div className="max-w-4xl mx-auto text-center">
              <p className=" text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
                One subscription makes it easy
              </p>
            </div>
            <PricingGrids />
          </div>
        </div>
    </main>
  )
}
