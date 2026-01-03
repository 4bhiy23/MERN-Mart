import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        // Redirect to home page on success
        navigate("/login")
      } else {
        alert(result.message || "Signup failed")
      }
      
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-amber-100 to-amber-200 flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl px-12 py-10 w-[420px]">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Sign Up
            </h1>

            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            >
                <input 
                type="text" 
                placeholder="Username"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                {...register("username", { required: "Username is required" })}
                />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
                
                <input 
                type="email" 
                placeholder="Email"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                {...register("email", {required: "Email is required"})}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
                
                <input 
                type="password" 
                placeholder="Password"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                {...register("password", {required: "Password is important", minLength:{value: 6, message: "Password must be 6 characters long"}})}
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}

                <input 
                  type="submit" 
                  value="Create Account"
                  className="mt-4 bg-amber-500 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-amber-600 transition-all"
                />
            </form>
            <p>Already an user? <a href="/login">Login</a></p>
        </div>
    </div>
  )
}
