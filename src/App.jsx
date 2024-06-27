
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import Landing from './pages/Landing'
import DashBoard from './pages/DashBoard'
import Auth from './pages/Auth'
import Link from './pages/Link'
import Redirect from './pages/Redirect'

function App() {

  const router=createBrowserRouter([
    {

      element:<AppLayout />,
      children:[
        {
          path:"/",
          element:<Landing />,
        },
        {
          path:"/",
          element:<Landing />,
        },
        {
          path:"/dashboard",
          element:<DashBoard />,
        },
        {
          path:"/auth",
          element:<Auth />,
        },
        {
          path:"/link/:id",
          element:<Link />,
        },
        {
          path:"/:id",
          element:<Redirect />,
        },
      ]      
    },
  ])

  return (
   
    <RouterProvider router={router} />
   
  )
}

export default App
