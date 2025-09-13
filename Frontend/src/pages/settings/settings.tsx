import SettingsCard from "../../components/settingsCard"

function SettingsPage() {
    return (
        <div className="bg-[#222831] w-screen h-screen flex justify-center p-5">
            <div className="w-[600px] flex flex-col gap-5   ">
                <div className="flex items-center gap-2 text-[#EEEEEE]">
                    <div className="font-[Inter] font-bold text-3xl">{"<"}</div>
                    <p className="font-[Inter] font-bold text-3xl">Settings</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <SettingsCard tittle="Delete Account" description="Erase your account permanently">
                        <span className="material-symbols-outlined">account_circle_off</span>
                    </SettingsCard>
                    <SettingsCard tittle="Media Quality" description="Change photo and video quality">
                        <span className="material-symbols-outlined">android_cell_4_bar</span>                    </SettingsCard>
                    <SettingsCard tittle="Logout" description="Sign out from all of your devices">
                        <span className="material-symbols-outlined">logout</span>
                    </SettingsCard>
                </div>

            </div>
        </div>
    )
}

export default SettingsPage