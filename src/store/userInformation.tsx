import { create } from "zustand";


const useUserInformationStore = create((set) => ({
    userInformation: null,
    setUserInformation: (userInformation) => set({ userInformation }),
    resetUserInformation: () => set({ userInformation: null }),
}));

export default useUserInformationStore