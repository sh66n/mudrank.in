import React from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const signOut = useSignOut();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        signOut();
        navigate("/login");
      }}
    >
      Logout
    </button>
  );
}
