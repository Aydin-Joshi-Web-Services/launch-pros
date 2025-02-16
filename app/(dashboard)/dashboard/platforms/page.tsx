"use client"

import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

function Platforms() {
  const { user } = useUser();
  const router = useRouter();

  const convexUser = useQuery(api.users.getByUserId, user ? { userId: user.id } : "skip");
  const platforms = useQuery(
    api.platforms.by_owner_id,
    convexUser ? { ownerId: convexUser._id } : "skip"
  );

  if (!user) return <p className="p-8 text-red-500">Please sign in to view platforms.</p>;
  if (!convexUser) return <p className="p-8 text-gray-500">Loading user data...</p>;
  if (!platforms) return <p className="p-8 text-gray-500">Loading platforms...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Platforms</h1>

      {platforms.length === 0 ? (
        <div className="flex flex-col items-center">
          <p className="text-gray-500 mb-4">You haven't created any platforms yet.</p>
          <Button onClick={() => router.push('/dashboard/platforms/create')}>
            Create a Platform
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            className="hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer"
            onClick={() => router.push('/dashboard/platforms/create')}
          >
            <CardHeader className="text-center">
              <CardTitle className="text-lg">+ Create a New Platform</CardTitle>
              <CardDescription>Start your next SaaS today.</CardDescription>
            </CardHeader>
          </Card>

          {platforms.map((platform: any) => (
            <Card key={platform._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                  <img src={platform.logo} className="w-12 h-12 rounded-full" />
                <div>
                  <CardTitle>{platform.name}</CardTitle>
                  <CardDescription className="mt-2">
                    {platform.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Platforms;
