import { ModeToggle } from "@/components/mode-toggle"
import SigninForm from "@/components/signin-form"
import SignupForm from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import img from "../../assets/animeChatting.jpg"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Signup = () => {
    const [ showSignup, setShowSignup ] = useState<boolean>(false)
    const [ isSignedUp, setIsSignedup ] = useState<boolean>(false)
    const [ redirectInterval, setRedirectInterval ] = useState<number>(5)

    const changeCardState = (): void => {
        setShowSignup(prev => !prev)
    }

    useEffect(() => {
        setInterval(() => {
            setRedirectInterval(prev => prev - 1)
        }, 1000)
    }, [])

    useEffect(() => {
        setRedirectInterval(5)
        if(isSignedUp) {
            setTimeout(() => {
                setIsSignedup(false)
                setShowSignup(false)
            }, 6255)
        }
    }, [isSignedUp])

    const stuckHelper = () => {
        setIsSignedup(false)
        setShowSignup(false)
    }

    return (
        <main className="flex flex-col gap-15 items-center w-full justify-center min-h-screen p-5">
            {/* ==[Fixed Background]== */}
            <motion.div 
                className="fixed z-0"
                initial={{ opacity: 0 }} 
                animate={{
                    opacity: 100,
                    transition: { duration: 3 }
                 }} 
            >
                <div className="opacity-50 md:opacity-75 lg:opacity-100 rounded-full w-200 h-200 bg-zinc-200 dark:bg-gray-600 blur-[2000px]" />
            </motion.div>
            {/* ==[Main Container]== */}
            <div className="z-1 flex flex-col gap-15">
                {/* ==[Signup Theme Mode Toggle]== */}
                <div className="md:hidden z-10 fixed right-3 bottom-3">
                    <ModeToggle />
                </div>
                {/* Logo + Description */}
                <motion.div 
                    className="flex flex-col justify-center w-full text-center gap-1"
                    initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(5px)"
                    }}
                    animate={{
                        opacity: 100,
                        y: 0,
                        filter: "blur(0px)" ,
                        transition: { 
                            duration: 1,
                            delay: 0.2    
                        }
                    }}
                    layout
                >
                    <h1 className="font-bold text-5xl">Social Media</h1>
                    <div className="flex gap-2 text-center w-full justify-center text-neutral-400 text-md font-light tracking-wide">
                        <p>create</p>
                        <p>{">"}</p>
                        <p>connect</p>
                        <p>{">"}</p>
                        <p>communicate</p>
                    </div>
                </motion.div>

                {/* ==[Main Card]== */}
                <motion.div 
                    className={`flex justify-center items-stretch`}
                    initial={{
                        opacity: 0,
                        y: 20,
                        filter: "blur(5px)"
                    }}
                    animate={{
                        opacity: 100,
                        y: 0,
                        filter: "blur(0px)" ,
                        transition: { 
                            duration: 1,
                            delay: 0.8
                        },
                    }}
                    layout
                >
                    {/* Filler Section */}
                    <div style={{
                        backgroundImage: `url(${img})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                        }} 
                        className={`rounded-l-xl p-5 ${isSignedUp ? "hidden" : "hidden md:block w-80 md:w-100 lg:w-130"}`}
                    >
                        <div>
                            <ModeToggle />
                        </div>
                    </div>
                    {/* Signup Card */}
                    <Card className={`w-80 md:w-100 lg:w-130 flex-col gap-6 md:rounded-l-none ${!isSignedUp ? showSignup ? "flex" : "hidden" : "hidden"} `}>
                        <CardHeader className="text-center">
                            <CardTitle className="text-[28px]">Sign Up</CardTitle>
                            <CardDescription className="text-md">Already have an account?
                                <span> </span>
                                <span onClick={changeCardState} className="underline underline-offset-2">Sign In</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignupForm setIsSignedUp={setIsSignedup} />
                        </CardContent>
                    </Card>
                    {/* Signin Card */}
                    <Card className={`w-80 md:w-100 lg:w-130 flex-col gap-6 md:rounded-l-none  ${!isSignedUp ? showSignup ? "hidden" : "flex" : "hidden"}`}>
                        <CardHeader className="text-center">
                            <CardTitle className="text-[28px]">Sign In</CardTitle>
                            <CardDescription className="text-md">Dont have an account?
                                <span> </span>
                                <span onClick={changeCardState} className="underline underline-offset-2">Sign Up</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SigninForm />
                        </CardContent>
                    </Card>
                    {/*  */}
                    <Card
                        className={`p-7 flex flex-col gap-8 items-center text-center justify-center ${isSignedUp ? "flex" : "hidden"}`}
                    >
                        <CardTitle className="text-[28px]">We're able to sign you up</CardTitle>
                        <FontAwesomeIcon icon={faCircleCheck} size="6x"/>
                        <div className="flex flex-col items-center text-center">
                            <CardDescription className="text-md">
                                {redirectInterval > 0 ? <p>Getting you back to sign up page in {redirectInterval} seconds.</p> : <p>redirecting...</p>}
                            </CardDescription>
                            <CardDescription className="font-medium">stuck? <span className="underline underline-offset-1" onClick={stuckHelper}>press here</span></CardDescription>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    )
}

export default Signup