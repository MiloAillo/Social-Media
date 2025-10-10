import checkAuth from "@/loader/check";
import fetchPost from "@/loader/fetchPost";
import Home from "@/pages/main/home/Home";
import MainLayout from "@/pages/main/MainLayout";
import Search from "@/pages/search/Search";

const appRoute = {
    path: "/app",
    element: <MainLayout />,
    loader: checkAuth,
    children: [
        { index: true, loader: fetchPost, element: <Home /> },
        { path: "search", element: <Search /> }
    ]
}

export default appRoute