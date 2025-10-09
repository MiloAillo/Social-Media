import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { easeInOut, motion } from "motion/react"
import LoadingDiv from "@/components/ui/loading"

function MainLayout() {
    const [ isPageReady, setIsPageReady ] = useState<boolean>(false)

    useEffect(() => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                setIsPageReady(true)
            }, 750)
        })
    }, [])

    return (
        <div>
            <div className={`pointer-events-none fixed w-screen h-screen bg-neutral-800 flex flex-col items-center justify-center z-1 transition ${isPageReady ? "opacity-0" : "opacity-100"}`}>
                <motion.div
                    className="flex flex-col gap-10 justify-center items-center"
                    animate = {{
                        y: [5, -5, 5]
                    }}
                    transition = {{
                        ease: easeInOut,
                        duration: 2,
                        repeat: Infinity
                    }}
                >
                <LoadingDiv />
                <p className="font-bold text-2xl">Loading...</p>
                </motion.div>
            </div>

            <div className="z-0">
                <Sidebar />
                <div className="flex justify-center bg-neutral-950 min-h-svh ml-14 lg:ml-60 md:ml-50 sm:ml-45">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout