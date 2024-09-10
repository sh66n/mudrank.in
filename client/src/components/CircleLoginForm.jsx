import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CircleLoginForm() {
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        `${import.meta.env.VITE_BACKEND_URL}/circle-login`,
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
            isCircle: res.data.isCircle,
          },
        })
      ) {
        setLoginFailed(false);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginFailed(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl">Circle Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("username", { required: true })}>
          <option value="AP">Andhra Pradesh</option>
          <option value="AS">Assam</option>
          <option value="BR">Bihar</option>
          <option value="DL">Delhi</option>
          <option value="GJ">Gujarat</option>
          <option value="HR">Haryana</option>
          <option value="HP">Himachal Pradesh</option>
          <option value="JK">Jammu Kashmir</option>
          <option value="JH">Jharkhand</option>
          <option value="KA">Karnataka</option>
          <option value="KL">Kerala</option>
          <option value="MP">Madhya Pradesh</option>
          <option value="MH">Maharashtra</option>
          <option value="NE">North East</option>
          <option value="OR">Odisha</option>
          <option value="PB">Punjab</option>
          <option value="RJ">Rajasthan</option>
          <option value="TN">Tamil Nadu</option>
          <option value="TG">Telangana</option>
          <option value="UP">Uttar Pradhesh</option>
          <option value="UK">Uttarakhand</option>
          <option value="WB">West Bengal</option>
        </select>
        {errors.username && <span>This field is required</span>}

        <input
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <span>This field is required</span>}

        <button type="submit">Login</button>
      </form>
      {loginFailed && <span className="text-red-600 bold">{errorMessage}</span>}
    </div>
  );
}
