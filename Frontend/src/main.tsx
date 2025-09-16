import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AccessRoute from './routes/AccessRoute'
import "./index.css"
import SettingsRoute from './routes/SettingsRoute'
import HomeRoute from './routes/HomeRoute'
import { authLoader } from './loader/auth'

const route = createBrowserRouter([
  // loader removed for development purposes
  {children: [
    SettingsRoute,
    HomeRoute,
  ]},
  AccessRoute,
  {path: "*", element: <Navigate to="/access" replace />,},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
