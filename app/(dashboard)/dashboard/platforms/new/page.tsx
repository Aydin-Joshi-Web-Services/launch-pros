"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export default function CreatePlatformPage() {
  const { user } = useUser();
  const router = useRouter();
  const createPlatform = useMutation(api.platforms.create);
  
  // Fetch Convex user to get correct Id<"users">
  const convexUser = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !description || !logo) return alert("All fields are required.");
    if (!convexUser) return alert("User data is still loading.");

    setLoading(true);
    try {
      await createPlatform({
        name,
        description,
        logo,
        ownerId: convexUser._id, // ✅ Use Convex ID
      });
      router.push("/dashboard/platforms"); // Redirect after creation
    } catch (error) {
      alert("Failed to create platform.");
      console.error(error);
    }
    setLoading(false);
  }

  if (!user) return <p className="p-8 text-red-500">Please sign in to create a platform.</p>;
  if (!convexUser) return <p className="p-8 text-gray-500">Loading user data...</p>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Platform</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Platform Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Platform Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Logo URL"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Platform"}
        </Button>
      </form>
    </div>
  );
}
