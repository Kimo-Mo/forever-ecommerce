/* eslint-disable react/prop-types */
import { useState } from "react";

const FilterProducts = ({
  category,
  setCategory,
  subcategory,
  setSubcategory,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };
  return (
    <div
      className="filters d-flex flex-column gap-3"
      style={{ minWidth: "13rem" }}>
      <div
        onClick={() => setShowFilters((prev) => !prev)}
        className="d-flex align-items-center gap-3 text-uppercase fw-normal m-0"
        style={{ cursor: "pointer" }}>
        Filters{" "}
        <img
          src="/imgs/dropdown_icon.png"
          alt="dropdown icon"
          className="d-inline d-md-none"
          style={{
            height: "1rem",
            transform: `${showFilters ? "rotate(90deg)" : "rotate(0deg)"}`,
          }}
        />
      </div>
      <div
        className={`border rounded p-3 ${
          showFilters ? "" : "d-none"
        } d-md-block`}>
        <h6 className="fw-normal">CATEGORIES</h6>
        <div className="d-flex align-items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="men"
            value="Men"
            onChange={toggleCategory}
          />
          <label htmlFor="men">Men</label>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="women"
            value="Women"
            onChange={toggleCategory}
          />
          <label htmlFor="women">Women</label>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="kids"
            value="Kids"
            onChange={toggleCategory}
          />
          <label htmlFor="kids">Kids</label>
        </div>
      </div>
      <div
        className={`border rounded p-3 ${
          showFilters ? "" : "d-none"
        } d-md-block`}>
        <h6 className="fw-normal">TYPE</h6>
        <div className="d-flex align-items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="TopWear"
            value="TopWear"
            onChange={toggleSubCategory}
          />
          <label htmlFor="TopWear">TopWear</label>
        </div>
        <div className="d-flex align-items-center gap-3 mb-2">
          <input
            type="checkbox"
            id="BottomWear"
            value="BottomWear"
            onChange={toggleSubCategory}
          />
          <label htmlFor="BottomWear">BottomWear</label>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts