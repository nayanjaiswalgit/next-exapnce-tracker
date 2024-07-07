import React from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <div className="border-2 rounded-lg flex justify-center items-center  pl-3 py-1 gap-2">
      <GoSearch  />
      <input
        type="text"
        placeholder="Search "
        className="border-transparent focus:border-transparent focus:ring-0 !outline-none
"
      />
    </div>
  );
};

export default SearchBar;
