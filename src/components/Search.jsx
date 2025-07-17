import React from "react";
import {IoIosSearch} from "react-icons/io";

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <IoIosSearch className="text-purple-400 w-5 h-5" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies here.."
            />
            <h2>{searchTerm}</h2>
        </div>
    )
}

export default Search;