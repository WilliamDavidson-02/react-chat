import { createContext, useState, useEffect } from "react";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/");
    } else {
      axios.get("/user").then((response) => {
        const { firstName, lastName, email, profileImage, id, recipientIds } =
          response.data;
        setUser({ firstName, lastName, email, profileImage, id, recipientIds });
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
