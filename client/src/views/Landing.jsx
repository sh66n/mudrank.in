import React from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LogoutButton from "../components/LogoutButton";

export default function Landing() {
  const auth = useAuthUser();
  return (
    <div>
      <div>Hello, {auth.username}</div>
      <LogoutButton />
    </div>
  );
}
