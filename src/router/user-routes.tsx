import Home from "@/pages/home/home";
import { SecureRoutes } from "./secure-routes";

const UserRoutes = {
  path: "/",
  element: <SecureRoutes />,
  children: [
    {
      path: "",
      element: <Home />,
    },
  ],
};

export default UserRoutes;
