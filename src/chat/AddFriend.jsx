import React, { useState } from "react";
import SearchBar from "./SearchBar";

export default function AddFriend({ setToggleAddFriend }) {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <div
      onClick={() => setToggleAddFriend(false)}
      className="w-screen h-screen fixed top-0 left-0 bg-charcoal-gray-900/30 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(ev) => ev.stopPropagation()}
        className="w-full max-w-[768px] min-h-[200px] p-4 bg-charcoal-gray-700 border border-charcoal-gray-500 rounded-lg flex flex-col gap-4"
      >
        <SearchBar setSearchResult={setSearchResult} />
        {searchResult.length > 0 &&
          searchResult.map((user, index) => {
            return <div key={index}>{user.firstName}</div>;
          })}
        {searchResult.length === 0 && (
          <div className="text-center text-lg text-charcoal-gray-400 select-none">
            No results
          </div>
        )}
      </div>
    </div>
  );
}
