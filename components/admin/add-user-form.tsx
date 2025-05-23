"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AddUserForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "user",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Name validation: Min 20 characters, Max 60 characters
    if (formData.name.length < 20 || formData.name.length > 60) {
      newErrors.name = "Name must be between 20 and 60 characters"
    }

    // Address validation: Max 400 characters
    if (formData.address.length > 400) {
      newErrors.address = "Address must be less than 400 characters"
    }

    // Password validation: 8-16 characters, must include at least one uppercase letter and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be 8-16 characters with at least one uppercase letter and one special character"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "User created",
        description: `${formData.name} has been successfully created as a ${formData.role}.`,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        address: "",
        role: "user",
        password: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating the user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="Full name" required value={formData.name} onChange={handleChange} />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          <p className="text-xs text-muted-foreground">Must be between 20 and 60 characters</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="user@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          placeholder="User address"
          required
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
        <p className="text-xs text-muted-foreground">Maximum 400 characters</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role} onValueChange={handleRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Normal User</SelectItem>
            <SelectItem value="store_owner">Store Owner</SelectItem>
            <SelectItem value="admin">System Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
          <p className="text-xs text-muted-foreground">
            8-16 characters, must include at least one uppercase letter and one special character
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating user..." : "Create User"}
      </Button>
    </form>
  )
}
