import { useState, useEffect } from "react";
import { publicApiClient } from "@/utils/api";

export default function EnsuranceSearchBar({ value, onChange, round }) {
  const [ensurances, setEnsurances] = useState([]);
  const [filteredEnsurances, setFilteredEnsurances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value); // Local state to sync with parent

  // Fetch ensurances on mount
  useEffect(() => {
    const fetchEnsurances = async () => {
      setLoading(true);
      try {
        const response = await publicApiClient.get("/all_ensurances/");
        const data = response.data;
        setEnsurances(data);
        setFilteredEnsurances(data);
      } catch (error) {
        console.error("Error fetching ensurances:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnsurances();
  }, []);

  // Sync local inputValue with parent value and filter ensurances
  useEffect(() => {
    setInputValue(value);
    const filtered = ensurances.filter((ensurance) =>
      ensurance.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEnsurances(filtered);
  }, [value, ensurances]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // Notify parent of change
    const filtered = ensurances.filter((ensurance) =>
      ensurance.name.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredEnsurances(filtered);
    setIsOpen(true);
  };

  const handleOptionClick = (ensuranceName) => {
    setInputValue(ensuranceName);
    onChange(ensuranceName); // Notify parent of selection
    setIsOpen(false);
  };

  // Reset only if input is invalid on blur
  const handleBlur = () => {
    setTimeout(() => {
      if (!ensurances.some((item) => item.name === inputValue)) {
        setInputValue("");
        onChange("");
      }
      setIsOpen(false);
    }, 100);
  };

  return (
    <div className="w-full h-full relative text-black">
      <input
        type="text"
        placeholder="Search for an ensurance"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        className={`px-4 py-2 w-full h-full focus:outline-none ${round}`}
        disabled={loading}
      />
      {isOpen && !loading && filteredEnsurances.length > 0 && (
        <ul className="text-black text-sm absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredEnsurances.map((ensurance) => (
            <li
              key={ensurance.id}
              onMouseDown={() => handleOptionClick(ensurance.name)}
              className="px-2 py-3 hover:bg-gray-100 cursor-pointer"
            >
              {ensurance.name}
            </li>
          ))}
        </ul>
      )}
      {isOpen && !loading && filteredEnsurances.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 text-gray-500">
          No ensurances found
        </div>
      )}
    </div>
  );
}