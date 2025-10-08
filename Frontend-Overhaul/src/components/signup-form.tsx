import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Link } from "react-router-dom"
import axios, { isAxiosError } from "axios"
import { useState } from "react"
import { motion } from "motion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons"
import ApiUrl from "@/lib/api"

interface signupFormInterface {
    setIsSignedUp: (boolean: boolean) => void
}

const SignupForm = ({ setIsSignedUp }: signupFormInterface) => {
    const [ isNetworkError, setIsNetworkError ] = useState<boolean>(false)
    const [ isUsernameUnique, setIsUsernameUnique ] = useState<boolean>(false)
    const [ isUsernameQuestionable, setIsUsernameQuestionable ] = useState<boolean>(false)
    const [ isEmailUnique, setIsEmailUnique ] = useState<boolean>(false)


    const signupFormSchema = z.object({
        username: z.string().min(6).max(100).lowercase().regex(/^[a-z0-9_-]+$/),
        email: z.email().max(100),
        password: z.string().min(8).max(50)
    })

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    }) 

    const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
        try {
            const res = await axios.post(`${ApiUrl}/api/user`, {
                username: values.username,
                email: values.email,
                password: values.password
            })
            const data = await res.data
            console.log(data)
            if (data.status === "ok") {
                setIsSignedUp(true)
            }
        } catch(err) {
            if(isAxiosError(err)) {
                console.log(err.code)
                const data = err.response?.data.errors
                if(data?.username) {
                    const errors = data.username
                    if(errors.includes("unique")) {
                        setIsUsernameUnique(true)
                    } else {
                        setIsUsernameQuestionable(true)
                    }
                }
                if(data?.email) {
                    const errors = data.email
                    if(errors.includes("unique")) {
                        setIsEmailUnique(true)
                    }
                }
                if(err.code === "ERR_NETWORK") setIsNetworkError(true)
            }
        }
    }

    const resetError = () => {
        setIsNetworkError(false)
        setIsUsernameUnique(false)
        setIsUsernameQuestionable(false)
        setIsEmailUnique(false)
    }

    return (
        <div className="h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => {resetError(), onSubmit(data)})} className="flex flex-col h-full gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-[18px]">Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10"/>
                                            </FormControl>
                                            <FormDescription>This is your public display name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="text-[18px]">Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10"/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel className="text-[18px]">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} className="h-10"/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-2">
                                <Checkbox
                                    required
                                    id="tos"
                                />
                                <Label>I am above 13 years old</Label>
                            </div>
                            <div className="flex gap-2">
                                <Checkbox
                                    required
                                    id="tos"
                                />
                                <Label>
                                    I accept the
                                    <Link to={""} className="underline underline-offset-1">Terms and Condition</Link>
                                </Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Button type="submit" className="text-lg h-10 mb-2">Signup</Button>

                        { isNetworkError ? 
                            <motion.div 
                                className="flex gap-1 items-center justify-end"
                                initial = {{
                                    opacity: 0,
                                    y: -3,
                                    filter: "blur(5px)"
                                }}
                                animate = {{
                                    opacity: 100,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                        >
                            <FontAwesomeIcon icon={faTriangleExclamation} className="opacity-70" />
                            <FormDescription className="mx-1 font-medium text-md">Internal Server Error</FormDescription>
                        </motion.div> : null }

                        { isUsernameUnique ? 
                            <motion.div 
                                className="flex gap-1 items-center justify-end"
                                initial = {{
                                    opacity: 0,
                                    y: -3,
                                    filter: "blur(5px)"
                                }}
                                animate = {{
                                    opacity: 100,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                        >
                            <FontAwesomeIcon icon={faXmark} className="opacity-70" />
                            <FormDescription className="mx-1 font-medium text-md">The username has been taken</FormDescription>
                        </motion.div> : null }

                        { isUsernameQuestionable ? 
                            <motion.div 
                                className="flex gap-1 items-center justify-end"
                                initial = {{
                                    opacity: 0,
                                    y: -3,
                                    filter: "blur(5px)"
                                }}
                                animate = {{
                                    opacity: 100,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                        >
                            <FontAwesomeIcon icon={faXmark} className="opacity-70" />
                            <FormDescription className="mx-1 font-medium text-md">Username Error</FormDescription>
                        </motion.div> : null }

                        { isEmailUnique ? 
                            <motion.div 
                                className="flex gap-1 items-center justify-end"
                                initial = {{
                                    opacity: 0,
                                    y: -3,
                                    filter: "blur(5px)"
                                }}
                                animate = {{
                                    opacity: 100,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: {
                                        duration: 0.2
                                    }
                                }}
                        >
                            <FontAwesomeIcon icon={faXmark} className="opacity-70" />
                            <FormDescription className="mx-1 font-medium text-md">The email has been taken</FormDescription>
                        </motion.div> : null }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SignupForm