import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

type postData = {
    likes_count: number
    comments_count: number
    likePost: (id: number) => void
    // userLiked: boolean
    // ==[same as the followers, you need to add boolean stating the user has like or not, so the calculation not always assumed that the user never like the post before]==
}

const ContentStatistics = ({ likes_count, comments_count }: postData) => {
    const [isLiked, setIsLiked]= useState<boolean>(false)
    const [likes, setLikes] = useState<number>(0)
    const [comments, setComments] = useState<number>(0)

    useEffect(() => {
        setLikes(likes_count)
        setComments(comments_count)
    }, [])

    const likePostUI = () => {setLikes(prev => prev+ 1); setIsLiked(true)}

    const unlikePostUI = () => {setLikes(prev => prev - 1); setIsLiked(false)}

    return (
        <div className="select-none flex flex-row gap-5 pt-1 px-4 pb-4 sm:py-4">
            <div className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon={faHeart} className="text-xl sm:text-[27px]" onClick={isLiked ? unlikePostUI : likePostUI} />
                <p className="font-bold text-md sm:text-lg">{likes}</p>
            </div>
            <div className="flex justify-between w-full items-center">
                <div className="flex justify-center items-center gap-1">
                    <FontAwesomeIcon icon={faComment} className="text-xl sm:text-[27px]" />
                    <p className="font-bold text-md sm:text-lg">{comments}</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBars} className="text-xl sm:text-[27px]" />
                </div>
            </div>
        </div>
    )
}

export default ContentStatistics