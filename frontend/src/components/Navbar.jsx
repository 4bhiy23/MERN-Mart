import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data.user); // { id, role, ... }
        console.log(data);
      } catch (err) {
        setUser(null);
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    navigate("/login");
  };

  return (
    <div className="flex w-full justify-between p-5 shadow- border-b-2">
      {/* Logo */}
      {/* <div className="text-xl">MERN-Mart</div> */}
      <Link to="/">
      <div className="flex items-center space-x-2">
        <div className="text-3xl font-extrabold text-gray-900 tracking-wider uppercase relative">
          MERN-Mart
          {/* subtle underline for character */}
        </div>
      </div>
      </Link>

      {/* Middle Search */}
      <div className="flex gap-4">
        <Input
          className="w-lg"
          placeholder="Find what you are looking for here..."
        />
        <Button>Search</Button>
      </div>
      {user?.role === "admin" && <div>Admin</div>}
      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Welcome {user?.username} </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/cart">Cart</Link>
          </DropdownMenuItem>
          {/* Show Admin Panel only for admin users */}
          {user?.role === "admin" && (
            <DropdownMenuItem asChild>
              <Link to="/admin">Admin Panel</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link to="/orders">Your Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/contact">Contact Us</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600" onClick={logout}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
