import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const SecureRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
};
