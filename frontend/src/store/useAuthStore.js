import {create} from "zustand"
import {axiosInstance} from "../lib/axios"

export const useAuthStore = create(set => {
    return {
        authUser: null,
        isCheckingAuth: true,
        isLogginIn: false,
        isSigningUp: false,
        isUpdatingProfile: false,

        checkAuth: async () => {
            try {
                const response = await axiosInstance.get("/auth/check")
                set({authUser: response.data.user})
            } catch (error) {
                console.log("Error in checking auth", error);
                set({authUser: null})
            } finally {
                set({isCheckingAuth: false})
            }
        }
    }
})