import {createBrowserRouter, RouterProvider} from "react-router-dom"
import AppLayout from "./layout/AppLayout"
import LandingPage from "./pages/LandingPage"
import OnboardingPage from "./pages/OnboardingPage"
import JobsPage from "./pages/JobsPage"
import MyJobsPage from "./pages/MyJobsPage"
import JobListingsPage from "./pages/JobListingsPage"
import PostJobsPage from "./pages/PostJobsPage"
import SavedJobsPage from "./pages/SavedJobsPage"
import "./App.css"
import { ThemeProvider } from "./components/theme-provider"

const router = createBrowserRouter([{
  element:<AppLayout/>,
  children:[
    {
      path:"/",
      element : <LandingPage/>
    },
    {
      path:"/onboarding",
      element : <OnboardingPage/>
    },
    {
      path:"/job/:id",
      element : <JobsPage/>
    },
    {
      path:"/my-jobs",
      element : <MyJobsPage/>
    },
    {
      path:"/jobs",
      element : <JobListingsPage/>
    },
    {
      path:"/post-jobs",
      element : <PostJobsPage/>
    },
    {
      path:"/saved-jobs",
      element : <SavedJobsPage/>
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
