import { create } from "zustand";
import { useNavigate } from "react-router-dom";

interface OnboardingState {
    step: number;
    restaurantInfo: {
        name: string;
        description: string;
        cuisine: string;
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

const defaultState: OnboardingState = {
    step: 1,
    restaurantInfo: {
        name: "",
        description: "",
        cuisine: "",
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

const useOnboardingStore = create<OnboardingStore>((set) => ({
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
    nextStep: () =>
        set((state) => {
            if (state.state.step === 3) {
                const navigate = useNavigate();
                navigate("/dashboard"); // Redirige al dashboard
                return state;
            } else {
                return {
                    state: {
                        ...state.state,
                        step: state.state.step + 1,
                    },
                };
            }
        }),
    previousStep: () =>
        set((state) => ({
            state: {
                ...state.state,
                step: Math.max(1, state.state.step - 1),
            },
        })),
}));

export default useOnboardingStore;