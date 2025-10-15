import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

function Post() {

    const postSchema = z.object({
        tittle: z.string().min(8).max(200),
        content: z.string().min(10).max(1256),
        image: z.file().optional()
    })

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            tittle: "",
            content: ""
        }
    })
    
    const post = async (values: z.infer<typeof postSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(post)}>
                <FormField
                control={form.control}
                name="tittle"
                render={({ field }) => (
                    <FormItem>
                        <div className="w-full h-11 sm:h-14 bg-[#00000062] border-b-2 border-[#8d8d8d] flex flex-row items-center justify-between px-3 gap-2">
                            <input {...field} type="text" placeholder="What's up?" className="h-full flex-1 text-white font-semibold text-md sm:text-lg lg:text-xl focus:outline-0"/>
                            <FontAwesomeIcon icon={faCamera} color="white" className="text-xl sm:text-2xl w-full h-full"/>
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <textarea {...field} style={{scrollbarWidth: "none"}} rows={10} placeholder="Your Description Here" className="text-white text-md sm:text-md lg:text-lg bg-[#00000062] px-3 py-2 resize-none border-b-2 border-[#8d8d8d] focus:outline-0"/>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <button type="submit" className="bg-[#393E46] text-white font-semibold tet-lg md:text-xl p-1 md:p-2 w-20 md:w-30 rounded-sm self-end tracking-wider">Post</button>
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