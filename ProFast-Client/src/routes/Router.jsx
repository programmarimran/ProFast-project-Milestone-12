import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path:"/register",
        Component:Register
      }
    ],
  },
]);

export default router;
