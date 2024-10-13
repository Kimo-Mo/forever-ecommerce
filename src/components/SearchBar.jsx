/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SearchBar({ showSearchBar, setShowSearchBar, search, setSearch }) {
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.includes("/Collection")) {
      setShowSearchBar(false);
    }
  }, [location]);
  return showSearchBar ? (
    <div className="border-top py-4 bg-light-subtle d-flex gap-3 align-items-center justify-content-center">
      <input
        type="search"
        placeholder="Search"
        className="form-control w-50"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <img
        src="/imgs/cross_icon.png"
        alt="close icon"
        className=""
        style={{ width: "1rem", cursor: "pointer" }}
        onClick={() => setShowSearchBar(false)}
      />
    </div>
  ) : null;
}

export default SearchBar;
