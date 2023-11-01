import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import axios from "../axiosConfig";
import Profile from "./Profile";
import { UserPlus } from "lucide-react";
import ErrorNotification from "../shared/ErrorNotification";

export default function FriendRequests() {
  const { user } = useContext(UserContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);

  useEffect(() => {
    axios
      .get(`/friend-requests-users/${user.id}`)
      .then((res) => setFriendRequests(res.data))
      .catch((err) => {
        setErrorNotifications((prev) => [...prev, err.response.data.message]);
      });
  }, []);

  return (
    <>
      <div className="absolute z-[9999] top-5 right-5 w-full max-w-[500px] flex flex-col gap-4">
        <AnimatePresence>
          {errorNotifications.map((message, index) => {
            return (
              <ErrorNotification
                message={message}
                key={index}
                index={index}
                setErrorNotifications={setErrorNotifications}
              />
            );
          })}
        </AnimatePresence>
      </div>
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{
          scale: 1,
          transition: { type: "spring", stiffness: 600, damping: 25 },
        }}
        onClick={(ev) => ev.stopPropagation()}
        className="w-full max-w-[768px] min-h-[200px] p-4 bg-charcoal-gray-700 border border-charcoal-gray-500 rounded-lg flex flex-col gap-4"
      >
        <h1 className="pl-4 text-3xl font-bold text-charcoal-gray-400 mb-5">
          Friend requests
        </h1>
        {friendRequests.map((userFriend, index) => {
          return (
            <div className="flex justify-between items-center" key={index}>
              <Profile user={userFriend} />
              <div
                role="button"
                className={`p-2 text-emerald-green cursor-default border border-emerald-green rounded-md`}
              >
                <UserPlus size={24} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
