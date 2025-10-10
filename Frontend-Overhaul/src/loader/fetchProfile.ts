import ApiUrl from "@/lib/api"
import type { fetchedProfile } from "@/types/fetchProfileType"
import axios from "axios"

const fetchProfile = async (): Promise<fetchedProfile | null> => {
    const token = window.localStorage.getItem("Authorization")
    try {
        const res = await axios.get(`${ApiUrl}/api/userProfile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.data
        console.log(data)
        return data as fetchedProfile
    } catch(err) {
        console.log(err)
        return null
    }
}

export default fetchProfile