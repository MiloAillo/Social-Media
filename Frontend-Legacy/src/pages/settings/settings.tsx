import axios from "axios"
import SettingsCard from "../../components/settingsCard"

function SettingsPage() {
    const logout = async () => {
        await axios.get('http://127.0.0.1:8000/api/logout', {
            headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
        })
        window.location.href = "/access"
    }

    return (
        <div className="bg-[#222831] w-screen h-screen flex justify-center p-5">
            <div className="w-[600px] flex flex-col gap-5   ">
                <div className="flex items-center gap-2 text-[#EEEEEE]">
                    <div onClick={() => window.location.href = "/"} className="font-[Inter] font-bold text-3xl cursor-pointer">{"<"}</div>
                    <p className="font-[Inter] font-bold text-3xl">Settings</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <SettingsCard tittle="Delete Account" description="Erase your account permanently">
                        <img src="" alt="" />
                    </SettingsCard>
                    <SettingsCard tittle="Media Quality" description="Change photo and video quality">
                        <img src="" alt="" />
                    </SettingsCard>
                    <SettingsCard tittle="Logout" description="Sign out from all of your devices">
                        <div className="flex flex-row justify-between items-center p-4 bg-[#222831] rounded-md">
                            <p className="tracking-wide text-sm text-white font-[Inter]">Are you sure?</p>
                            <button onClick={logout} className="bg-[#D65A31] font-medium font-[Inter] px-10 py-[2px] border-0 rounded-sm">Log out</button>
                        </div>                    
                    </SettingsCard>
                </div>

            </div>
        </div>
    )
}

export default SettingsPage