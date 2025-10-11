import checkAuth from "@/loader/check";
import fetchPost from "@/loader/fetchPost";
import fetchProfile from "@/loader/fetchProfile";
import Home from "@/pages/main/home/Home";
import MainLayout from "@/pages/main/MainLayout";
import Profile from "@/pages/profile/Profile";
import Search from "@/pages/search/Search";
import SettingsPage from "@/pages/settings/settings";

const appRoute = {
    path: "/app",
    element: <MainLayout />,
    loader: checkAuth,
    children: [
        { index: true, loader: fetchPost, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "profile", loader: fetchProfile, element: <Profile /> },
        {path: "settings", element: <SettingsPage />}
    ]
}

export default appRoute