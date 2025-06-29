import Navbar from "./components/Navbar"
import {Routes, Route} from "react-router-dom"
import {HomePage, SignUpPage, LoginPage, SettingsPage, ProfilePage} from "./pages"
import {useAuthStore} from "./store/useAuthStore.js"
import {useEffect} from "react"

 function App() {

  const {authUser, checkAuth} = useAuthStore();

  useEffect(() => {}, [checkAuth])

  console.log({authUser});

  return (
    <>
     <Navbar />
     <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}

export default App
