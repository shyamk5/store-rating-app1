"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Star } from "lucide-react"

export function RatingUsersList() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsers = [
        {
          id: 1,
          name: "Shyam Kumar",
          email: "shyam@example.com",
          rating: 4,
          date: "2023-05-15",
        },
        {
          id: 2,
          name: "Gaurav Kumar",
          email: "gaurav@example.com",
          rating: 5,
          date: "2023-05-20",
        },
        {
          id: 3,
          name: "Abhishek Kumar",
          email: "abhi@example.com",
          rating: 3,
          date: "2023-06-01",
        },
        {
          id: 4,
          name: "Shyam Urvil",
          email: "urvil@example.com",
          rating: 4,
          date: "2023-06-10",
        },
        {
          id: 5,
          name: "Raman",
          email: "raman@example.com",
          rating: 5,
          date: "2023-06-15",
        },
        {
          id: 6,
          name: "Akanksha Gupta",
          email: "aku@example.com",
          rating: 2,
          date: "2023-06-20",
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
      (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
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

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
              <TableHead className="cursor-pointer" onClick={() => handleSort("rating")}>
                Rating {getSortIcon("rating")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date {getSortIcon("date")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Star
                          key={rating}
                          className={`h-4 w-4 ${
                            rating <= user.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(user.date)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
