import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import SubmitBtn from "../shared/SubmitBtn";
import { UserContext } from "../context/UserContext";
import Profile from "./Profile";
import axios from "axios";

export default function Chat() {
  const { user } = useContext(UserContext);
  const [selectedFriend, setSelectedFriend] = useState(null); // index, integer
  const [messages, setMessages] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");
  const messageRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "0px"; // reset the height to get the correct scrollHeight
    const scrollHeight = textareaRef.current.scrollHeight;

    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [textareaValue, textareaRef]);

  useEffect(() => {
    if (selectedFriend !== null && user.friendList[selectedFriend].isFriend) {
      axios
        .get(`/get-messages/${user.id}/${user.friendList[selectedFriend].id}`)
        .then((response) => setMessages(response.data.messages))
        .catch((error) => console.log(error));
    }
  }, [selectedFriend]);

  function sanitizeText(text) {
    return text.replace("<", "&lt;").replace(">", "&gt;");
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const messageValue = sanitizeText(textareaValue).trim();
    axios
      .post("/send-message", {
        messageValue,
        senderId: user.id,
        recipientId: user.friendList[selectedFriend].id,
      })
      .then((response) => {
        setMessages((prev) => [...prev, response.data.message]);
        setTextareaValue("");
      })
      .catch((error) => console.log(error));
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
      <Sidebar
        setSelectedFriend={setSelectedFriend}
        selectedFriend={selectedFriend}
        messageRef={messageRef}
      />
      <div
        ref={messageRef}
        className="h-full pt-10 px-4 w-[calc(100%-240px)] flex flex-col justify-between"
      >
        {selectedFriend !== null ? (
          user.friendList[selectedFriend].isFriend ? (
            <>
              <div className="flex flex-col gap-2 py-4">
                {messages.map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded-lg border max-w-full md:max-w-1/2 ${
                        message.sender_id === user.id
                          ? "bg-forest-green border-emerald-green ml-auto text-end"
                          : "bg-charcoal-gray-500 border-charcoal-gray-300 mr-auto"
                      }`}
                    >
                      {message.message}
                    </div>
                  );
                })}
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 py-4"
              >
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
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center px-4">
              <div className="mb-4">
                <Profile user={user.friendList[selectedFriend]} />
              </div>
              <p className="text-charcoal-gray-400 text-center">
                Awaiting {user.friendList[selectedFriend].firstName}{" "}
                {user.friendList[selectedFriend].lastName} to accept your friend
                request.
              </p>
            </div>
          )
        ) : (
          <div className="w-full h-full flex justify-center items-center text-xl text-charcoal-gray-500">
            &larr; Please select a user
          </div>
        )}
      </div>
    </div>
  );
}
