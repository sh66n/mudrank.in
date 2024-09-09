import React, { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import CircleLogoutButton from "../components/CircleLogoutButton";

export default function CircleDashboard() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isCircle) {
      navigate("/unauthorized");
    }
  }, [auth.isCircle, navigate]);

  return (
    <div>
      <div>Circle dashboard</div>
      <CircleLogoutButton />
    </div>
  );
}
