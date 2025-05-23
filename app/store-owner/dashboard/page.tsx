"use client"

import { useState, useEffect } from "react"
import { StoreOwnerLayout } from "@/components/layouts/store-owner-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Star, Users } from "lucide-react"
import { RatingUsersList } from "@/components/store-owner/ratings-users-list"

export default function StoreOwnerDashboard() {
  const [storeData, setStoreData] = useState({
    name: "",
    address: "",
    averageRating: 0,
    totalRatings: 0,
    totalUsers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch store data
    const fetchStoreData = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStoreData({
        name: "Tech Haven",
        address: "456 Broadway, New York, NY 10002",
        averageRating: 4.2,
        totalRatings: 45,
        totalUsers: 38,
      })

      setIsLoading(false)
    }

    fetchStoreData()
  }, [])

  if (isLoading) {
    return (
      <StoreOwnerLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse mb-4" />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[120px] rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="h-[400px] rounded-lg bg-muted animate-pulse mt-4" />
        </div>
      </StoreOwnerLayout>
    )
  }

  return (
    <StoreOwnerLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">{storeData.name} Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.averageRating.toFixed(1)}/5.0</div>
              <div className="flex mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(storeData.averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < storeData.averageRating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.totalRatings}</div>
              <p className="text-xs text-muted-foreground">Ratings submitted for your store</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Users who rated your store</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users & Ratings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Users Who Rated Your Store</CardTitle>
                <CardDescription>View all users who have submitted ratings for your store</CardDescription>
              </CardHeader>
              <CardContent>
                <RatingUsersList />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rating Analytics</CardTitle>
                <CardDescription>Detailed analytics of your store's ratings</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Rating analytics visualization would go here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StoreOwnerLayout>
  )
}
