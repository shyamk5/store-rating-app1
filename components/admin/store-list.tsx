"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function StoreList() {
  const { toast } = useToast()
  const [stores, setStores] = useState([])
  const [filteredStores, setFilteredStores] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  })
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
          email: "contact@groceryexpress.com",
          address: "123 Main St, Noida Sector 45, UP 201303",
          rating: 4.5,
        },
        {
          id: 2,
          name: "Tech Shyam",
          email: "info@techhaven.com",
          address: "456 Main St, Noida Sector 62, UP 201301",
          rating: 3.8,
        },
        {
          id: 3,
          name: "Fashion Boutique Parlour",
          email: "hello@fashionboutique.com",
          address: "789 Main St, Noida Sector 15, UP 201301",
          rating: 4.2,
        },
        {
          id: 4,
          name: "Home Essentials",
          email: "support@homeessentials.com",
          address: "101 Main St, Noida, UP 201305",
          rating: 3.9,
        },
        {
          id: 5,
          name: "Pine Tree Tech",
          email: "books@bookworm.com",
          address: "202 Main St, Noida, UP 201309",
          rating: 4.7,
        },
        {
          id: 6,
          name: "Gaurav Delights",
          email: "taste@gourmetdelights.com",
          address: "303 Main St, Noida, UP 201307",
          rating: 4.4,
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
      (store) =>
        store.name.toLowerCase().includes(query) ||
        store.email.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query),
    )

    setFilteredStores(filtered)
  }, [searchQuery, stores])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })

    const sortedStores = [...filteredStores].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1
      }
      return 0
    })

    setFilteredStores(sortedStores)
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? "↑" : "↓"
  }

  const handleViewDetails = (store) => {
    toast({
      title: "Store Details",
      description: `Viewing details for ${store.name}`,
    })
  }

  const handleEdit = (store) => {
    toast({
      title: "Edit Store",
      description: `Editing ${store.name}`,
    })
  }

  const handleDelete = (store) => {
    toast({
      title: "Delete Store",
      description: `Deleting ${store.name}`,
      variant: "destructive",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="h-10 w-full max-w-sm bg-muted rounded animate-pulse" />
        </div>
        <div className="rounded-md border">
          <div className="h-[400px] bg-muted animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search stores..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Name {getSortIcon("name")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                Email {getSortIcon("email")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("address")}>
                Address {getSortIcon("address")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                Rating {getSortIcon("rating")}
              </TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No stores found
                </TableCell>
              </TableRow>
            ) : (
              filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <span className="mr-2">{store.rating.toFixed(1)}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(store)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(store)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(store)} className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
