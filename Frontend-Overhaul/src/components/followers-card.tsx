import { XIcon } from "lucide-react"
import { Card, CardHeader } from "./ui/card"

const FollowersCard = () => {
    return (
        <Card className="h-50 w-[90%] md:w-150 p-0 bg-neutral-900">
            <CardHeader className="w-full h-fit bg-neutral-800 rounded-t-[13px] py-2 flex justify-center items-center">
                <p className="text-xl font-semibold">Followers</p>
                <div className="absolute right-11 md:right-auto md:translate-x-68">
                    <XIcon className="" />
                </div>
            </CardHeader>
        </Card>
    )
}

export default FollowersCard