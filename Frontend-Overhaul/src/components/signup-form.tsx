import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Link } from "react-router-dom"

const SignupForm = () => {
    const signupFormSchema = z.object({
        username: z.string().min(6).max(50),
        email: z.email(),
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

    const onSubmit = (values: z.infer<typeof signupFormSchema>) => {
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
                    <Button type="submit" className="text-lg h-10 mb-2">Signup</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignupForm