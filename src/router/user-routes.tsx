import Home from "@/pages/home/home";
import { SecureRoutes } from "./secure-routes";
import Timesheet from "@/pages/timesheet/timesheet";

const UserRoutes = {
  path: "/",
  element: <SecureRoutes />,
  children: [
    {
      path: "",
      element: <Home />,
    },
    {
      path: "timesheet",
      element: <Timesheet />,
    },
  ],
};

export default UserRoutes;
