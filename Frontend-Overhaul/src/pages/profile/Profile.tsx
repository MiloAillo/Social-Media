import { Button } from "@/components/ui/button"
import type { fetchedProfile } from "@/types/fetchProfileType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faUserPen } from "@fortawesome/free-solid-svg-icons"

function Profile() {
    const user = useLoaderData() as fetchedProfile

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
                            <div className="shrink-0 w-30 h-30 md:w-40 md:h-40">
                                <img src={`${user.userData.photo}`} alt="" className="w-30 h-30 md:w-40 md:h-40 rounded-full border-none object-cover"/>
                                <Button className="absolute hidden md:block translate-x-[28px] translate-y-[-30px] bg-blue-300">Edit Profile</Button>
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
                                            <p className="font-light"><span className="font-medium">{user.following} </span>Followers</p>
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
                            <p className="font-light"><span className="font-medium">{user.follower} </span>Followers</p>
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



export default Profile