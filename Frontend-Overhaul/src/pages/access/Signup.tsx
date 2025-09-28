import SignupForm from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

const Access = () => {
    return (
        <main className="flex flex-row items-center justify-center w-screen min-h-screen gap-5">
            <div className="bg-amber-50 w-80 md:w-100 lg:w-130 h-180"></div>
            <Card className="w-80 md:w-100 lg:w-130 h-fit flex flex-col gap-6">
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
        </main>
    )
}

export default Access