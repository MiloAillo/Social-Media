import FollowersCard from "@/components/followers-card";
import checkAuth from "@/loader/check";
import fetchOtherProfile from "@/loader/fetchOtherProfile";
import fetchPost from "@/loader/fetchPost";
import fetchProfile from "@/loader/fetchProfile";
import EditProfile from "@/pages/editProfile/editProfile";
import Home from "@/pages/main/home/Home";
import MainLayout from "@/pages/main/MainLayout";
import OtherProfile from "@/pages/otherProfile/OtherProfile";
import Post from "@/pages/post/Post";
import Profile from "@/pages/profile/Profile";
import Search from "@/pages/search/Search";
import SettingsPage from "@/pages/settings/settings";

const appRoute = {
    id: "root",
    path: "/app",
    element: <MainLayout />,
    loader: checkAuth,
    children: [
        { index: true, loader: fetchPost, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "profile", loader: fetchProfile, element: <Profile /> },
        { path: "post", element: <Post />},
        { path: "settings", element: <SettingsPage /> },
        { path: "edit", loader: fetchProfile, element: <EditProfile /> },
        { path: ":id", loader: fetchOtherProfile, element: <OtherProfile /> }
    ]
}

export default appRoute