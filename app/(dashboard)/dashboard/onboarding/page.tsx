"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowRight, Check, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const createPlatform = useMutation(api.platforms.create)
  const convexUser = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip")

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
  })

  const progress = (step / 3) * 100

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (convexUser) {
        await createPlatform({
          ...formData,
          ownerId: convexUser._id,
        })
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Failed to create platform:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Create Your Platform</h1>
                <p className="text-gray-500">
                  Let&apos;s get started by setting up your platform details
                </p>
              </div>

              <Progress value={progress} className="h-2 w-full" />

              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Basic Information</h2>
                        <p className="text-sm text-gray-500">
                          Start with the fundamental details of your platform
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Platform Name</label>
                          <Input
                            placeholder="Enter your platform name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Platform Details</h2>
                        <p className="text-sm text-gray-500">
                          Tell us more about your platform
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          <Input
                            placeholder="Describe your platform"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({ ...formData, description: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Branding</h2>
                        <p className="text-sm text-gray-500">
                          Add your platform&apos;s visual identity
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Logo URL</label>
                          <Input
                            placeholder="Enter your logo URL"
                            value={formData.logo}
                            onChange={(e) =>
                              setFormData({ ...formData, logo: e.target.value })
                            }
                            required
                          />
                        </div>

                        <div className="flex justify-center p-6 border-2 border-dashed rounded-lg">
                          {formData.logo ? (
                            <img
                              src={formData.logo}
                              alt="Platform logo"
                              className="w-32 h-32 object-contain"
                            />
                          ) : (
                            <div className="text-center">
                              <Upload className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-2 text-sm text-gray-500">
                                Logo preview will appear here
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={step === 1}
                    >
                      Back
                    </Button>

                    {step < 3 ? (
                      <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && (!formData.name || formData.name.trim() === "")) ||  // Ensure name is not empty
                        (step === 2 && (!formData.description || formData.description.trim() === ""))  // Ensure description is not empty
                      }
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Continue
                    </Button>                    
                    ) : (
                      <Button type="submit" disabled={loading || !formData.logo}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Create Platform
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}