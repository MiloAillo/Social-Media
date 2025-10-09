import { createBrowserRouter } from "react-router-dom";
import accessRoute from "./accessRoute/acessRoute";
import auxiliaryRoute from "./auxiliaryRoute";
import appRoute from "./appRoute/appRoute";

const route = createBrowserRouter([
    accessRoute,
    appRoute,
    auxiliaryRoute
])

export default route