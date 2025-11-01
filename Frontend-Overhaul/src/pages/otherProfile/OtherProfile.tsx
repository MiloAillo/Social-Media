import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faHeartCrack, faUser, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { motion } from "motion/react"
import { CheckIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { fetchedOtherProfile } from "@/types/fetchOtherProfileType"
import ContentStatistics from "@/components/content-statistics"

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

    const likePost = async (id: number) => {
        console.log(id)
    }

    return (
        <div className="lg:w-[85%] sm:px-5">
            {user === null ? 
                <div className="mt-5">
                    <p className="font-light text-center text-md text-neutral-200">Data Error, check your internet connection...</p>
                </div> 
                :
                <div className="w-full">
                    <div className="text-white flex flex-col gap-5 md:gap-10 pt-10 w-full border-x-2">
                        <div className="flex gap-5 md:gap-15 px-10 w-full items-center">
                            <div className="relative shrink-0 w-30 h-30 md:w-40 md:h-40">
                                {user.userData.photo 
                                    ? <img src={`${user.userData.photo}`} alt="" className="w-30 h-30 md:w-40 md:h-40 rounded-full border-none object-cover"/>
                                    : <div className="flex justify-center items-center w-30 h-30 md:w-40 md:h-40 bg-neutral-400 rounded-full border-none object-cover">
                                        <FontAwesomeIcon icon={faUser} className="text-6xl md:text-7xl" />
                                    </div>
                                }
                                <motion.div className="absolute bottom-0 left-21 h-9 w-9 md:bottom-0 md:left-28 bg-neutral-100 md:w-11 md:h-11 rounded-full flex justify-center items-center"
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
                                </div>
                            </div>
                        </div>
                        <div className="flex sm:hidden px-4 flex-row gap-7">
                            <p className="font-light"><span className="font-medium">{user.following} </span>Following</p>
                            <p className="font-light"><span className="font-medium">{followers} </span>Followers</p>
                            <p className="font-light"><span className="font-medium">1 </span>Posts</p>
                        </div>
                        <div className="md:hidden px-4">
                            <p>{user.userData.description}</p>
                        </div>


                        <div className="border-t-2 h-full">
                            {user.konten.length > 0  ? user.konten.map((konten) => (
                                <div className="w-full">
                                    <div className="flex flex-row items-center gap-2 md:gap-3 p-4 w-full pb-3">
                                        <img src={`${user.userData.photo}`} alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                                        <div>
                                            <p className="font-medium text-md sm:text-lg tracking-wide">{user.userData.username}</p>
                                            <p className="font-light text-sm sm:text-md text-neutral-400">{konten.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="py-2 flex flex-col gap-2">
                                        {konten.images && (
                                            <div>
                                                <div className="w-full hidden sm:flex gap-2 px-2">
                                                {konten.images.map((image, i) => (
                                                    <div
                                                    key={i}
                                                    className={`rounded-md overflow-hidden ${
                                                        konten.images?.length === 1
                                                        ? "w-full h-64"
                                                        : konten.images?.length === 2
                                                        ? "w-[49%] h-60"
                                                        : konten.images?.length ?? 0 >= 3
                                                        ? "w-[32%] h-56"
                                                        : ""
                                                    }`}
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                    />
                                                ))}
                                                </div>
                                                {/* HARDCODED CURRENTLY BECAUSE IDK HOW LMAOAOAO */}
                                                {
                                                    konten.images.length == 3 
                                                    ? (
                                                        <div className="w-full flex px-2 sm:hidden h-56 gap-2">
                                                            <div
                                                            className="rounded-md flex-1 h-full overflow-hidden"
                                                            style={{
                                                                backgroundImage: `url(${konten.images[0]})`,
                                                                backgroundSize: "cover",
                                                                backgroundPosition: "center",
                                                            }}
                                                            />
                                                            <div className="flex-1 flex flex-col gap-2 w-[49%] h-full">
                                                                <div 
                                                                    className="rounded-md h-full overflow-hidden"
                                                                    style={{
                                                                        backgroundImage: `url(${konten.images[1]})`,
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                    }}
                                                                />
                                                                <div 
                                                                    className="rounded-md h-full overflow-hidden"
                                                                    style={{
                                                                        backgroundImage: `url(${konten.images[2]})`,
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                    : (
                                                        <div className="w-full flex sm:hidden gap-2 px-2">
                                                            {konten.images.map((image, i) => (
                                                                <div
                                                                key={i}
                                                                className={`rounded-md overflow-hidden ${
                                                                    konten.images?.length === 1
                                                                    ? "w-full h-64"
                                                                    : konten.images?.length === 2
                                                                    ? "w-[49%] h-60"
                                                                    : konten.images?.length ?? 0 >= 3
                                                                    ? "w-[32%] h-56"
                                                                    : ""
                                                                }`}
                                                                style={{
                                                                    backgroundImage: `url(${image})`,
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                }}
                                                                />
                                                            ))}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )}
                                        <p className="font-bold text-lg md:text-2xl my-1 px-5">{konten.tittle}</p>
                                        <p className="font-light text-md md:text-lg px-5">{konten.short_content}</p>
                                    </div>
                                    <div className="w-full h-fit border-b-2 border-neutral-800 pt-3 sm:pt-0">
                                        <ContentStatistics likes_count={konten.likes_count} comments_count={konten.comments_count} likePost={likePost} />
                                    </div>
                                </div>
                                )) 
                            : 
                                <div className="flex justify-center items-center flex-col h-full gap-3 mt-20">
                                    <FontAwesomeIcon icon={faHeartCrack} className="text-6xl md:text-7xl lg:text-8xl opacity-25" />
                                    <p className="text-lg md:text-2xl text-neutral-500 font-bold px-5 text-center">This user doesn't have a post, yet.</p>
                                </div>
                            }
                                
                        </div>
                    </div>
                </div>}
        </div>
    )
}



export default OtherProfile