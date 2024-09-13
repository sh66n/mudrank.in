import React from "react";
import { useForm } from "react-hook-form";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

export default function NewStampForm() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("price", formData.price);

    for (const file of formData.img) {
      formDataObj.append("img", file);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/stamps`,
        formDataObj,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="text-xl">New Stamp</div>
      <form onSubmit={handleSubmit(onSubmit)} encType="mu">
        <input
          {...register("title", { required: true })}
          placeholder="Stamp title"
        />
        {errors.title && <span>This field is required</span>}

        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Price"
        />
        {errors.price && <span>This field is required</span>}
        <input
          {...register("img", { required: true })}
          type="file"
          name="img"
          multiple
        />
        {errors.img && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
}
