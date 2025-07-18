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
import Payment from "../Pages/dashboard/payment/Payment";
import PaymentHistory from "../Pages/dashboard/paymentHistory/PaymentHistory";
import TrackerPage from "../Pages/dashboard/tracker/TrackerPage";
import BeARider from "../Pages/dashboard/beARIder/BeARider";
import ActiveRiders from "../Pages/dashboard/activeRiders/ActiveRiders";
import PendingRiders from "../Pages/dashboard/pendingRiders/PendingRiders";
import MakeAdmin from "../Pages/dashboard/makeAdmin/MakeAdmin";
import Forbidden from "../Pages/forbiddenPage/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignParcels from "../Pages/dashboard/assignParcel/AssignParcels";
import PendingDeliveries from "../Pages/dashboard/pendingDeliveries/PendingDeliveries";
import RiderRoute from "./RiderRoute";
import CompletedDeliveries from "../Pages/dashboard/completedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/dashboard/riderEarningPage/MyEarnings";
import DashboardHome from "../Pages/dashboard/homeDashboard/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/forbidden",
        Component: Forbidden,
      },
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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
      index:true,
      Component:DashboardHome
      }
      ,
      {
        path: "myparcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "history",
        Component: PaymentHistory,
      },
      {
        path: "tracker",
        Component: TrackerPage,
      },
      {
        path: "be-a-rider",
        loader: () => fetch("/service-centre.json"),
        Component: BeARider,
      },
      {
        path: "pending-deliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path:"my-earnings",
        element:<RiderRoute><MyEarnings></MyEarnings></RiderRoute>
      },
      {
        path: "assign-parcels",
        element: (
          <AdminRoute>
            <AssignParcels></AssignParcels>
          </AdminRoute>
        ),
      },
      {
        path: "active-riders",
        element: (
          <AdminRoute>
            <ActiveRiders></ActiveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "pending-riders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "make-admin",

        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
