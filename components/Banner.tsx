import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function Banner() {
  return (
    <Alert variant="default" className="relative border-none bg-orange-600 rounded-none py-3 font-inter">
      <div className="container mx-auto">
        <div className="flex items-center justify-center w-full relative">
          <AlertDescription className="flex items-center justify-center flex-wrap gap-4 text-white">
            <p className="text-sm">
              🎉 We&apos;re now live on Product Hunt! Check us out <Link target="_blank" href="https://producthunt.com" className="underline">here</Link>
            </p>
            
          </AlertDescription>
        </div>
      </div>
    </Alert>
  )
}