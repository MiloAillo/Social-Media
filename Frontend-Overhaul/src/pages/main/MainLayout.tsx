import Sidebar from "@/components/sidebar"
import { Outlet } from "react-router-dom"

function MainLayout() {
    return (
        <div>
            <Sidebar />
            <div className="flex justify-center bg-neutral-900 min-h-svh ml-14 lg:ml-60 md:ml-50 sm:ml-45">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout