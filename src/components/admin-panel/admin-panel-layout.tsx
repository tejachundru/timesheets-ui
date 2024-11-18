import { Sidebar } from "@/components/admin-panel/sidebar";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen } = useSelector((state: RootState) => state.theme);
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !sidebarOpen ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
