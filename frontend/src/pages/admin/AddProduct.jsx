import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("image", data.image[0]); // file
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`, {
        method: "POST",
        credentials: "include",
        body: formData, // IMPORTANT
      });

      const result = await res.json();
      // console.log(result);
      navigate("/admin")
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="h-screen w-[80vw] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className=" h-[85vh] flex flex-col gap-5 justify-center items-center"
      >
        <Input
          type="file"
          accept="image/*"
          className="w-xl"
          placeholder="Image"
          {...register("image", { required: true })}
          // value="https://images.unsplash.com/photo-1602143407151-7111542de6e8"
        />

        <Input
          className="w-xl"
          placeholder="Title"
          {...register("title", { required: true })}
        />

        <Input
          className="w-xl"
          placeholder="Description"
          {...register("description", { required: true })}
        />

        <Input
          type="number"
          className="w-xl"
          placeholder="Price"
          {...register("price", { required: true })}
        />

        <Input
          className="w-xl"
          placeholder="Category"
          {...register("category", { required: true })}
        />

        <Input
          type="number"
          className="w-xl"
          placeholder="Stock"
          {...register("stock", { required: true })}
        />

        <Button
          type="submit"
          className="w-xl"
          // onClick={() => navigate("/admin")}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
