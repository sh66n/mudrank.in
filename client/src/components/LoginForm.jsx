import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loginFailed, setLoginFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = useSignIn();
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
    <div>
      <h1 className="text-xl">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
        />
        {errors.username && <span>This field is required</span>}

        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>This field is required</span>}

        <button type="submit"> Login </button>
        {loginFailed && (
          <div className="text-red-600 bold">Invalid username or password</div>
        )}
      </form>
    </div>
  );
}
