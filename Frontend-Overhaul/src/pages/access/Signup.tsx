import { ModeToggle } from "@/components/mode-toggle"
import SignupForm from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <main className="flex flex-col gap-15 items-center justify-center w-screen min-h-screen p-5">
            <div className="opacity-50 md:opacity-75 lg:opacity-100 rounded-full w-200 h-200 bg-zinc-200 dark:bg-gray-600 fixed z-0 blur-[2000px]"></div>
            <div className="z-1 flex flex-col gap-15">
                <div className="md:hidden fixed right-3 bottom-3">
                    <ModeToggle />
                </div>
                <section className="flex flex-col justify-center w-full text-center gap-1">
                    <h1 className="font-bold text-5xl">Social Media</h1>
                    <div className="flex gap-2 text-center w-full justify-center text-neutral-400 text-md font-light tracking-wide">
                        <p>create</p>
                        <p>{">"}</p>
                        <p>connect</p>
                        <p>{">"}</p>
                        <p>communicate</p>
                    </div>
                </section>
                <section className="flex justify-center items-stretch">
                    <div className="bg-neutral-300 hidden md:block dark:bg-neutral-600 w-80 md:w-100 lg:w-130 rounded-l-xl p-5">
                        <div>
                            <ModeToggle />
                        </div>
                    </div>
                    <Card className="w-80 md:w-100 lg:w-130 flex flex-col gap-6 md:rounded-l-none ">
                        <CardHeader className="text-center">
                            <CardTitle className="text-[28px]">Signup</CardTitle>
                            <CardDescription className="text-md">Already have an account?
                                <span> </span>
                                <Link to={""} className="underline underline-offset-2">Login</Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SignupForm />
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    )
}

export default Signup