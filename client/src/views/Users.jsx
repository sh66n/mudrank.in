import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const auth = useAuthUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users`,
          {
            headers: {
              Authorization: "Bearer " + auth.accessToken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {users.map((user) => (
        <li key={user._id}>{user.username}</li>
      ))}
    </div>
  );
}
