import {create} from "zustand"
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast"

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
        },
        signup: async (data) => {
            set({ isSigningUp: true });
            try {
              const res = await axiosInstance.post("/auth/signup", data);
              set({ authUser: res.data });
              toast.success("Account created successfully");
            } catch (error) {
              console.error("Signup error:", error);
              if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Signup failed");
              } else if (error.code === 'ERR_NETWORK') {
                toast.error("Cannot connect to server. Please check if the backend is running.");
              } else {
                toast.error("An unexpected error occurred");
              }
            } finally {
              set({ isSigningUp: false });
            }
          },
        login: async (data) => {
          set({ isLoggingIn: true });
          try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
      
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },
    }
})