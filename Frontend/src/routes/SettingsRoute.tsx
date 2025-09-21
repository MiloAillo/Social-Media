import { authLoader } from "../loader/auth"
import SettingsPage from "../pages/settings/settings"

const SettingsRoute = {
    path: "/settings", element: <SettingsPage />, loader: authLoader
}

export default SettingsRoute