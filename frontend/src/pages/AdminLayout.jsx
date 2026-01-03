import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Home, Inbox, Calendar, ShoppingCart, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "All Products",
    to: "/admin",
    icon: Home,
  },
  {
    title: "In Stock",
    to: "/admin/in-stock",
    icon: Inbox,
  },
  {
    title: "Out of Stock",
    to: "/admin/out-of-stock",
    icon: Calendar,
  },
  {
    title: "Orders",
    to: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Add Product",
    to: "/admin/add-product",
    icon: Plus,
  },
  {
    title: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Home",
    to: "/",
    icon: Home
  }
];

const Admin = () => {
  const navigate = useNavigate()

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
  };
  
  return (
    <SidebarProvider>
      <div className="h-screen flex">
        {/* Sidebar */}
        <Sidebar className="w-64">
          <SidebarHeader>MERN-Mart</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.to}
                          className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="destructive" onClick={logout}>Log Out</Button>
          </SidebarFooter>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
