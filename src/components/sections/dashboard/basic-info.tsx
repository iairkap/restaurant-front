
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
import { Textarea } from "@/components/ui/textarea"
import useOnboardingStore from "@/store/useOnBoarding"
export function BasicInfoStep() {
    const { state, updateRestaurantInfo, nextStep } = useOnboardingStore()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        nextStep()
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                        Let's start with the basic information about your restaurant
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Restaurant Name</Label>
                        <Input
                            id="name"
                            value={state.restaurantInfo.name}
                            onChange={(e) => updateRestaurantInfo({ name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={state.restaurantInfo.description}
                            onChange={(e) => updateRestaurantInfo({ description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cuisine">Cuisine Type</Label>
                        <Input
                            id="cuisine"
                            value={state.restaurantInfo.cuisine}
                            onChange={(e) => updateRestaurantInfo({ cuisine: e.target.value })}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" type="button" disabled>
                        Previous
                    </Button>
                    <Button type="submit">Next</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
