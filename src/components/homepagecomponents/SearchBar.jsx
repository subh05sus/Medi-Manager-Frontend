import { FaSearch } from "react-icons/fa";
import "./style.css";
const SearchBar = ({ onChange }) => {

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Search...."
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;