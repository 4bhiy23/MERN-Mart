import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/check", {
          credentials: "include",
        });

        if (res.status === 401) {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return null; // or loader

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
