import Login from "@/pages/auth/login";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

const AuthRoutes = {
  path: "/auth",
  element: <AuthRoute />,
  children: [
    {
      path: "sign-in",
      element: <Login />,
    },
  ],
};

export default AuthRoutes;
