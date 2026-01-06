import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form"

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  } 

  return (
    <div className="h-screen w-[80vw] flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className=" h-[85vh] flex flex-col gap-5 justify-center items-center">
            <Input 
            className="w-xl" placeholder="Image" 
            {...register("image", {required: true})}
            // value="https://images.unsplash.com/photo-1602143407151-7111542de6e8"
            />
            
            <Input 
            className="w-xl" placeholder="Title"
            {...register("title", {required: true})}
            />
            
            <Input 
            className="w-xl" placeholder="Description"
            {...register("description", {required: true})}
            />
            
            <Input 
            className="w-xl" placeholder="Price"
            {...register("price", {required: true})}
            />
            
            <Input 
            className="w-xl" placeholder="Category"
            {...register("category", {required: true})}
            />
            
            <Input 
            className="w-xl" placeholder="Stock"
            {...register("stock", {required: true})}
            />
            
            <Button type="submit" className="w-xl">Add Product</Button>
        </form>
    </div>
  )
}
