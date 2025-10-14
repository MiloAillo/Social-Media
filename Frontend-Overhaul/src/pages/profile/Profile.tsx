import { Button } from "@/components/ui/button"
import type { fetchedProfile } from "@/types/fetchProfileType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faFaceSmile, faHeartCrack, faUserPen } from "@fortawesome/free-solid-svg-icons"
import ContentStatistics from "@/components/content-statistics"

function Profile() {
    const user = useLoaderData() as fetchedProfile

    const likePost = async (id: number) => {
        console.log(id)
    }

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
                                            <p className="font-light"><span className="font-medium">{user.follower} </span>Followers</p>
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
                        <div className="border-t-1 h-full">
                            {user.konten.length > 0 ? user.konten.map((konten) => (
                                <div className="w-full">
                                    {/* <div className="flex flex-row items-center gap-2 md:gap-3 border-b-1 p-2 w-full pb-3">
                                        <img src={`${user.userData.photo}`} alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                                        <div>
                                            <p className="font-medium text-md sm:text-lg tracking-wide">{user.userData.username}</p>
                                            <p className="font-light text-sm sm:text-md text-neutral-400">{konten.created_at}</p>
                                        </div>
                                    </div> */}
                                    <div className="py-2 flex flex-col gap-2">
                                        {konten.images ? <div className="flex flex-wrap w-full h-30 md:h-45 overflow-y-hidden">
                                            {konten.images?.map((image) => { 
                                                return (
                                                <div className="flex-1 w-full"><img src={`${image}`} alt="" className="w-full h-full"/></div>
                                            )})}
                                        </div> : null}
                                        <div>
                                            <p className="text-neutral-400">{konten.created_at}</p>
                                            <p className="font-bold text-lg md:text-2xl my-1">{konten.tittle}</p>
                                        </div>
                                        <p className="font-light text-md md:text-lg">{konten.short_content}</p> 
                                        {/* IM DONE FOR NOW, NEXT IS ADDING TITTLE AND STUFF SO IT MATCH THE BACKEND RESPONSE */}
                                    </div>
                                    <div className="w-full h-fit border-t-1">
                                        <ContentStatistics likes_count={konten.likes_count} comments_count={konten.comments_count} likePost={likePost} />
                                    </div>
                                </div>
                            ))
                            :
                            <div className="flex justify-center items-center flex-col h-full gap-3 mt-20">
                                <FontAwesomeIcon icon={faFaceSmile} className="text-6xl md:text-7xl lg:text-8xl opacity-25" />
                                <p className="text-lg md:text-2xl text-neutral-500 font-bold px-5 text-center">Add your first post!</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>}
        </div>
    )
}



export default Profile