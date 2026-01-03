import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, isAdmin: false });

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/check", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json(); // backend returns user info with role
        setAuth({ loading: false, isAdmin: data.user?.role === "admin" });
      } catch (err) {
        setAuth({ loading: false, isAdmin: false });
      }
    };

    checkAdmin();
  }, []);

  if (auth.loading) return <div>Loading...</div>;

  // Redirect non-admins
  if (!auth.isAdmin) return <Navigate to="/" replace />;

  // Render admin content
  return children;
};

export default AdminRoute;
