import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AccessRoute from './routes/AccessRoute'
import "./index.css"
import SettingsRoute from './routes/SettingsRoute'

const route = createBrowserRouter([
  AccessRoute,
  SettingsRoute
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
