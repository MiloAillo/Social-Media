import { DialogClose, DialogContent } from "./ui/dialog"
import { motion } from "motion/react"
import { faImage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { faEraser } from "@fortawesome/free-solid-svg-icons"
import { Button } from "./ui/button"
import { useRef } from "react"
import axios from "axios"
import ApiUrl from "@/lib/api"

interface PhotoEditDialogContentInterface {
    isDialogOpen: boolean
    setIsDialogOpen: (value: boolean) => void
    isChangePhoto: boolean
    setIsChangePhoto: (value: boolean) => void
    isRemovePhoto: boolean
    setIsRemovePhoto: (value: boolean) => void
}

const PhotoEditDialogContent = ({ setIsDialogOpen, isChangePhoto, setIsChangePhoto, isRemovePhoto, setIsRemovePhoto}: PhotoEditDialogContentInterface) => {
    const fileRef = useRef<HTMLInputElement | null>(null)

    const changePhoto = async () => {
        console.log(fileRef.current && fileRef.current.files && fileRef.current.files.length > 0 ? fileRef.current.files[0].type : null)

        try {
            if(!(fileRef.current && fileRef.current.files && fileRef.current.files.length > 0)) {
                throw new Error("file missing")
            }

            if(fileRef.current.files[0].type !== "image/jpeg" && fileRef.current.files[0].type !== "image/png") {
                throw new Error("file type not allowed")
            }

            const formData = new FormData()
            formData.append("image", fileRef.current.files[0])
            const res = await axios.post(`${ApiUrl}/api/updatePhoto`, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${window.localStorage.getItem("Authorization")}`
                 }
            })
            console.log(res)
        } catch(err) {
            console.error(err)
        }
        // KURANG SUCCESS N ERROR HANDLING NYA, SISTEMNYA SUDAAA
    }

    const removePhoto = async () => {
        try {
            const res = await axios.get(`${ApiUrl}/api/deletePhoto`, {
                headers: { Authorization: `Bearer ${window.localStorage.getItem("Authorization")}` }
            })
            console.log(res)
        } catch(err) {
            console.error(err)
        }
        // KURANG SUCCESS N ERROR HANDLING NYA, SISTEMNYA SUDAAA
    }

    return (
            <DialogContent className="w-150">
                <motion.div className="flex flex-col gap-4"
                    layout
                >
                    {!isRemovePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100
                        }}
                        whileHover={{
                            scale: 1.2
                        }}
                        whileTap={{
                            scale: 1.1
                        }}
                        onClick={() => setIsChangePhoto(!isChangePhoto)}
                    >
                        <Card className="flex flex-row items-center w-full h-fit p-5 rounded-md">
                            <FontAwesomeIcon icon={faImage} className="text-2xl" />
                            <p className="w-full text-lg">Change Photo</p>
                        </Card>
                    </motion.div> : null}
                    {isChangePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100
                        }}
                        whileHover={{
                            scale: 1.2
                        }}
                        whileTap={{
                            scale: 1.1
                        }}               
                    >
                        <Input type="file" id="photo" ref={fileRef} accept="image/png, image/jpeg" />
                    </motion.div> : null}
                    {!isChangePhoto ? <motion.div
                        onClick={() => setIsRemovePhoto(!isRemovePhoto)}
                        initial = {{
                            y: 20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100
                        }}
                        whileHover={{
                            scale: 1.2
                        }}
                        whileTap={{
                            scale: 1.1
                        }}
                    >
                        <Card className="flex flex-row items-center w-full h-fit p-5 rounded-md">
                            <FontAwesomeIcon icon={faEraser} className="text-2xl" />
                            <p className="w-full text-lg">{!isRemovePhoto ? "Remove Photo" : "Are You Sure?"}</p>
                        </Card>
                    </motion.div> : null}
                    {!isChangePhoto ? !isRemovePhoto ? <motion.div
                        initial = {{
                            y: 20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100
                        }}
                        whileHover={{
                            scale: 1.07
                        }}
                    >
                        <DialogClose className="w-full"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <Button className="w-full">Nevermind</Button>
                        </DialogClose>
                    </motion.div> : null : null}
                    {isChangePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100,
                            transition: {
                                delay: 0.2
                            }
                        }}
                        whileHover={{
                            scale: 1.07
                        }}
                    >
                        <Button className="w-full"
                            onClick={() => setIsChangePhoto(false)}
                        >
                            <Button className="w-full">Nevermind, Go Back</Button>
                        </Button>
                    </motion.div> : null}
                    {isChangePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100,
                            transition: {
                                delay: 0.4
                            }
                        }}
                        whileHover={{
                            scale: 1.07
                        }}
                    >
                        <Button className="w-full"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            <Button className="w-full" onClick={changePhoto}>Upload</Button>
                        </Button>
                    </motion.div> : null}
                    {isRemovePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100,
                        }}
                        whileHover={{
                            scale: 1.07
                        }}
                    >
                        <Button className="w-full"
                            onClick={() => setIsRemovePhoto(false)}
                        >No, Go Back</Button>
                    </motion.div> : null}
                    {isRemovePhoto ? <motion.div
                        initial = {{
                            y: -20,
                            opacity: 0
                        }}
                        animate = {{
                            y: 0,
                            opacity: 100,
                            transition: {
                                delay: 0.2
                            }
                        }}
                        whileHover={{
                            scale: 1.07
                        }}
                    >
                        <Button className="w-full bg-red-300" onClick={removePhoto}>Remove Photo</Button>
                    </motion.div> : null}
                </motion.div>
            </DialogContent>
    )
}

export default PhotoEditDialogContent