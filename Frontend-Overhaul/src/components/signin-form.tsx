import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const SigninForm = () => {
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

    const onSubmit = (values: z.infer<typeof signinFormSchema>) => {
        console.log(values)
    }

    return (
        <div className="h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-10">
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
                    <Button type="submit" className="text-lg h-10 mb-2">Sign In</Button>
                </form>
            </Form>
        </div>
    )
}

export default SigninForm