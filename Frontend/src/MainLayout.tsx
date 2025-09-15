import { Outlet } from "react-router-dom"
import Sidebar from "./components/sidebar"

function MainLayout() {
    return (
        <div>
            <Sidebar />
            <div className="bg-[#222831] w-screen min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout