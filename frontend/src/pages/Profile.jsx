import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [user, setuser] = useState(null)
    // id, name, email

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("http://localhost:3000/profile",{
                method: "GET",
                credentials: "include"
            })
            const result = await res.json()
            setuser(result)
        }

        fetchUser()
    },[])
    
    // useEffect(() => {
    //     console.log(user)
    // },[user])
    
    
  const avatarUrl =
    user?.avatar ||
    "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
      encodeURIComponent(user?.username || "User");

  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <img
            src={avatarUrl}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
            />

            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-600 mt-1">{user?.email}</p>

            <div className="mt-6 border-t pt-4 text-sm text-gray-500">
            Account Information
            </div>
        </div>
        </div>
    </>
  );
};

export default Profile;
