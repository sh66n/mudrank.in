import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const auth = useAuthUser();
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <div>
      <div>Hello, {auth.username}</div>
      <button
        onClick={() => {
          signOut();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
