import React, { useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Link, useNavigate } from "react-router-dom";
import CircleLogoutButton from "../components/CircleLogoutButton";

export default function CircleDashboard() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isCircle) {
      navigate("/unauthorized");
    }
  }, [auth.isCircle]);

  return (
    <div>
      <div>Circle dashboard</div>
      <Link to={"materials/new"}>Add new stamp</Link>
      <br />
      <CircleLogoutButton />
    </div>
  );
}
