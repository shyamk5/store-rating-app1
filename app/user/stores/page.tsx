"use client"

import { useState, useEffect } from "react"
import { UserLayout } from "@/components/layouts/user-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StoreCard } from "@/components/user/store-card"
import { Search } from "lucide-react"

export default function UserStoresPage() {
  const [stores, setStores] = useState([])
  const [filteredStores, setFilteredStores] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch stores
    const fetchStores = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockStores = [
        {
          id: 1,
          name: "Grocery Express",
          address: "123 Main St, New York, NY 10001",
          rating: 4.5,
          userRating: 4,
        },
        {
          id: 2,
          name: "Tech Haven",
          address: "456 Broadway, New York, NY 10002",
          rating: 3.8,
          userRating: null,
        },
        {
          id: 3,
          name: "Fashion Boutique",
          address: "789 5th Ave, New York, NY 10003",
          rating: 4.2,
          userRating: 5,
        },
        {
          id: 4,
          name: "Home Essentials",
          address: "101 Park Ave, New York, NY 10004",
          rating: 3.9,
          userRating: 3,
        },
        {
          id: 5,
          name: "Bookworm's Paradise",
          address: "202 Lexington Ave, New York, NY 10005",
          rating: 4.7,
          userRating: null,
        },
        {
          id: 6,
          name: "Gourmet Delights",
          address: "303 Madison Ave, New York, NY 10006",
          rating: 4.4,
          userRating: 4,
        },
      ]

      setStores(mockStores)
      setFilteredStores(mockStores)
      setIsLoading(false)
    }

    fetchStores()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStores(stores)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = stores.filter(
      (store) => store.name.toLowerCase().includes(query) || store.address.toLowerCase().includes(query),
    )

    setFilteredStores(filtered)
  }, [searchQuery, stores])

  const handleRatingSubmit = (storeId, rating) => {
    // In a real app, this would be an API call to submit a rating
    setStores((prevStores) =>
      prevStores.map((store) => (store.id === storeId ? { ...store, userRating: rating } : store)),
    )

    setFilteredStores((prevStores) =>
      prevStores.map((store) => (store.id === storeId ? { ...store, userRating: rating } : store)),
    )
  }

  return (
    <UserLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Stores</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Browse Stores</CardTitle>
            <CardDescription>View and rate stores registered on our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by store name or address..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[200px] rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <>
                {filteredStores.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No stores found matching your search criteria.</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredStores.map((store) => (
                      <StoreCard key={store.id} store={store} onRatingSubmit={handleRatingSubmit} />
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  )
}
