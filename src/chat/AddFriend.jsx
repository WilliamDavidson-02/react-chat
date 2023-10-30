import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import Profile from "./Profile";

export default function AddFriend({ setToggleAddFriend }) {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setToggleAddFriend(false)}
      className="w-screen h-screen fixed top-0 left-0 bg-charcoal-gray-900/30 backdrop-blur-sm flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.7 }}
        animate={{
          scale: 1,
          transition: { type: "spring", stiffness: 600, damping: 25 },
        }}
        onClick={(ev) => ev.stopPropagation()}
        className="w-full max-w-[768px] min-h-[200px] p-4 bg-charcoal-gray-700 border border-charcoal-gray-500 rounded-lg flex flex-col gap-4"
      >
        <SearchBar setSearchResult={setSearchResult} />
        {searchResult.length > 0 &&
          searchResult.map((user, index) => {
            return <Profile key={index} user={user} />;
          })}
        {searchResult.length === 0 && (
          <div className="text-center text-lg text-charcoal-gray-400 select-none my-auto">
            No results
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
