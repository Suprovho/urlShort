import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import Redirect from "./pages/Redirect";
import RequireAuth from "./components/RequireAuth";
import UrlProvider from "./context";


function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/dashboard",
          element: (
            <RequireAuth>
              <DashBoard />
            </RequireAuth>
          ),
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/link/:id",
          element: (
            <RequireAuth>
              <Link />
            </RequireAuth>
          ),
        },
        {
          path: "/:id",
          element: <Redirect />,
        },
      ],
    },
  ]);

  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
