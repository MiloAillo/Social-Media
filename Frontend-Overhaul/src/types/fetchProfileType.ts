type userData = {
    description: string
    id: number
    name: string
    photo: string
    username: string
}

type konten = [unknown]

type fetchedProfile = {
    follower: number
    following: number
    konten: konten
    userData: userData
}

export type { fetchedProfile }