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
import useOnboardingStore from "@/store/useOnBoarding"

export function ContactInfoStep() {
    const { state, updateRestaurantInfo, nextStep, previousStep } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How can customers reach your restaurant?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={state.restaurantInfo.address}
                            onChange={(e) => updateRestaurantInfo({ address: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={state.restaurantInfo.phone}
                            onChange={(e) => updateRestaurantInfo({ phone: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Website (Optional)</Label>
                        <Input
                            id="website"
                            type="url"
                            value={state.restaurantInfo.website}
                            onChange={(e) => updateRestaurantInfo({ website: e.target.value })}
                            placeholder="https://"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" type="button" onClick={previousStep}>
                        Previous
                    </Button>
                    <Button type="submit">Next</Button>
                </CardFooter>
            </Card>
        </form>
    )
}