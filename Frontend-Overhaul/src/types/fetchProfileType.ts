type userData = {
    description: string
    id: number
    name: string
    photo: string
    username: string
}

type images = string[] | null

type kontenData = {
    comments_count: number
    created_at: string
    id: number
    images: images
    likes_count: number
    short_content: string
    tittle: string
}

type konten = kontenData[]

type fetchedProfile = {
    follower: number
    following: number
    konten: konten
    userData: userData
}

export type { fetchedProfile }