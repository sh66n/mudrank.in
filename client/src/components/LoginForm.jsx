import React from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} />
      {errors.username && <span>This field is required</span>}

      <input {...register("password", { required: true })} type="password" />
      {errors.password && <span>This field is required</span>}

      <button type="submit"> Submit </button>
    </form>
  );
}
