import axios from "axios"
import { useRef, useState } from "react"

function LoginAccess() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [isDataWrong, setIsDataWrong] = useState<boolean>(false)

    const login = async (): Promise<void> => {
        try {
            if (!emailRef.current?.value || !passwordRef.current?.value) return
            const res = await axios.post('/', {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            console.log(res)
        } catch(err) {
            console.log(err)
            setIsDataWrong(true)
        }
    }
    
    return (
        <div className="w-full flex flex-col bg-[#393E46] rounded-lg p-3 gap-10">
            <div className="flex gap-3 flex-col">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-[#EEEEEE] font-[Inter]">Email</label>
                    <input ref={emailRef} onChange={() => setIsDataWrong(false)} type="email" name="email" id="email" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-[#EEEEEE] font-[Inter]">Password</label>
                    <input ref={passwordRef} onChange={() => setIsDataWrong(false)} type="password" name="password" id="password" className="w-full h-10 border-2 border-[#EEEEEE] rounded-md p-2 text-white" />
                    {isDataWrong ? <p className="text-[#ff0000]">Email or password is wrong...</p> : null}
                </div>
            </div>
            <button onClick={login} className="w-full h-11 bg-[#D65A31] rounded-md font-[Inter] font-bold text-white">Sign In</button>
        </div>
    )
}

export default LoginAccess