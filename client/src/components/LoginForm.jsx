import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loginFailed, setLoginFailed] = useState(false);

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //react auth kit
  const signIn = useSignIn();

  //react router dom
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        formData
      );
      if (
        signIn({
          auth: {
            token: res.data.accessToken,
            type: "Bearer",
          },
          userState: {
            id: res.data.id,
            username: res.data.username,
            accessToken: res.data.accessToken,
          },
        })
      ) {
        setLoginFailed(false);
        navigate("/");
      }
    } catch (error) {
      setLoginFailed(true);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} />
      {errors.username && <span>This field is required</span>}

      <input {...register("password", { required: true })} type="password" />
      {errors.password && <span>This field is required</span>}

      <button type="submit"> Submit </button>
      {loginFailed && (
        <div className="text-red-600 bold">Invalid username or password</div>
      )}
    </form>
  );
}
