import type { fetchedProfile } from "@/types/fetchProfileType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faCamera } from "@fortawesome/free-regular-svg-icons"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import PhotoEditDialogContent from "@/components/pfp-edit-dialog"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import axios from "axios"
import ApiUrl from "@/lib/api"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const EditProfile = () => {
    const user = useLoaderData() as fetchedProfile

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isChangePhoto, setIsChangePhoto] = useState<boolean>(false)
    const [isRemovePhoto, setIsRemovePhoto] = useState<boolean>(false)
    const [name, setName] = useState<string>(user.userData.name)
    const [username, setUsername] = useState<string>(user.userData.username)
    const [description, setDescription] = useState<string>(user.userData.description)

    useEffect(() => {
        if(!isDialogOpen) {
            setIsChangePhoto(false)
            setIsRemovePhoto(false)
        }
    }, [isDialogOpen])

    const editProfileSchema = z.object({
        name: z.string().min(6).max(100).regex(/^[a-zA-Z ]+$/).optional(),
        username: z.string().min(6).max(100).lowercase().regex(/^[a-z0-9_-]+$/),
        description: z.string().max(150).optional()
    })

    const form = useForm<z.infer<typeof editProfileSchema>>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: user.userData.name,
            username: user.userData.username,
            description: user.userData.description
        }
    }) 


    const editProfile = async (values: z.infer<typeof editProfileSchema>) => {
        console.log(values.name, values.username, values.description) // debugging purposes

        const formData = new FormData() 
        // append conditionally if the data changes
        if(values.name && values.name !== name) {formData.append("name", values.name); setName(values.name)}
        if(values.username && values.username !== username) {formData.append("username", values.username); setUsername(values.username)}
        if(values.description && values.description !== description) {formData.append("description", values.description); setDescription(values.description)}

        try {
            // if nothing change, throw error.
            if(values.name === name && values.username === username && values.description === description) {
                throw new Error("no data provided")
            }

            // Request with the formData
            const res = await axios.post(`${ApiUrl}/api/editprofile`, formData, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("Authorization")}`,
                }
            })
            console.log(res)
        } catch(err) {
            console.error(err)
        } finally {
            // final cleanup before using again
            formData.delete("username")
            formData.delete("name")
            formData.delete("description")
        }
        // !![READ THIS]!! 
        // The basic API Call is done, it need useState for warning and successful request for client.
    }

    return (
        <div className="flex flex-col items-center gap-10 pt-10 w-[85%] sm:w-[90%] md:w-full md:px-20 max-w-[1100px]">
            <Dialog>
                <DialogTrigger
                    onClick={() => setIsDialogOpen(true)}
                >
                    <div className="h-33 w-33 sm:h-35 sm:w-35 md:h-37 md:w-37 lg:h-40 lg:w-40">
                        {user.userData.photo 
                            ? <img src={user.userData.photo} alt={user.userData.username} className="w-full h-full rounded-full" />
                            : <div className="flex justify-center items-center w-full h-full bg-neutral-400 rounded-full border-none object-cover">
                                <FontAwesomeIcon icon={faUser} className="text-6xl md:text-7xl" />
                              </div>
                        }
                        <div className="flex justify-center items-center translate-y-[-8.25rem] sm:translate-y-[-8.75rem] md:translate-y-[-9.25rem] lg:translate-y-[-10rem] w-full h-full rounded-full bg-neutral-950 opacity-45">
                            <FontAwesomeIcon icon={faCamera} className="text-4xl" />
                        </div>
                    </div>
                </DialogTrigger>
                <PhotoEditDialogContent 
                    isDialogOpen={isDialogOpen} 
                    setIsDialogOpen={setIsDialogOpen} 
                    isChangePhoto={isChangePhoto} 
                    setIsChangePhoto={setIsChangePhoto} 
                    isRemovePhoto={isRemovePhoto} 
                    setIsRemovePhoto={setIsRemovePhoto} 
                />
            </Dialog>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(editProfile)}
                    className="flex flex-col gap-5 w-full"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col border-2 px-3 py-2 rounded-lg">
                                        <FormLabel className="text-base sm:text-lg lg:text-xl text-neutral-400 font-light">Name</FormLabel>
                                        <FormControl>
                                                <input {...field} className="flex-1 text-white font-medium text-base sm:text-lg lg:text-xl focus:outline-0"/>
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="flex flex-col border-2 px-3 py-2 rounded-lg">
                                        <FormLabel className="text-base sm:text-lg lg:text-xl text-neutral-400 font-light">Username</FormLabel>
                                        <FormControl>
                                                <input {...field} className="flex-1 text-white font-medium text-base sm:text-lg lg:text-xl focus:outline-0"/>
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <div className="grow flex flex-col border-2 px-3 py-2 rounded-lg">
                                        <FormLabel className="text-base sm:text-lg lg:text-xl text-neutral-400 font-light">Bio</FormLabel>
                                        <FormControl>
                                            <textarea 
                                                {...field} 
                                                style={{scrollbarWidth: "none"}} 
                                                className="resize-none flex-1 text-white font-medium text-base sm:text-lg lg:text-xl focus:outline-0" 
                                                rows={5}
                                                placeholder="Your Description Here" 
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                    <div className="w-full flex justify-end">
                        <Button type="submit" className="h-10 text-base w-fit">Update Profile</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default EditProfile