import { Outlet } from "react-router-dom"
import Sidebar from "./components/sidebar"

function MainLayout() {
    return (
        <div>
            <Sidebar />
            <div className="flex justify-center bg-[#222831] min-h-svh ml-14 lg:ml-60 md:ml-50 sm:ml-45">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout