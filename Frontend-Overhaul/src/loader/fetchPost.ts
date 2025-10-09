import ApiUrl from "@/lib/api"
import type { fetchPostType } from "@/types/fetchPostType"
import axios from "axios"

const fetchPost = async (): Promise<fetchPostType> => {
    const token = window.localStorage.getItem("Authorization")
    try {
        const res = await axios.get(`${ApiUrl}/api/post`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.data
        return data
    } catch(err) {
        console.error(err)
        return {
            "status": "error",
            "response": err
        }
    }
}

export default fetchPost