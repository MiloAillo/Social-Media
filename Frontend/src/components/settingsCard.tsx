import type { ReactNode } from "react"

interface SettingsCardProps {
    children: ReactNode
    tittle: string
    description: string
}

function SettingsCard({ children, tittle, description }: SettingsCardProps) {
    return (
        <div className="flex flex-row items-center gap-2 bg-[#393E46] min-w-60 flex-1 p-2 box-border rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center">{children}</div>
            <div>
                <div className="font-[Inter] text-white font-semibold text-xl">{tittle}</div>
                <div className="font-[Inter] text-white font-light text-md">{description}</div>
            </div>
        </div>
    )
}

export default SettingsCard