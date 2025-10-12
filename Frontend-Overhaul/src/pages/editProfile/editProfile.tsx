import type { fetchedProfile } from "@/types/fetchProfileType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLoaderData } from "react-router-dom"
import { faCamera } from "@fortawesome/free-regular-svg-icons"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardHeader } from "@/components/ui/card"
import { faEraser, faImage } from "@fortawesome/free-solid-svg-icons"
import { XIcon } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

const EditProfile = () => {
    const user = useLoaderData() as fetchedProfile

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isChangePhoto, setIsChangePhoto] = useState<boolean>(false)
    const [isRemovePhoto, setIsRemovePhoto] = useState<boolean>(false)

    useEffect(() => {
        if(!isDialogOpen) {
            setIsChangePhoto(false)
            setIsRemovePhoto(false)
        }
    }, [isDialogOpen])

    return (
        <div>
            <Dialog>
                <DialogTrigger
                    onClick={() => setIsDialogOpen(true)}
                >
                    <div className="h-30 w-30">
                        <img src={user.userData.photo} alt={user.userData.username} className="w-full h-full rounded-full" />
                        <div className="flex justify-center items-center translate-y-[-7.5rem] w-full h-full rounded-full bg-neutral-950 opacity-45">
                            <FontAwesomeIcon icon={faCamera} className="text-4xl" />
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="w-150">
                    <motion.div className="flex flex-col gap-4"
                        layout
                    >
                        {!isRemovePhoto ? <motion.div
                            whileHover={{
                                scale: 1.2
                            }}
                            whileTap={{
                                scale: 1.1
                            }}
                            onClick={() => setIsChangePhoto(prev => !prev)}
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
                            <Input type="file" id="photo" />
                        </motion.div> : null}
                        {!isChangePhoto ? <motion.div
                            onClick={() => setIsRemovePhoto(prev => !prev)}
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
                                <Button className="w-full">Upload</Button>
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
                            <Button className="w-full bg-red-300">Remove Photo</Button>
                        </motion.div> : null}
                    </motion.div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditProfile