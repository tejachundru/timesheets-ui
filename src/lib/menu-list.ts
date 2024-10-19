import {
  Briefcase,
  LayoutGrid,
  Scale,
  UserRoundSearch,
  Users,
  type LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Array<Submenu>;
};

type Group = {
  groupLabel: string;
  menus: Array<Menu>;
};

export function getMenuList(pathname: string): Array<Group> {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
          active: pathname === "/",
        },
      ],
    },
    {
      groupLabel: "Admin",
      menus: [
        {
          href: "/admin/roles",
          label: "Roles",
          icon: Scale,
          submenus: [],
        },
        {
          href: "/admin/users",
          label: "Users",
          icon: UserRoundSearch,
          submenus: [],
        },
        {
          href: "/admin/teams",
          label: "Teams",
          icon: Users,
          submenus: [],
        },
        {
          href: "/admin/projects",
          label: "Projects",
          icon: Briefcase,
          submenus: [],
        },
      ],
    },
  ];
}
