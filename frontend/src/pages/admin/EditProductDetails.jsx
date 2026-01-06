import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const EditProductDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.image,
    stock: product.stock
  }})

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/product/edit/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      navigate("/admin")
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
    <div className="h-screen w-[80vw] flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className=" h-[85vh] flex flex-col gap-5 justify-center items-center">
        <Input className="w-xl" placeholder="Image"  {...register("image", { register:true })} />
        <Input className="w-xl" placeholder="Tilte"  {...register("title", { register:true })} />
        <Input className="w-xl" placeholder="Description"  {...register("description", { register:true })} />
        <Input className="w-xl" placeholder="Category"  {...register("category", { register:true })} />
        <Input className="w-xl" placeholder="Price"  {...register("price", { register:true })} />
        <Input className="w-xl" placeholder="Stock"  {...register("stock", { register:true })} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default EditProductDetails
