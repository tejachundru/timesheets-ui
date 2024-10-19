import NotFoundPage from "@/pages/not-found";
import AuthRoutes from "@/router/auth-routes";
import UserRoutes from "@/router/user-routes";
import type React from "react";
import { useRoutes } from "react-router-dom";
import AdminRoutes from "./admin-routes";

const NotFoundRoute = {
  path: "*",
  element: <NotFoundPage />,
};

export const Router: React.FC = () => {
  const routes = useRoutes([
    AuthRoutes,
    UserRoutes,
    AdminRoutes,
    NotFoundRoute,
  ]);
  return routes;
};

export default Router;
