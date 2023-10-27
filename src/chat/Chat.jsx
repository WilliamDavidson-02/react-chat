import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";

export default function Chat() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      axios.get("/user").then((response) => {
        const { firstName, lastName, email, profileImage } = response.data;
        setUser({ firstName, lastName, email, profileImage });
      });
    }
  }, []);

  return (
    <div className="relative w-screen max-w-screen overflow-hidden h-screen flex text-light-silver">
      <Sidebar user={user} />
      <div className="h-full"></div>
    </div>
  );
}
