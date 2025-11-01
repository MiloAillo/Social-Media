import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import ApiUrl from "@/lib/api"
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { isAxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import { motion } from "motion/react"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

function Post() {
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [imageOverWarning, setImageOverWarning] = useState<boolean>(false)
    const [imageFakeWarning, setImageFakeWarning] = useState<boolean>(false)
    const [isPostSuccess, setIsPostSuccess] = useState<boolean>(false)
    const [isPostFailed, setIsPostFailed] = useState<boolean>(false)
    const [images, setImages] = useState<boolean>(false)
    // const form
    const formData = new FormData()

    const postSchema = z.object({
        tittle: z.string().min(8).max(200),
        content: z.string().min(10).max(1256),
        images: z.any().optional()
    })

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            tittle: "",
            content: ""
        }
    })
    
    const post = async (values: z.infer<typeof postSchema>) => {
        console.log(values.images)
        setIsPostSuccess(false)
        setIsPostFailed(false)
        try {
            formData.append("tittle", values.tittle)
            formData.append("content", values.content)
            if(values.images) {
                for (let index = 0; index < values.images.length; index++) {
                    const image = values.images[index];
                    formData.append("images[]", image)
                }
            }
            
            const res = axios.post(`${ApiUrl}/api/post`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
                    "Accept": "application/json"
                }
            })
            const data = (await res).data
            if(data.status === "success") setIsPostSuccess(true) 
        } catch(err) {
            if(isAxiosError(err)) {
                console.log(err.response)
                setIsPostFailed(true)
            }
        } finally {
            formData.delete("tittle")
            formData.delete("content")
            formData.delete("images[]")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(post)}
                className="w-full max-w-[950px] mx-10 mt-12 sm:mx-7 sm:mt-8 md:mx-0 md:w-[80%] md:mt-10 flex flex-col gap-3"
            >
                <FormField
                control={form.control}
                name="tittle"
                render={({ field }) => (
                    <FormItem>
                        <div className="w-full h-11 sm:h-14 rounded-md border-2 border-neutral-800 flex flex-row items-center justify-between px-3 gap-2">
                            <input {...field} type="text" placeholder="What's up?" className="w-full h-full flex-1 text-white opacity-100 font-semibold text-md sm:text-lg lg:text-xl focus:outline-0"/>
                            <FontAwesomeIcon icon={faCamera} onClick={() => document.getElementById("image")?.click()} color="white" className="text-xl sm:text-2xl w-full h-full"/>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                    <div
                    className="hidden"
                    >
                        <input
                            id="image" 
                            type="file" 
                            className="hidden"
                            multiple
                            onChange={(e) => {
                                const images = e.target.files       
                                if(images) {
                                    // MIME CHECK
                                    const allowed = ["image/jpeg", "image/png", "image/jpg"]
                                    for (let i = 0; i < images.length; i++) {
                                        const image = images[i];
                                        const invalid = !allowed.includes(image.type)
                                        if (invalid) {
                                            setImageFakeWarning(true)
                                            setImages(false)
                                            setImageOverWarning(false)
                                            field.onChange(undefined)
                                            return
                                        }
                                    }
                                    // IF IMAGE MORE THAN 3
                                    if(images?.length > 3) {
                                        setImageOverWarning(true)
                                        setImageFakeWarning(false)
                                        setImages(false)
                                        field.onChange(undefined)
                                        return
                                    }
                                    setImages(true)
                                    setImageFakeWarning(false)
                                    setImageOverWarning(false)
                                    field.onChange(images)
                                    const urls = Array.from(images).map((file) => URL.createObjectURL(file))
                                    setPreviewUrls([])
                                    setPreviewUrls(urls)
                                } else {
                                    setImages(false)
                                    setImageFakeWarning(false)
                                    setImageOverWarning(false)
                                    setPreviewUrls([])
                                }
                            }}
                            ref={field.ref}
                            accept="image/png, image/jpeg, image/jpg"
                        ></input>
                    </div>
                )}
                />
                { images 
                    ? <div
                    className="flex gap-3"
                    >
                        {
                            previewUrls.map((url) => (
                                <img src={url} className="w-30 rounded-md border-2 border-neutral-800"/>
                            ))
                        }
                    </div>
                    : null
                }
                { imageOverWarning ? 
                    <motion.div 
                        className="flex gap-1 items-center justify-end px-2"
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
                    <p className="mx-1 font-medium text-md">Whoa there, 3 pics max!</p>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="opacity-70" />
                </motion.div> : null }
                { imageFakeWarning ? 
                    <motion.div 
                        className="flex gap-1 items-center justify-end px-2"
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
                    <p className="mx-1 font-medium text-md">Only png, jpeg, jpg allowed!</p>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="opacity-70" />
                </motion.div> : null }
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <textarea {...field} style={{scrollbarWidth: "none"}} rows={10} placeholder="Your Description Here" className="text-white text-md sm:text-md lg:text-lg px-3 py-2 resize-none focus:outline-0 border-2 rounded-md border-neutral-800"/>
                        <FormMessage />
                    </FormItem>
                )}
                />
                { isPostSuccess ? 
                    <motion.div 
                        className="flex gap-1 items-center justify-end px-2"
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
                    <p className="mx-1 font-medium text-md">Post Uploaded Sucessfully!</p>
                    <FontAwesomeIcon icon={faCheck} className="opacity-70" />
                </motion.div> : null }
                { isPostFailed ? 
                    <motion.div 
                        className="flex gap-1 items-center justify-end px-2"
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
                    <p className="mx-1 font-medium text-md">Failed, please try again later.</p>
                    <FontAwesomeIcon icon={faTriangleExclamation} className="opacity-70" />
                </motion.div> : null }
                <button type="submit" className="bg-blue-400 text-neutral-800 font-semibold tet-lg md:text-xl p-1 md:p-2 w-20 md:w-30 rounded-sm self-end tracking-wider">Post</button>
            </form>
        </Form>
        // <div className="px-5 grow sm:px-10 md:px-15 lg:px-20 pt-10 overflow-hidden flex flex-col gap-5">
        //     <div className="w-full h-11 sm:h-14 bg-[#00000062] border-b-2 border-[#8d8d8d] flex flex-row items-center justify-between px-3 gap-2">
        //         <input  type="text" placeholder="What's up?" className="h-full flex-1 text-white font-semibold text-md sm:text-lg lg:text-xl focus:outline-0"/>
        //         <FontAwesomeIcon icon={faCamera} color="white" className="text-xl sm:text-2xl w-full h-full"/>
        //     </div>
        //     <textarea style={{scrollbarWidth: "none"}} rows={10} placeholder="Your Description Here" className="text-white text-md sm:text-md lg:text-lg bg-[#00000062] px-3 py-2 resize-none border-b-2 border-[#8d8d8d] focus:outline-0"/>
        //     <button className="bg-[#393E46] text-white font-semibold tet-lg md:text-xl p-1 md:p-2 w-20 md:w-30 rounded-sm self-end tracking-wider">Post</button>
        // </div>
    )
}

export default Post