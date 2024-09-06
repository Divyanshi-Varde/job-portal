import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import LandingPage from "./pages/LandingPage"
import OnboardingPage from "./pages/OnboardingPage"
import JobsPage from "./pages/JobsPage"
import MyJobsPage from "./pages/MyJobsPage"
import JobListingsPage from "./pages/JobListingsPage"
import PostJobsPage from "./pages/PostJobsPage"
import SavedJobsPage from "./pages/SavedJobsPage"
import { ThemeProvider } from "./components/theme-provider"
import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"

const router = createBrowserRouter([{
  element:<AppLayout/>,
  children:[
    {
      path:"/",
      element : <LandingPage/>
    },
    {
      path:"/onboarding",
      element : <ProtectedRoute><OnboardingPage/></ProtectedRoute>
    },
    {
      path:"/job/:id",
      element : <ProtectedRoute><JobsPage/></ProtectedRoute>
    },
    {
      path:"/my-jobs",
      element :<ProtectedRoute><MyJobsPage/></ProtectedRoute>
    },
    {
      path:"/jobs",
      element : <ProtectedRoute><JobListingsPage/></ProtectedRoute>
    },
    {
      path:"/post-jobs",
      element : <ProtectedRoute><PostJobsPage/></ProtectedRoute>
    },
    {
      path:"/saved-jobs",
      element : <ProtectedRoute><SavedJobsPage/></ProtectedRoute>
    },
  ]
}])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App
