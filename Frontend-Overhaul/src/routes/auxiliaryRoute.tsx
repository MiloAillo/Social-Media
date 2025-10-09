import { Navigate } from "react-router-dom"

const auxiliaryRoute = {
    path: "*",
    element: <Navigate to={"/app"} />
}

export default auxiliaryRoute