import { useState } from "react"
import { ChefHat } from 'lucide-react'


import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "@/lib/firebase/auth"
import { setLogLevel } from "firebase/firestore";


export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate() // useNavigate for routing in React

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get("email")
        const password = formData.get("password")

        try {
            // Here you would implement email/password login
            await new Promise((resolve) => setTimeout(resolve, 1000))
            navigate("/dashboard") // Use navigate instead of router.push
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleGoogleSignIn() {
        setIsLoading(true)
        try {
            const result = await signInWithGoogle()
            if (result.success) {
                navigate("/dashboard") // Use navigate instead of router.push
            } else {
                throw new Error(result.error)
            }
        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }


    setLogLevel("debug");


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <ChefHat className="h-8 w-8 mr-2" />
                        <span className="font-bold text-2xl">RestaurantManager</span>
                    </div>
                    <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                    >
                        <svg
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                        >
                            <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                        </svg>
                        Continue with Google
                    </Button>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">
                        Don't have an account?{" "}
                    </div>

                </CardFooter>
            </Card>
        </div>
    )
}