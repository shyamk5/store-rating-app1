"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export function UserList() {
  const { toast } = useToast()
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch users
    const fetchUsers = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsers = [
        {
          id: 1,
          name: "Shyam Kumar",
          email: "shyam@example.com",
          address: "123 Main St, Noida, UP 201303",
          role: "user",
        },
        {
          id: 2,
          name: "Gaurav Kumar",
          email: "gaurav@example.com",
          address: "456 Main St, Noida, UP 201303",
          role: "user",
        },
        {
          id: 3,
          name: "Abhishek Kumar",
          email: "abhi@example.com",
          address: "789 Main St, Noida, UP 201303",
          role: "store_owner",
          rating: 4.2,
        },
        {
          id: 4,
          name: "Shyam Urvil",
          email: "urvil@example.com",
          address: "101 Main St, Noida, UP 201303",
          role: "admin",
        },
        {
          id: 5,
          name: "Raman",
          email: "raman@example.com",
          address: "202 Main St, Noida, UP 201303",
          role: "store_owner",
          rating: 4.7,
        },
        {
          id: 6,
          name: "Akanksha Gupta",
          email: "aku@example.com",
          address: "Main St, Noida, UP 201303",
          role: "user",
        },
      ]

      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query),
    )

    setFilteredUsers(filtered)
  }, [searchQuery, users])

  const handleSort = (key) => {
    let direction = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1
      }
      return 0
    })

    setFilteredUsers(sortedUsers)
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === "asc" ? "↑" : "↓"
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>
      case "store_owner":
        return <Badge className="bg-blue-500">Store Owner</Badge>
      default:
        return <Badge variant="outline">User</Badge>
    }
  }

  const handleViewDetails = (user) => {
    toast({
      title: "User Details",
      description: `Viewing details for ${user.name}`,
    })
  }

  const handleEdit = (user) => {
    toast({
      title: "Edit User",
      description: `Editing ${user.name}`,
    })
  }

  const handleDelete = (user) => {
    toast({
      title: "Delete User",
      description: `Deleting ${user.name}`,
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
            placeholder="Search users..."
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
              <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
                Role {getSortIcon("role")}
              </TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {user.role === "store_owner" && user.rating ? (
                      <div className="flex items-center">
                        <span className="mr-2">{user.rating.toFixed(1)}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    ) : (
                      <span className="text-muted-foreground">N/A</span>
                    )}
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
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(user)} className="text-red-600">
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
