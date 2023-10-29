import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "../axiosConfig";

export default function SearchBar({ setSearchResult }) {
  const [searchValue, setSearchValue] = useState("");
  const isSearching = useRef(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchValue.length < 2) return;
    handleSubmit();
  }, [searchValue]);

  useEffect(() => {
    if (searchValue.length === 0) setSearchResult([]);
  }, [searchValue]);

  function handleSubmit(ev) {
    if (ev) ev.preventDefault();
    if (isSearching.current) return;
    isSearching.current = true;
    axios
      .get(`/search/${searchValue}`)
      .then((response) => {
        setSearchResult(response.data);
        isSearching.current = false;
      })
      .catch((err) => {
        console.log(err);
        isSearching.current = false;
      });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full overflow-hidden">
      <div className="flex p-2 rounded-lg bg-charcoal-gray-900 border border-charcoal-gray-600 focus-within:border-charcoal-gray-400 transition duration-300">
        <button className="" type="submit" role="button">
          <Search
            className="text-charcoal-gray-400 hover:text-charcoal-gray-300 transition duration-200"
            size={20}
          />
        </button>
        <input
          ref={searchRef}
          className="bg-charcoal-gray-900 px-2 w-full outline-none placeholder:text-charcoal-gray-400 focus:placeholder:text-charcoal-gray-300 text-charcoal-gray-300"
          placeholder="Search"
          type="text"
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
        />
      </div>
    </form>
  );
}
