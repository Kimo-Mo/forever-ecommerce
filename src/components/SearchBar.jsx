import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useShopContext } from "../customs/useShopContext";

function SearchBar() {
  const { showSearchBar, setShowSearchBar, search, setSearch } =
    useShopContext();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.includes("/Collection")) {
      setShowSearchBar(false);
    }
  }, [pathname, setShowSearchBar]);
  return showSearchBar ? (
    <div className="border-top py-4 bg-light-subtle d-flex gap-3 align-items-center justify-content-center">
      <input
        name="search"
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
