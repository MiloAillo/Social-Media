type Pengguna = {
  id: number
  photo: string
  username: string
}

type Post = {
  id: number
  tittle: string
  short_content: string
  likes_count: number
  comments_count: number
  created_at: string
  images: string[] | null
  pengguna: Pengguna
}

type LoaderSuccess = {
  0: Post[]
  status: "ok"
}

type LoaderError = {
    status: "error",
    response: unknown
}

type fetchPostType = LoaderSuccess | LoaderError

export type { fetchPostType }