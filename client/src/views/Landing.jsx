import React, { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import LogoutButton from "../components/LogoutButton";
import StampList from "../components/StampList";
import Stamp from "../components/Stamp";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export default function Landing() {
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [stamps, setStamps] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/stamps`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div>Hello, {auth.username}</div>
      <LogoutButton />
      <StampList></StampList>
    </div>
  );
}
