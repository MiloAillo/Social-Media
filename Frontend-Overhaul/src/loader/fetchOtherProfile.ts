import ApiUrl from "@/lib/api"
import type { fetchedProfile } from "@/types/fetchProfileType"
import axios, { isAxiosError } from "axios"
import { redirect, type LoaderFunctionArgs } from "react-router-dom"

const fetchOtherProfile = async ({ params }: LoaderFunctionArgs): Promise<fetchedProfile | Response | null> => {
    const id = params.id
    const token = window.localStorage.getItem("Authorization")

    try {
        const res = await axios.get(`${ApiUrl}/api/check`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.data
        console.log(data.user.id, id)
        if (data.user.id == id) {
            return redirect("/app/profile")
        }
    } catch(err) {
        if(isAxiosError(err)) {
            if(err.status === 401) {
                return redirect("/signup")
            }
        }
    }

    try {
        const res = await axios.post(`${ApiUrl}/api/getProfile`, { userId: id }, { headers: {Authorization: `Bearer ${token}`} })
        const data = await res.data
        console.log(data)

        return data as fetchedProfile
    } catch(err) {
        console.log(err)
        if (isAxiosError(err)) {
            if(err.status === 400) {
                return redirect("/app")
            }
        }
        return null
    }
}

export default fetchOtherProfile