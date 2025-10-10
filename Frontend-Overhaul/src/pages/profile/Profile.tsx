import type { fetchedProfile } from "@/types/fetchProfileType"
import { useLoaderData } from "react-router-dom"

function Profile() {
    const user = useLoaderData() as fetchedProfile

    return (
        <div>
            <div className="text-white flex flex-col gap-5 md:gap-10 px-5 sm:px-15 md:px-15 lg:px-30 pt-10">
                <div className="flex gap-5 md:gap-15 w-full items-center">
                    <img src="b746825c62fd607b823b9875dc5e1fbf.jpg" alt="" className="bg-white w-30 h-30 md:w-40 md:h-40 rounded-full border-none"/>
                    <div className="flex flex-row justify-between w-full">
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
        </div>
    )
}

export default Profile