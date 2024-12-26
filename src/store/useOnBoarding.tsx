import { create } from "zustand";

interface OnboardingState {
    step: number;
    restaurantInfo: {
        user_id: number;
        name: string;
        description: string;
        cuisine_type: string;
        address: string;
        phone: string;
        website?: string;
        openingHours: {
            [key: string]: {
                open: string;
                close: string;
            };
        };
    };
}

interface OnboardingStore {
    state: OnboardingState;
    updateRestaurantInfo: (info: Partial<OnboardingState["restaurantInfo"]>) => void;
    nextStep: () => void;
    previousStep: () => void;
}

const useOnboardingStore = create<OnboardingStore>((set, get) => {


    const defaultState: OnboardingState = {
        step: 1,
        restaurantInfo: {
            user_id: 0,
            name: "",
            description: "",
            cuisine_type: "",
            address: "",
            phone: "",
            website: "",
            openingHours: {
                monday: { open: "09:00", close: "17:00" },
                tuesday: { open: "09:00", close: "17:00" },
                wednesday: { open: "09:00", close: "17:00" },
                thursday: { open: "09:00", close: "17:00" },
                friday: { open: "09:00", close: "17:00" },
                saturday: { open: "09:00", close: "17:00" },
                sunday: { open: "09:00", close: "17:00" },
            },
        },
    };

    return {
        state: defaultState,
        updateRestaurantInfo: (info) =>
            set((state) => ({
                state: {
                    ...state.state,
                    restaurantInfo: {
                        ...state.state.restaurantInfo,
                        ...info,
                    },
                },
            })),
        nextStep: () => {
            const currentStep = get().state.step;
            if (currentStep === 3) {
                window.location.href = "/dashboard"; // Redirige al dashboard
            } else {
                set((state) => ({
                    state: {
                        ...state.state,
                        step: currentStep + 1,
                    },
                }));
            }
        },
        previousStep: () =>
            set((state) => ({
                state: {
                    ...state.state,
                    step: Math.max(1, state.state.step - 1),
                },
            })),
    };
});

export default useOnboardingStore;