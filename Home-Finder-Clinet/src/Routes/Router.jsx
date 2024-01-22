import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Register from "../Components/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import ManageHouses from "../Pages/Dashboard/ManageHouses/ManageHouses";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AddNewHouse from "../Pages/Dashboard/AddNewHouse/AddNewHouse";
import EditHouse from "../Pages/Dashboard/EditHouse/EditHouse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "manage-house",
        element: <ManageHouses></ManageHouses>,
      },
      {
        path: "add-new-house",
        element: <AddNewHouse></AddNewHouse>,
      },
      {
        path: "manage-booking",
        element: <ManageBookings></ManageBookings>,
      },
      {
        path: "edit-house/:id",
        element: <EditHouse></EditHouse>,
      },
    ],
  },
]);

export default router;
