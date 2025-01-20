import { useState, useEffect, useRef } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

const Dropdown = ({ onCategoryChange, selectedCategory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = ["Pagodas", "Foods", "Hotels"];

    // Close dropdown on outside click
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleSelect = (item) => {
        // Prevent selection if the item is already selected
        if (item === selectedCategory) return;

        onCategoryChange(item); // Notify the parent about the change
        setIsOpen(false); // Close the dropdown
    };

    return (
        <div
            ref={dropdownRef}
            className="w-full shadow-lg "
        >
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-white p-1.5 w-[100px] md:w-full lg:w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-black duration-300 active:text-gray-800"
                aria-expanded={isOpen}
                aria-controls="dropdown-menu"
            >
                {selectedCategory}
                {!isOpen ? (
                    <AiOutlineCaretDown className="h-8" />
                ) : (
                    <AiOutlineCaretUp className="h-8" />
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    id="dropdown-menu"
                    className="bg-white mt-2 flex flex-col items-start rounded-lg p-2 w-full shadow-lg transition duration-300"
                >
                    {categories.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(item)}
                            className={`flex w-full justify-between p-4 rounded-lg border-l-4 ${item === selectedCategory
                                    ? "bg-gray-200 border-gray-400 text-gray-400 cursor-not-allowed" // Disabled styles
                                    : "hover:bg-gray-300 cursor-pointer hover:border-l-black border-transparent active:border-black duration-300 active:text-gray-800"
                                }`}
                        >
                            <h3 className="font-bold">{item}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
