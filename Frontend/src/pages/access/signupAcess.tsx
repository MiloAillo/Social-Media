import axios from "axios"
import { useRef, useState } from "react"

function SignupAccess() {
    // input value
    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordCheckRef = useRef<HTMLInputElement>(null)
    const [password, setPassword] = useState<any>("")

    // check if password doesnt match with the second input
    const [isCheckNotMatch, setIsCheckNotMatch] = useState<boolean>(false)

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

    const signup = async (): Promise<void> => {
        try {
            if (guard() === false) return

            const res = await axios.post('/', {
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                passwordRef: password
            })
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="w-full flex flex-col bg-[#393E46] rounded-lg p-3 gap-10">
            <div className="flex gap-3 flex-col">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-[#EEEEEE] font-[Inter]">Username</label>
                    <input ref={usernameRef} type="text" name="username" id="username" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-[#EEEEEE] font-[Inter]">Email</label>
                    <input ref={emailRef} type="email" name="email" id="email" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[#EEEEEE] font-[Inter]">Password</label>
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" name="password" id="password" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className={`${password ? "" : "hidden" } flex flex-col gap-1`}>
                    <label htmlFor="passwordCheck" className="text-[#EEEEEE] font-[Inter]">Type your password again</label>
                    <input ref={passwordCheckRef} onChange={() => setIsCheckNotMatch(false)} type="password" name="passwordCheck" id="passwordCheck" className={`w-full h-10 border-2 rounded-md p-2 text-white ${isCheckNotMatch ? "border-[#ff0000]" : "border-[#EEEEEE]"}`} />
                    {isCheckNotMatch ? <p className="text-[#ff0000]">doesn't match..</p> : null}
                </div>
            </div>
            <button onClick={signup} className="w-full h-11 bg-[#D65A31] rounded-md font-[Inter] font-bold text-white">Sign Up</button>
        </div>
    )
}

export default SignupAccess