type usersSearchedObject = {
    description: string
    id: number
    name: string
    photo: string
    username: string
    follower_count: number
    following_count: number
}

type usersSearchedWrapper = usersSearchedObject[]

export type { usersSearchedWrapper }