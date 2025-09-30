import { createBrowserRouter } from "react-router-dom";
import accessRoute from "./accessRoute/acessRoute";
import mainRoute from "./mainRoute/mainRoute";

const route = createBrowserRouter([
    accessRoute,
    mainRoute
])

export default route