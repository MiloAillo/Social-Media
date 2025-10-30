import axios from "axios"
import { useEffect, useRef, useState } from "react"

function SignupAccess() {
    // input value
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordCheckRef = useRef<HTMLInputElement>(null)
    const [password, setPassword] = useState<any>("")

    // check if password doesnt match with the second input
    const [isCheckNotMatch, setIsCheckNotMatch] = useState<boolean>(false)

    // warning state
    const [isInternalErr, setIsInternalErr] = useState<boolean>(false)
    const [isUnprocessed, setIsUnprocessed] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const guard = (): boolean => {
        // check if all the input is filled
        if (!emailRef.current?.value || !password || !usernameRef.current?.value || !passwordCheckRef.current?.value) return false 
        //check if the password and the second password match
        if (password !== passwordCheckRef.current?.value) {
            setIsCheckNotMatch(true)
            return false           
        }
        return true
    }

    const removeWarning = () => {
        setIsInternalErr(false)
        setIsUnprocessed(false)
        setIsSuccess(false)
    }

    const signup = async (): Promise<void> => {
        try {
            if (guard() === false) return
            const res = await axios.post('http://127.0.0.1:8000/api/user', {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                password: password
            })
            const data = await res.data
            console.log(data)
            
            if(data.status === "ok") {
                setIsSuccess(true)
            }
        } catch(err: unknown) {
            if(axios.isAxiosError(err)) {
                console.log(err)
                if(err.response?.status === 422) {
                    setIsUnprocessed(true)
                } else {
                    setIsInternalErr(true)
                }
            }
        }
    }

    return (
        <div className="w-full flex flex-col bg-[#393E46] rounded-lg p-3 gap-10">
            <div className="flex gap-3 flex-col">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#EEEEEE] font-[Inter]">Username</label>
                    <input onChange={removeWarning} ref={usernameRef} type="text" name="username" id="username" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-[#EEEEEE] font-[Inter]">Email</label>
                    <input onChange={removeWarning} ref={emailRef} type="email" name="email" id="email" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[#EEEEEE] font-[Inter]">Password</label>
                    <input value={password} onChange={(e) => {setPassword(e.target.value); removeWarning}} type="password" name="password" id="password" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className={`${password ? "" : "hidden" } flex flex-col gap-1`}>
                    <label htmlFor="passwordCheck" className="text-[#EEEEEE] font-[Inter]">Type your password again</label>
                    <input ref={passwordCheckRef} onChange={() => {setIsCheckNotMatch(false); removeWarning}} type="password" name="passwordCheck" id="passwordCheck" className={`w-full h-10 border-2 rounded-md p-2 text-white ${isCheckNotMatch ? "border-[#ff0000]" : "border-[#EEEEEE]"}`} />
                    {isCheckNotMatch ? <p className="text-[#ff0000]">doesn't match..</p> : null}
                </div>
            </div>
            <div>
                {isInternalErr ? <p className="text-[#ff0000]">Internal server error...</p> : null}
                {isUnprocessed ? <p className="text-[#ff0000]">Data cannot be processed...</p> : null}
                {isSuccess ? <p className="text-[#00ff2f]">Successfully signing you up! Please log in with your credential.</p> : null}
                <button onClick={signup} className="w-full h-11 bg-[#D65A31] rounded-md font-[Inter] font-bold text-white">Sign Up</button>
            </div>
        </div>
    )
}

export default SignupAccess