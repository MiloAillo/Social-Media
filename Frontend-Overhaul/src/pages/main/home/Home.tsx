import type { fetchPostType } from "@/types/fetchPostType"
import { useLoaderData } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons"
// import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons"
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons"
import ContentStatistics from "@/components/content-statistics"

function Home() {
    const posts = useLoaderData() as fetchPostType

    const likePost = async (id: number) => {
        console.log(id)
    }

    const unlikePost = async (id: number) => {
        console.log(id)
    }

    const fetchError = (
        <div className="">
            <p className="font-light text-center text-md text-neutral-200">Cannot fetch data, try again later...</p>
            <p className="font-extralight text-center text-sm text-neutral-300">{`(${posts.status === "error" ? String(posts.response) : "unknown"})`}</p>
        </div>
    )

    const fetchedUI = (
        <div className="w-full">
            {posts.status === "ok" ? posts[0].map((post) => (
                <div className="w-full">
                    <div className="flex border-neutral-800 flex-row items-center gap-2 md:gap-3 border-t-2 p-4 w-full pb-3">
                        {post.pengguna.photo 
                            ? <img src={`${post.pengguna.photo}`} alt="" className="rounded-full h-10 w-10 bg-white"/>
                            : <div className="flex justify-center items-center rounded-full h-10 w-10 bg-neutral-400 border-none object-cover">
                                <FontAwesomeIcon icon={faUser} className="text-lg" />
                            </div>
                        }
                        <div>
                            <p className="font-medium text-md sm:text-lg tracking-wide">{post.pengguna.username}</p>
                            <p className="font-light text-sm sm:text-md text-neutral-400">{post.created_at}</p>
                        </div>
                    </div>
                    <div className="py-2 flex flex-col gap-2">
                    {post.images && (
                        <div>
                            <div className="w-full hidden sm:flex gap-2 px-2">
                            {post.images.map((image, i) => (
                                <div
                                key={i}
                                className={`rounded-md overflow-hidden ${
                                    post.images?.length === 1
                                    ? "w-full h-64"
                                    : post.images?.length === 2
                                    ? "w-[49%] h-60"
                                    : post.images?.length ?? 0 >= 3
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
                                post.images.length == 3 
                                ? (
                                    <div className="w-full flex sm:hidden h-56 gap-2">
                                        <div
                                        className="rounded-md flex-1 h-full overflow-hidden"
                                        style={{
                                            backgroundImage: `url(${post.images[0]})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                        />
                                        <div className="flex-1 flex flex-col gap-2 w-[49%] h-full">
                                            <div 
                                                className="rounded-md h-full overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${post.images[1]})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            />
                                            <div 
                                                className="rounded-md h-full overflow-hidden"
                                                style={{
                                                    backgroundImage: `url(${post.images[2]})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            />
                                        </div>
                                    </div>
                                  )
                                : (
                                    <div className="w-full flex sm:hidden gap-2 px-2">
                                        {post.images.map((image, i) => (
                                            <div
                                            key={i}
                                            className={`rounded-md overflow-hidden ${
                                                post.images?.length === 1
                                                ? "w-full h-64"
                                                : post.images?.length === 2
                                                ? "w-[49%] h-60"
                                                : post.images?.length ?? 0 >= 3
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

                    <p className="font-bold text-lg md:text-2xl my-1 px-5">{post.tittle}</p>
                    <p className="font-light text-md md:text-lg px-5">{post.short_content}</p>
                    </div>

                    <ContentStatistics likes_count={post.likes_count} comments_count={post.comments_count} likePost={likePost} />
                </div>
            )) : null}
        </div>
    )

    return (
        <div className="w-full flex flex-col px-5 sm:px-10 md:px-20 lg:px-0 lg:max-w-180 pt-5 md:pt-10 font-[Inter] text-white border-x-2">
            <div>
                {posts.status === "ok" ? fetchedUI : fetchError}
            </div>
        </div>
    )
}

export default Home