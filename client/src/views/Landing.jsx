import React, { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";
import StampList from "../components/StampList";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Landing() {
  const auth = useAuthUser();

  return (
    <div>
      <div>Hello, {auth.username}</div>
      <LogoutButton />
      <StampList />
    </div>
  );
}
