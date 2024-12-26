
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
import { postRestaurant } from "@/api/restaurantApi"
import useAuthStore from "@/store/useAuthStore"
import useUserInformationStore from "@/store/userInformation"


const DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
] as const

export function HoursStep() {
    const { state, updateRestaurantInfo, nextStep, previousStep } = useOnboardingStore()





    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        postRestaurant(state.restaurantInfo, state.userName)
        /*         nextStep()
         */
    }

    const updateHours = (day: string, type: 'open' | 'close', value: string) => {
        updateRestaurantInfo({
            openingHours: {
                ...state.restaurantInfo.openingHours,
                [day]: {
                    ...state.restaurantInfo.openingHours[day],
                    [type]: value,
                },
            },
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>Opening Hours</CardTitle>
                    <CardDescription>When is your restaurant open?</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {DAYS.map((day) => (
                            <div key={day} className="grid grid-cols-3 gap-4 items-center">
                                <Label className="capitalize">{day}</Label>
                                <div className="space-y-2">
                                    <Label htmlFor={`${day}-open`}>Open</Label>
                                    <Input
                                        id={`${day}-open`}
                                        type="time"
                                        value={state.restaurantInfo.openingHours[day].open}
                                        onChange={(e) => updateHours(day, 'open', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor={`${day}-close`}>Close</Label>
                                    <Input
                                        id={`${day}-close`}
                                        type="time"
                                        value={state.restaurantInfo.openingHours[day].close}
                                        onChange={(e) => updateHours(day, 'close', e.target.value)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" type="button" onClick={previousStep}>
                        Previous
                    </Button>
                    <Button type="submit">Complete Setup</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
