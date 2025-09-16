import MainLayout from "../MainLayout"
import Home from "../pages/home/Home"
import Post from "../pages/post/Post"
import Profile from "../pages/profile/Profile"
import Search from "../pages/search/Search"

const HomeRoute = {
    path: "/", element: <MainLayout />, children: [
        {index: true, element: <Home />},
        {path: "/search", element: <Search />},
        {path: "/profile", element: <Profile />},
        {path: "/post", element: <Post />}
    ]
}


export default HomeRoute