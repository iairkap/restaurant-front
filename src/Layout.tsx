import { Bell, LayoutDashboard, MenuIcon, Settings, Store, Users } from 'lucide-react';
import { useState } from 'react';
import { Button } from './components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet"
import { Link } from 'react-router-dom';
import { navigation } from "@/constants/dashboardNavigation"

import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [pathname] = useState(window.location.pathname);

    const navigationFa = navigation(pathname, LayoutDashboard, MenuIcon, Store, Users, Settings);

    return (
        <div className="min-h-screen ">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                        <MenuIcon className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                    <div className="flex flex-col h-full">
                        <div className="space-y-4 py-4">
                            <div className="px-3 py-2">
                                <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
                                <div className="space-y-1">
                                    {navigationFa.map((item) => (
                                        <Link key={item.name} to={item.href}>
                                            <Button variant={item.current ? 'secondary' : 'ghost'} className="w-full justify-start">
                                                <item.icon className="mr-2 h-4 w-4" />
                                                {item.name}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Desktop navigation */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
                <div className="flex min-h-0 flex-1 flex-col border-r bg-muted/40">
                    <div className="flex flex-1 flex-col overflow-y-auto pt-5 px-4">
                        <Link to="/dashboard" className="flex items-center px-3 font-semibold text-lg mb-8">
                            <Store className="h-6 w-6 mr-2" />
                            Restaurant Manager
                        </Link>
                        <nav className="flex-1 space-y-1">
                            {navigationFa.map((item) => (
                                <Link key={item.name} to={item.href}>
                                    <Button variant={item.current ? 'secondary' : 'ghost'} className="w-full justify-start">
                                        <item.icon className="mr-2 h-4 w-4" />
                                        {item.name}
                                    </Button>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="md:pl-72">
                <div className="sticky top-0 x-0- flex h-16 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
                        <Button variant="outline" size="icon" className="relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
                            <span className="sr-only">View notifications</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative flex items-center gap-x-2">
                                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-muted">
                                        <svg className="h-full w-full text-foreground" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </span>
                                    <span className="hidden lg:flex lg:items-center">
                                        <span className="text-sm font-semibold" aria-hidden="true">
                                            John Smith
                                        </span>
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Sign out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <main className="py-8">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;