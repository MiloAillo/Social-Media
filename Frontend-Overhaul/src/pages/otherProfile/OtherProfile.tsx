import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faUserPen } from "@fortawesome/free-solid-svg-icons"
import { motion } from "motion/react"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { fetchedOtherProfile } from "@/types/fetchOtherProfileType"

function OtherProfile() {
    const user = useLoaderData() as fetchedOtherProfile
    
    const [initialFollow, setInitialFollow] = useState<boolean>(user.isFollowing)
    const [isFollowed, setIsFollowed] = useState<boolean>(user.isFollowing)
    const [followers, setFollowers] = useState<number>(user.follower)
    // this isnt fully right. make the backend return boolean that the user follow this exact person or not then attach to the useState
    // also change the useEffect to be compatible

    useEffect(() => {
        if(initialFollow) {
            if (isFollowed) setFollowers(user.follower)
            if (!isFollowed) setFollowers(prev => prev - 1)
        }
        if(!initialFollow) {
            if (!isFollowed) setFollowers(user.follower)
            if (isFollowed) setFollowers(prev => prev + 1)
        }
    }, [isFollowed])

    return (
        <div className="lg:w-[85%]">
            {user === null ? 
                <div className="mt-5">
                    <p className="font-light text-center text-md text-neutral-200">Data Error, check your internet connection...</p>
                </div> 
                :
                <div className="w-full">
                    <div className="text-white flex flex-col gap-5 md:gap-10 px-5 sm:px-15 md:px-15 lg:px-30 pt-10 w-full">
                        <div className="flex gap-5 md:gap-15 w-full items-center">
                            <div className="relative shrink-0 w-30 h-30 md:w-40 md:h-40">
                                <img src={`${user.userData.photo}`} alt="" className="w-30 h-30 md:w-40 md:h-40 rounded-full border-none object-cover"/>
                                <motion.div className="absolute bottom-0 left-28 bg-neutral-100 w-11 h-11 rounded-full flex justify-center items-center"
                                    whileTap={{
                                        scale: 0.90
                                    }}
                                    onClick={() => setIsFollowed(!isFollowed)}
                                >
                                    {!isFollowed ? <motion.div key="plus" initial={{ rotate: 180 }} animate={{ rotate: 0 }}><PlusIcon color="black" size={27} /></motion.div> 
                                    : <motion.div key="check" initial={{ rotate: 180 }} animate={{ rotate: 0 }}><CheckIcon color="black" size={27} /></motion.div>}
                                </motion.div>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <div className="flex justify-between w-full">
                                    <div className="flex flex-col w-full gap-5">
                                        <div className="flex flex-col">
                                            <p className={user.userData.name ? "font-light tracking-wide" : "font-bold text-2xl"}>{user.userData.username}</p>
                                            <p className="font-bold text-2xl">{user.userData.name}</p>
                                        </div>
                                        <div className="hidden sm:flex flex-row gap-7">
                                            <p className="font-light"><span className="font-medium">{user.following} </span>Following</p>
                                            <p className="font-light"><span className="font-medium">{followers} </span>Followers</p>
                                            <p className="font-light"><span className="font-medium">1 </span>Posts</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p>{user.userData.description}</p>
                                        </div>
                                    </div>
                                    <Button className="md:hidden fixed bottom-10 right-10 h-13 w-13 rounded-full bg-blue-300">
                                        <FontAwesomeIcon icon={faUserPen} className="text-lg" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:hidden flex-row gap-7">
                            <p className="font-light"><span className="font-medium">{user.following} </span>Following</p>
                            <p className="font-light"><span className="font-medium">{followers} </span>Followers</p>
                            <p className="font-light"><span className="font-medium">1 </span>Posts</p>
                        </div>
                        <div className="md:hidden">
                            <p>{user.userData.description}</p>
                        </div>
                        <div className="border-t-1 h-100 bg-[#191d23]"></div>
                    </div>
                </div>}
        </div>
    )
}



export default OtherProfile