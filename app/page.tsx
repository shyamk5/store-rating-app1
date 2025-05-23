import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <h1 className="text-lg font-semibold">Store Rating Platform</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Roxiler Systems - Store Rating App
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our platform to discover and rate stores in your area. Store owners can track their ratings and
              improve their services.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>For Users</CardTitle>
                <CardDescription>Discover and rate stores in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Browse through our collection of registered stores and submit your ratings. Help others make informed
                  decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button className="w-full">Sign Up as User</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Store Owners</CardTitle>
                <CardDescription>Monitor your store's performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Track your store's ratings and see what customers think about your services. Use the feedback to
                  improve.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Login as Store Owner
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Administrators</CardTitle>
                <CardDescription>Manage the entire platform</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Add new stores, manage users, and view platform statistics. Keep the platform running smoothly.</p>
              </CardContent>
              <CardFooter>
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full">
                    Login as Admin
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Roxiler Systems - Store Rating App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
