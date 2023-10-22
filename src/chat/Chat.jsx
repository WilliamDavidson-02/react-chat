import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";

export default function Chat() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      axios.get("/user").then((response) => {
        const { firstName, lastName, email } = response.data;
        setUser({ firstName, lastName, email });
      });
    }
  }, []);

  return (
    <div className="text-light-silver">
      <h1>
        Hello, {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}
