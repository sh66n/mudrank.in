import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const signIn = useSignIn();
  const navigate = useNavigate();

  const [signupFailed, setSignupFailed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/signup`,
        formData
      );
      if (
        signIn({
          auth: {
            token: data.accessToken,
            type: "Bearer",
          },
          userState: {
            ...data,
          },
        })
      ) {
        setSignupFailed(false);
        navigate("/");
      }
    } catch (e) {
      setSignupFailed(true);
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
          type="email"
        />
        {errors.email && <span>This field is required</span>}
        <input
          {...register("username", { required: true })}
          placeholder="Username"
          type="text"
        />
        {errors.username && <span>This field is required</span>}
        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <span>This field is required</span>}

        <button type="submit">Register</button>
      </form>
      {signupFailed && (
        <span className="text-red-600 bold">
          Something went wrong. Please try again.
        </span>
      )}
    </div>
  );
}
