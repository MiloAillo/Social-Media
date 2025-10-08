import ApiUrl from "@/lib/api"
import axios, { isAxiosError } from "axios"
import { redirect } from "react-router-dom"

const checkAuth = async () => {
    const token = window.localStorage.getItem("Authorization")
    try {
        const res = await axios.get(`${ApiUrl}/api/check`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.data
        console.log(data.user)
        if (data.status === "success") return data.user
    } catch(err) {
        if(isAxiosError(err)) {
            if(err.status === 401) {
                return redirect("/signup")
            }
        }
    }
}

export default checkAuth