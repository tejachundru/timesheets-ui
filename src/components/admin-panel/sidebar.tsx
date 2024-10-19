"use client";
import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { RootState } from "@/store";
import { setSidebarOpen } from "@/store/slice/theme.slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Sidebar() {
  const { sidebarOpen } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !sidebarOpen ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle
        isOpen={sidebarOpen}
        setIsOpen={() => dispatch(setSidebarOpen(!sidebarOpen))}
      />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          asChild
          variant="link"
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !sidebarOpen ? "translate-x-1" : "translate-x-0"
          )}
        >
          <Link className="flex items-center gap-2" to="/">
            <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                !sidebarOpen
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              <img alt="Logo" className="w-50 h-[60px]" src="/logo.png" />
            </h1>
          </Link>
        </Button>
        <Menu isOpen={sidebarOpen} />
      </div>
    </aside>
  );
}
