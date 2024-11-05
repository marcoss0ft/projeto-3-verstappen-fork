import { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default function SearchBox({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-box">
            <img src="/Icons/lupa.png" alt="Search Icon" className="search-icon" />
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm} 
                onChange={handleSearch} 
            />
        </div>
    );
}

// Adicionando validação de prop types
SearchBox.propTypes = {
    onSearch: PropTypes.func.isRequired,
};