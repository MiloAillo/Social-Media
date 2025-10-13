type userData = {
    description: string
    id: number
    name: string
    photo: string
    username: string
}

type konten = [unknown]

type fetchedOtherProfile = {
    follower: number
    following: number
    isFollowing: boolean
    konten: konten
    userData: userData
}

export type { fetchedOtherProfile }