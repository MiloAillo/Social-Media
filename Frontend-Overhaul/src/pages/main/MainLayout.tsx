import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

function MainLayout() {
    const [ isPageReady, setIsPageReady ] = useState<boolean>(false)

    useEffect(() => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                setIsPageReady(true)
            }, 500)
        })
    }, [])

    if (!isPageReady) {
        return (
            <div>
                <div className="flex justify-center bg-neutral-950 min-h-svh ml-14 lg:ml-60 md:ml-50 sm:ml-45">
                    aa
                </div>
            </div>
        )
    }


    return (
        <div>
            <Sidebar />
            <div className="flex justify-center bg-neutral-950 min-h-svh ml-14 lg:ml-60 md:ml-50 sm:ml-45">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout