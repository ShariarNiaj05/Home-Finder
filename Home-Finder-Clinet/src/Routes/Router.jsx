import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Register from "../Components/Register/Register";

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
]);

export default router;
