import Header from "@/components/Header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
        <main className="min-h-screen container">
            <Header/>
            <Outlet/>
        </main>
        <div className="p-10 mt-10 bg-gray-800 text-center"> Made with 💗 by Divyanshi</div>
    </div>
  )
}

export default AppLayout
