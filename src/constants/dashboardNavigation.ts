interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  current: boolean;
}

type Navigation = (
  pathname: string,
  LayoutDashboard: React.ComponentType,
  MenuIcon: React.ComponentType,
  Store: React.ComponentType,
  Users: React.ComponentType,
  Settings: React.ComponentType
) => NavigationItem[];

export const navigation: Navigation = (
  pathname,
  LayoutDashboard,
  MenuIcon,
  Store,
  Users,
  Settings
) => [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: pathname === "/dashboard",
  },
  {
    name: "Menu Management",
    href: "/dashboard/menu",
    icon: MenuIcon,
    current: pathname === "/dashboard/menu",
  },
  {
    name: "Restaurant Info",
    href: "/dashboard/info",
    icon: Store,
    current: pathname === "/dashboard/info",
  },
  {
    name: "Staff",
    href: "/dashboard/staff",
    icon: Users,
    current: pathname === "/dashboard/staff",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    current: pathname === "/dashboard/settings",
  },
];
