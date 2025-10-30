import { useState, type ReactNode } from "react"

interface SettingsCardProps {
    children: ReactNode
    tittle: string
    description: string
}

function SettingsCard({ children, tittle, description }: SettingsCardProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div onClick={() => setIsOpen(prev => !prev)} className="flex flex-col justify-center gap-2 bg-[#393E46] min-w-60 w-full p-3 box-border rounded-lg">
            <div>
                <div className="font-[Inter] text-white font-semibold text-xl">{tittle}</div>
                <div className="font-[Inter] text-white font-light text-md">{description}</div>
            </div>
            <div className={`${!isOpen ? "hidden " : ""} w-full`}>
                {children}
            </div>
        </div>
    )
}

export default SettingsCard