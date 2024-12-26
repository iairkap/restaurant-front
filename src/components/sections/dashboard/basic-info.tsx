import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useOnboardingStore from "@/store/useOnBoarding";
import { inputFieldsBasicInfo } from "@/constants/onBoarding";

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export function BasicInfoStep() {
    const { state, updateRestaurantInfo, nextStep, updateUserName } = useOnboardingStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nextStep();
    };

    const inputFields = inputFieldsBasicInfo(
        state,
        updateUserName,
        updateRestaurantInfo
    );

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

                    {
                        //eslint-disable-next-line
                        inputFields.map((field: any) => (
                            <div key={field.id} className="space-y-2">
                                <Label htmlFor={field.id}>{field.name}</Label>
                                {field.type === "input" ? (
                                    <Input
                                        id={field.id}
                                        value={field.value || ""}
                                        onChange={(e: InputChangeEvent) => field.onChange(e)}
                                        required={field.required}
                                    />
                                ) : (
                                    <Textarea
                                        id={field.id}
                                        value={field.value || ""}
                                        onChange={(e: InputChangeEvent) => field.onChange(e)}
                                        required={field.required}
                                    />
                                )}
                            </div>
                        ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" type="button" disabled>
                        Previous
                    </Button>
                    <Button type="submit">Next</Button>
                </CardFooter>
            </Card>
        </form>
    );
}