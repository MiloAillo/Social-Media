import { ModeToggle } from "@/components/mode-toggle"
import SignupForm from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <main className="flex items-center justify-center w-screen min-h-screen">
            <div className="flex justify-center items-stretch">
                <div className="bg-neutral-300 dark:bg-neutral-600 w-80 md:w-100 lg:w-130 rounded-l-xl p-5">
                    <div>
                        <ModeToggle />
                    </div>
                </div>
                <Card className="w-80 md:w-100 lg:w-130 flex flex-col gap-6 rounded-l-none">
                    <CardHeader className="text-center">
                        <CardTitle className="text-[28px]">Signup</CardTitle>
                        <CardDescription className="text-md">Already have an account?
                            <Link to={""} className="underline underline-offset-2">Login</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SignupForm />
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}

export default Signup