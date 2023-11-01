import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Copy, UserPlus } from "lucide-react";
import { UserContext } from "../context/UserContext";

const userMenu = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -50,
  },
};

export default function UserMenu({
  setUserMenuToggle,
  setToggleFriendRequests,
}) {
  const { user } = useContext(UserContext);
  const [isCopied, setIsCopied] = useState(false);

  const navigate = useNavigate();

  function signOut() {
    Cookies.remove("token");
    navigate("/");
  }

  function handleCopy() {
    setIsCopied(true);
    navigator.clipboard.writeText(user.email);
    setTimeout(() => setIsCopied(false), 1000);
  }

  function handleFriendRequestsToggle() {
    setToggleFriendRequests(true);
    setUserMenuToggle(false);
  }

  return (
    <>
      <div
        onClick={() => setUserMenuToggle(false)}
        className="w-screen h-full fixed top-0"
      />
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={userMenu}
        className="absolute top-full left-0 z-10 p-2 bg-charcoal-gray-800 border border-charcoal-gray-500 rounded-lg flex flex-col gap-2 text-sm"
      >
        <div
          role="button"
          className="select-none p-2 py-2 flex items-center gap-4"
        >
          {user.email}
          <motion.div
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
            role="button"
            className={`bg-charcoal-gray-600 border border-charcoal-gray-500 rounded-lg p-2 transition duration-200 ${
              isCopied ? "border-emerald-500" : ""
            }`}
          >
            {isCopied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 p-0 text-emerald-500"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            ) : (
              <Copy size={16} />
            )}
          </motion.div>
        </div>
        <div className="w-full h-[1px] bg-charcoal-gray-500"></div>
        <div
          onClick={handleFriendRequestsToggle}
          role="button"
          className="px-4 py-2 hover:bg-charcoal-gray-600 transition duration-200 rounded-lg flex justify-between items-center"
        >
          <span>Friend requests</span>
          <UserPlus size={16} />
        </div>
        <div className="w-full h-[1px] bg-charcoal-gray-500"></div>
        <div
          onClick={signOut}
          role="button"
          className="px-4 py-2 hover:bg-charcoal-gray-600 transition duration-200 rounded-lg"
        >
          Sign out
        </div>
      </motion.div>
    </>
  );
}
