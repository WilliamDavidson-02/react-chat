import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import axios from "../axiosConfig";
import Profile from "./Profile";
import { Check, X } from "lucide-react";
import ErrorNotification from "../shared/ErrorNotification";

export default function FriendRequests() {
  const { user, setUser } = useContext(UserContext);
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

  function handleFriendRequest(answer, friendId, userIndex) {
    axios
      .post("/answer-friend-request", { answer, friendId, userId: user.id })
      .then(() => {
        let isInFriendList = false;
        let updatedFriendList = user.friendList;

        user.friendList.foreach((user, index) => {
          if (user.id === friendId) {
            isInFriendList = true;
            updatedFriendList[index].isFriend = true;
          }
        });

        if (!isInFriendList) {
          updatedFriendList = [
            ...updatedFriendList,
            { ...friendRequests[userIndex], isFriend: true },
          ];
        }

        setUser((prev) => ({
          ...prev,
          friendList: updatedFriendList,
        }));
        setFriendRequests((prev) =>
          prev.filter((user) => user.id !== friendId)
        );
      })
      .catch((err) =>
        setErrorNotifications((prev) => [...prev, err.response.data.message])
      );
  }

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
                onClick={() =>
                  handleFriendRequest("accept", userFriend.id, index)
                }
                className="p-2 text-emerald-green hover:text-charcoal-gray-500 hover:bg-emerald-green transition duration-300 border border-emerald-green rounded-md mr-4"
              >
                <Check size={24} />
              </div>
              <div
                role="button"
                onClick={() =>
                  handleFriendRequest("decline", userFriend.id, index)
                }
                className="p-2 text-red-500 hover:text-charcoal-gray-500 hover:bg-red-500 transition duration-300 border border-red-500 rounded-md"
              >
                <X size={24} />
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
