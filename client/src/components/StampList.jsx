import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Stamp from "./Stamp";

export default function StampList() {
  const authHeader = useAuthHeader();

  const [stamps, setStamps] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/stamps`,
          {
            headers: {
              Authorization: authHeader,
            },
          }
        );
        setStamps(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  return (
    <div className="flex">
      {stamps.map((s) => (
        <Stamp stamp={s} />
      ))}
    </div>
  );
}
