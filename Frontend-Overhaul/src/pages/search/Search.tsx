// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faSearch } from "@fortawesome/free-solid-svg-icons"

import ApiUrl from "@/lib/api"
import type { usersSearchedWrapper } from "@/types/usersSearchedType"
import axios from "axios"
import { useEffect, useState } from "react"
import { easeOut, motion } from "motion/react"
import { useNavigate } from "react-router-dom"

function Search() {
    const [input, setInput] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<usersSearchedWrapper>()

    const navigate = useNavigate()

    const token = window.localStorage.getItem("Authorization")

    useEffect(() => {
        setIsLoading(true)
        if(!input) {
            return
        }

        const fetchUsers = setTimeout(async () => {
            try {
                const res = await axios.post(`${ApiUrl}/api/search`, {
                    users: input
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.data
                setData(data)
            } catch(err) {
                setData([])
            } finally {
                setIsLoading(false)
            }
        }, 500)

        return () => clearTimeout(fetchUsers)
    }, [input])

    return (
        <div className="px-5 grow sm:px-10 md:px-15 lg:px-20 pt-5 md:pt-10 overflow-hidden flex flex-col gap-5">
            <div className="w-full h-11 sm:h-14 border-b-2 border-[#8d8d8d] flex flex-row items-center justify-between px-3 gap-2">
                <input type="text" onChange={(e) => {setInput(e.target.value)}} placeholder="Search..." className="h-full flex-1 text-white font-semibold text-md sm:text-lg lg:text-xl focus:outline-0"/>
                {/* <FontAwesomeIcon icon={faSearch} color="white" className="text-xl sm:text-2xl w-full h-full" /> */}
            </div>
            <div className="flex flex-col gap-7 w-full h-screen">
                {isLoading ? null : data?.map((user) => (
                    <motion.div 
                        className="flex w-full h-27 items-center gap-5"
                        initial = {{
                            x: 100,
                            opacity: 0
                        }}
                        whileInView = {{
                            x: [100, -10, 0],
                            opacity: [0, 30, 100],
                            transition: {
                                duration: 0.6,
                                ease: easeOut
                            }    
                        }}
                        onClick={() => navigate(`/app/${user.id}`)}
                    >
                        <img src={`${user.photo}`} alt={`${user.username}\` photo`} className="rounded-full h-full w-auto" />
                        <div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-2xl">{user.username}</p>
                                <p className="font-medium text-lg">{user.description}</p>
                            </div>
                            <div className="flex gap-5 font-light">
                                <p>follower: {user.follower_count}</p>
                                <p>following: {user.following_count}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Search