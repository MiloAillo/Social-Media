import Home from "@/pages/main/home/Home";
import MainLayout from "@/pages/main/MainLayout";

const mainRoute = {
    path: "/app",
    element: <MainLayout />,
    children: [
        { index: true, element: <Home /> }
    ]
}

export default mainRoute