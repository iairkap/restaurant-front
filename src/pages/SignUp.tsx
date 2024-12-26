
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
import { Link } from "react-router-dom"
import { handleLogInSubmit, handleGoogleSignIn, } from "@/handlers/authenticationHandler"
import styles from "@/styles/signup.module.css"
import { formFields } from "@/constants/signUpForm"
export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate() // useNavigate for routing in React


    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader className={styles.spaceY1}>
                    <div className={styles.headerContent}>
                        <ChefHat className={styles.headerIcon} />
                        <span className={styles.headerTitle}>RestaurantManager</span>
                    </div>
                    <CardTitle className={styles.cardTitle}>Create an account</CardTitle>
                    <CardDescription className={styles.cardDescription}>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="w-full"
                        variant="outline"
                        onClick={() => handleGoogleSignIn(setIsLoading, navigate)}
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
                    <div className={styles.relative}>
                        <div className={`${styles.absolute} ${styles.inset0} ${styles.flex} ${styles.itemsCenter}`}>
                            <span className={styles.borderT} />
                        </div>
                        <div className={`${styles.relative} ${styles.flex} ${styles.justifyCenter} ${styles.textXs} ${styles.uppercase}`}>
                            <span className={`${styles.bgBackground} ${styles.px2} ${styles.textMutedForeground}`}>
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <form onSubmit={(event) => handleLogInSubmit(event, setIsLoading, navigate)}>
                        <div className={styles.spaceY4}>
                            {formFields.map(({ id, name, label, placeholder, type }) => (
                                <div className={styles.spaceY2} key={id}>
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input
                                        id={id}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            ))}
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create account"}
                            </Button>
                        </div>
                    </form>
                    <CardFooter className={`${styles.flex} ${styles.flexCol} ${styles.spaceY4}`}>
                        <div className={`${styles.textSm} ${styles.textCenter} ${styles.textGray500} ${styles.darkTextGray400}`}>
                            Already have an account?{" "}
                            <Link className={`${styles.underline} ${styles.underlineOffset4} ${styles.hoverTextPrimary}`} to="/login">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}