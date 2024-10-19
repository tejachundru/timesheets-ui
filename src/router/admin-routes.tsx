import Roles from "@/pages/roles/roles";
import { SecureRoutes } from "./secure-routes";
import Users from "@/pages/users/users";
import Teams from "@/pages/teams/team";
import Projects from "@/pages/projects/projects";

const AdminRoutes = {
  path: "/admin",
  element: <SecureRoutes />,
  children: [
    {
      path: "roles",
      element: <Roles />,
    },
    {
      path: "users",
      element: <Users />,
    },
    {
      path: "teams",
      element: <Teams />,
    },
    {
      path: "projects",
      element: <Projects />,
    },
  ],
};

export default AdminRoutes;
