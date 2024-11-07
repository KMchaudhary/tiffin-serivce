'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 lg:p-0">
      <div className="w-full h-full max-w-[500px] lg:max-w-none lg:h-screen lg:shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Left column (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 bg-black p-12 text-white flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-lg mb-8">Log in to access your account and manage your services.</p>
          {/* You can add an illustration or image here */}
          <div className="w-full h-64 bg-primary-foreground rounded-lg bg-white"></div>
        </div>

        {/* Right column / Mobile card */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-center lg:max-w-none mx-auto lg:mx-0 bg-white">
            <Card className="lg:shadow-none lg:bg-transparent lg:border-none max-w-[500px] w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                <div className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                        <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        required 
                        />
                        <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    </div>
                    </div>
                </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit">Log in</Button>
            </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  )
}