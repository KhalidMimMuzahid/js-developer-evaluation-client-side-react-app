import SignIn from "../Pages/SignIn/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRoutes from "./PrivetRoutes";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../layout/Main/Main");
const {
  default: AddStudent,
} = require("../Pages/DashBoard/AddStudent/AddStudent");
const { default: DashBoard } = require("../Pages/DashBoard/DashBoard");
const {
  default: ManageStudent,
} = require("../Pages/DashBoard/ManageStudent/ManageStudent");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivetRoutes>
            <DashBoard />
          </PrivetRoutes>
        ),
        children: [
          {
            path: "/",
            element: <AddStudent />,
          },
          {
            path: "/dashboard/add-student",
            element: <AddStudent />,
          },
          {
            path: "/dashboard/manages-students",
            element: <ManageStudent />,
          },
        ],
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ],
  },
]);
