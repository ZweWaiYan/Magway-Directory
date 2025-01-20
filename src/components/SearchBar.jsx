import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";

const SearchBar = ({ onSearchSubmit }) => {
    const [input, setInput] = useState("");
  
    const handleInputChange = (value) => {
      setInput(value);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && input.trim()) {
        event.preventDefault();
        onSearchSubmit(input.trim());
      }
    };
  
    const clearSearch = () => {
      setInput("");
      onSearchSubmit("");
    };

  return (
    <div>
      <div className="bg-white w-full rounded-lg h-[5] p-3 shadow-lg flex items-center">
        <FaSearch className="text-2xl text-black cursor-pointer mr-3 mb-1" />
        <input
          type="text"
          placeholder="Search for something"
          className="bg-transparent border-none outline-none text-xl ml-1 placeholder:text-black-300 text-black w-full"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MdOutlineCancel onClick={clearSearch} className="text-3xl text-black cursor-pointer ml-3" />
      </div>
    </div>
  );
};

export default SearchBar;
