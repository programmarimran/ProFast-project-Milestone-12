import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/home/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import Coverage from "../Pages/coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import AddParcel from "../Pages/addParsel/AddParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/dashboard/myparcels/MyParcels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/service-centre.json"),
      },
      {
        path: "/add-parcel",
        loader: () => fetch("/service-centre.json"),
        element: (
          <PrivateRoute>
            <AddParcel></AddParcel>
          </PrivateRoute>
        ),
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
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:"myparcels",
        Component:MyParcels
      }
    ]
  }
]);

export default router;
