import { create } from "zustand";
import { fetchUserByEmail } from "@/api/userAPI";

export interface UserInformation {
    id?: number;
    email: string;
    name: string;
    role: string;
    restaurants: RestaurantInformation[];
}

export interface RestaurantInformation {
    id: number;
    name: string;

    address: string;
    picture: string[];
    isActive: boolean;
    description: string;
    phone: string;
}

interface UserInformationStore {
    userInformation: UserInformation | null;
    setUserInformation: (userInformation: UserInformation | null) => void;
    resetUserInformation: () => void;
    fetchUserInformationByEmail: (email: string) => Promise<void>;
    hasRestaurants: boolean; // Flag to indicate if there are restaurants
}

const useUserInformationStore = create<UserInformationStore>((set) => ({
    userInformation: null,
    setUserInformation: (userInformation: UserInformation | null) =>
        set({ userInformation, hasRestaurants: (userInformation?.restaurants?.length ?? 0) > 0 }),

    resetUserInformation: () => set({ userInformation: null, hasRestaurants: false }),

    fetchUserInformationByEmail: async (email: string) => {
        try {
            const user = await fetchUserByEmail(email);
            if (user) {
                set({
                    userInformation: user,
                    hasRestaurants: user.restaurants?.length > 0,
                });
            } else {
                set({ userInformation: null, hasRestaurants: false });
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
            set({ userInformation: null, hasRestaurants: false });
        }
    },

    hasRestaurants: false,
}));

export default useUserInformationStore;