import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import axios, { isAxiosError } from "axios"
import ApiUrl from "@/lib/api"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "motion/react"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

const SigninForm = () => {
    const [ isDataRejected, setIsDataRejected ] = useState<boolean>()

    const signinFormSchema = z.object({
        email: z.email(),
        password: z.string().min(8).max(50)
    })

    const form = useForm<z.infer<typeof signinFormSchema>>({
        resolver: zodResolver(signinFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    }) 

    const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
        try {
            const res = await axios.post(`${ApiUrl}/api/login`, {
                email: values.email,
                password: values.password
            })
            console.log(res)
            const data = await res.data
            window.localStorage.setItem("Authorization", res.data.token)
            if (data.status === 'ok') window.location.href = "/app"
        } catch(err) {
            if (isAxiosError(err)) {              
                if (err.response?.status === 401) {
                    setIsDataRejected(true)
                } else {
                    console.log("unknown error")
                }
            }
        }
    }

    const resetError = () => {
        setIsDataRejected(false)
    }

    return (
        <div className="h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => {onSubmit(data); resetError()})} className="flex flex-col h-full gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
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
                    </div>
                    <div className="flex flex-col">
                        <Button type="submit" className="text-lg h-10 mb-2">Sign In</Button>
                        
                        { isDataRejected ? 
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
                            <FormDescription className="mx-1 font-medium text-md">Email or password is wrong</FormDescription>
                        </motion.div> : null }
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SigninForm