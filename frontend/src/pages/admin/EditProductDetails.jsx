import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EditProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;

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
      stock: product.stock,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    // Only append image if user selected a file
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/admin/product/edit/${product._id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      alert(result.message);
      return;
    }
    navigate("/admin")
  };

  return (
    <div className="h-screen w-[80vw] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" h-[85vh] flex flex-col gap-5 justify-center items-center"
        encType="multipart/form-data"
      >
        <Input
          type="file"
          accept="image/*"
          className="w-xl"
          {...register("image", {
            validate: (files) => {
              if (!files || files.length === 0) return true; // image is optional
              if (files[0].size > 4 * 1024 * 1024)
                return "Image must be 4MB or less";
              if (!files[0].type.startsWith("image/"))
                return "Only image files are allowed";
              return true;
            },
          })}
        />

        <Input
          className="w-xl"
          placeholder="Tilte"
          {...register("title", { required: true })}
        />
        <Input
          className="w-xl"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <Input
          className="w-xl"
          placeholder="Category"
          {...register("category", { required: true })}
        />
        <Input
          className="w-xl"
          placeholder="Price"
          {...register("price", { required: true })}
        />
        <Input
          className="w-xl"
          placeholder="Stock"
          {...register("stock", { required: true })}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditProductDetails;
