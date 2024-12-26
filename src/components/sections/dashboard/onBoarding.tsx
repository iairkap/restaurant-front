
import { ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { BasicInfoStep } from "./basic-info"
import { ContactInfoStep } from "./contact-info"
import { HoursStep } from "./hours"
import useOnboardingStore from "@/store/useOnBoarding"
import useUserInformationStore from '@/store/userInformation'

function OnboardingSteps() {
    const { state, updateRestaurantInfo } = useOnboardingStore()
    const { userInformation } = useUserInformationStore()


    useEffect(() => {
        if (userInformation?.id) {
            updateRestaurantInfo({ user_id: userInformation.id });
        }
    }, [userInformation, updateRestaurantInfo]);




    const steps = [
        { id: 1, name: "Basic Information", component: BasicInfoStep },
        { id: 2, name: "Contact Details", component: ContactInfoStep },
        { id: 3, name: "Opening Hours", component: HoursStep },
    ]

    const CurrentStep = steps[state.step - 1].component

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <nav aria-label="Progress">
                <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                    {steps.map((step) => (
                        <li key={step.name} className="md:flex-1">
                            <div
                                className={`group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${step.id === state.step
                                    ? "border-primary"
                                    : step.id < state.step
                                        ? "border-primary/50"
                                        : "border-gray-200"
                                    }`}
                            >
                                <span className="text-sm font-medium">Step {step.id}</span>
                                <span className="text-sm">{step.name}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="mt-8">
                <CurrentStep />
            </div>
        </div>
    )
}

export default function OnboardingPage() {




    return (
        <div className="space-y-6">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <span>Dashboard</span>
                        <ChevronRight className="h-4 w-4 mx-1" />
                        <span>Onboarding</span>
                    </div>
                </div>
            </div>
            <OnboardingSteps />
        </div>
    )
}