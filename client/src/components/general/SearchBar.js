import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import generalStyles from "../../styles/general.module.css";

const SearchBar = ({ className, onSearch }) => {
  const [query, setQuery] = useState("");

  return (
    <form
      className={`${generalStyles.searchContainer} ${
        className ? className : ""
      }`}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(query);
      }}
    >
      <button className={generalStyles.searchBtn}>
        <SearchIcon />
      </button>
      <input
        className={generalStyles.searchInput}
        type="text"
        value={query}
        placeholder="Search for events..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
