import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Šalje vrednost u `Navbar`
  };

  return (
    <input
      type="text"
      className="form-control"
      value={query}
      onChange={handleChange}
      placeholder={placeholder || "Pretraži..."}
    />
  );
};

export default SearchBar;
