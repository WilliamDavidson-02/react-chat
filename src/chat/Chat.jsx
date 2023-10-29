import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import SubmitBtn from "../shared/SubmitBtn";

export default function Chat() {
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);
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

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px"; // reset the height to get the correct scrollHeight
    const scrollHeight = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [textareaValue, textareaRef]);

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(textareaValue.split("\n"));
  }

  function handleKeyDown(ev) {
    if (ev.shiftKey && ev.key === "Enter") {
      ev.preventDefault();
      setTextareaValue(textareaValue + "\n"); // add a new line
    } else if (ev.key === "Enter") {
      ev.preventDefault();
      handleSubmit(ev);
    }
  }

  return (
    <div className="relative w-screen max-w-screen overflow-hidden h-screen flex text-light-silver">
      <Sidebar user={user} />
      <div
        className={`h-full pt-10 px-4 flex-grow flex flex-col justify-between`}
      >
        <div>Messages</div>
        <form onSubmit={handleSubmit} className="flex items-end gap-2 py-4">
          <textarea
            ref={textareaRef}
            value={textareaValue}
            onChange={(ev) => setTextareaValue(ev.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            rows={1}
            tabIndex={10}
            className={`flex-grow px-4 py-4 outline-none rounded-lg resize-none bg-charcoal-gray-900 border border-charcoal-gray-600 focus:border-charcoal-gray-400 transition duration-300 max-h-[500px] ${
              textareaRef.current?.scrollHeight >= 500
                ? "overflow-y-scroll"
                : "overflow-y-hidden"
            }`}
          />
          <div className="max-h-20 h-full">
            <SubmitBtn text={"Send"} />
          </div>
        </form>
      </div>
    </div>
  );
}
