import type { fetchPostType } from "@/types/fetchPostType"
import { useLoaderData } from "react-router-dom"

function Home() {
    const posts = useLoaderData() as fetchPostType

    console.log(posts)

    const fetchError = (
        <div className="">
            <p className="font-light text-center text-md text-neutral-200">Cannot fetch data, try again later...</p>
            <p className="font-extralight text-center text-sm text-neutral-300">{`(${posts.status === "error" ? String(posts.response) : "unknown"})`}</p>
        </div>
    )

    const fetchedUI = (
        <div>
            {posts.status === "ok" ? posts[0].map((post) => (
                <div className="w-full">
                    <div className="flex flex-row items-center gap-2 md:gap-3 border-b-1 p-2 w-full">
                        <img src={`${post.pengguna.photo}`} alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                        <p className="font-medium text-md sm:text-lg tracking-wide">{post.pengguna.username}</p>
                    </div>
                    <div className="py-5 flex flex-col gap-2 md:mb-4">
                        <div className="flex flex-wrap w-full h-30 md:h-45 overflow-y-hidden">
                            <div className="flex-1 w-full"><img src="1.jpg" alt="" className="w-full h-full"/></div>
                            <div className="flex-1 w-full"><img src="2.jpg" alt="" className="w-full h-full"/></div>
                            <div className="flex-1 w-full"><img src="3.png" alt="" className="w-full h-full"/></div>
                        </div>
                        <p className="font-light text-md md:text-lg">{post.short_content}</p> 
                        {/* IM DONE FOR NOW, NEXT IS ADDING TITTLE AND STUFF SO IT MATCH THE BACKEND RESPONSE */}
                    </div>
                </div>
            )) : null}
        </div>
    )

    return (
        <div className="w-full flex flex-col px-5 sm:px-10 md:px-20 lg:px-0 lg:max-w-180 pt-5 md:pt-10 font-[Inter] text-white">
            <div>
                {posts.status === "ok" ? fetchedUI : fetchError}
            </div>
            {/* <div className="w-full">
                <div className="flex flex-row items-center gap-2 md:gap-3 border-b-1 p-2 w-full">
                    <img src="b746825c62fd607b823b9875dc5e1fbf.jpg" alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                    <p className="font-medium text-md sm:text-lg tracking-wide">mischikomoee</p>
                </div>
                <div className="py-5 flex flex-col gap-2 md:mb-4">
                    <div className="flex flex-wrap w-full h-30 md:h-45 overflow-y-hidden">
                        <div className="flex-1 w-full"><img src="1.jpg" alt="" className="w-full h-full"/></div>
                        <div className="flex-1 w-full"><img src="2.jpg" alt="" className="w-full h-full"/></div>
                        <div className="flex-1 w-full"><img src="3.png" alt="" className="w-full h-full"/></div>
                    </div>
                    <p className="font-light text-md md:text-lg">Hiii!! this is my first post in this Sosmed App, and i would like to know whats more to explore here hihi</p>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-row items-center gap-2 md:gap-3 border-b-1 p-2 w-full">
                    <img src="b746825c62fd607b823b9875dc5e1fbf.jpg" alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                    <p className="font-medium text-md sm:text-lg tracking-wide">mischikomoee</p>
                </div>
                <div className="py-5 flex flex-col gap-2 md:mb-4">
                    <div className="flex flex-wrap w-full h-30 md:h-45 overflow-y-hidden">
                        <div className="flex-1 w-full"><img src="1.jpg" alt="" className="w-full h-full"/></div>
                    </div>
                    <p className="font-light text-md md:text-lg">Hiii!! this is my first post in this Sosmed App, and i would like to know whats more to explore here hihi</p>
                </div>
            </div>
            <div className="w-full">
                <div className="flex flex-row items-center gap-2 md:gap-3 border-b-1 p-2 w-full">
                    <img src="b746825c62fd607b823b9875dc5e1fbf.jpg" alt="" className="rounded-full h10 w-9 md:w-10 bg-white"/>
                    <p className="font-medium text-md sm:text-lg tracking-wide">mischikomoee</p>
                </div>
                <div className="py-5 flex flex-col gap-2 md:mb-4">
                    <div className="flex flex-wrap w-full h-30 md:h-45 overflow-y-hidden">
                        <div className="flex-1 w-full"><img src="1.jpg" alt="" className="w-full h-full"/></div>
                        <div className="flex-1 w-full"><img src="2.jpg" alt="" className="w-full h-full"/></div>
                    </div>
                    <p className="font-light text-md md:text-lg">Hiii!! this is my first post in this Sosmed App, and i would like to know whats more to explore here hihi</p>
                </div>
            </div> */}
        </div>
    )
}

export default Home