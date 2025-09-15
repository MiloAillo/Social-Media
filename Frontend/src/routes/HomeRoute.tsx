import MainLayout from "../MainLayout"
import Home from "../pages/home/Home"
const HomeRoute = {
    path: "/", element: <MainLayout />, children: [
        {index: true, element: <Home />}
    ]
}


export default HomeRoute