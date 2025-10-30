import { useState } from "react"
import LoginAccess from "./loginAcess"
import SignupAccess from "./signupAcess"

function AccessPage() {
    const [select, setSelect] = useState<string>("login")
    const changeSelect = (state: string): void => {
        if(state === "signup") setSelect("signup")
        if(state === "login") setSelect("login")
    }

    return (
        <div className="bg-[#222831] w-screen h-screen flex items-center justify-center">
            <div className="w-150 flex flex-col gap-5">
                <div className="bg-[#393E46] flex flex-row gap-4 p-3 w-full h-18 rounded-lg">
                    <div onClick={() => {changeSelect("login")}} className={`flex-1 text-center flex items-center justify-center font-[Inter] font-bold rounded-md ${select === "login" ? "bg-[#D65A31] text-[#EEEEEE]" : "border-2 border-[#D65A31] text-[#D65A31]"}`}>Sign In</div>
                    <div onClick={() => {changeSelect("signup")}} className={`flex-1 text-center flex items-center justify-center font-[Inter] font-bold rounded-md  ${select === "signup" ? "bg-[#D65A31] text-[#EEEEEE]" : "border-2 border-[#D65A31] text-[#D65A31]"}`}>Sign Up</div>
                </div>
                {select === "login" ? <LoginAccess /> : <SignupAccess />}
            </div>
        </div>
    )
}

export default AccessPage