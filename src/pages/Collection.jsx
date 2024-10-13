/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterProducts from "../components/FilterProducts";
import LoadingProducts from "../components/LoadingProducts";
import { Link } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";

const Collection = ({ search }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const { products } = useContext(ShopContext);
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);
  const applyFilter = () => {
    if (products) {
      let productsCopy = structuredClone(products);
      if (search) {
        productsCopy = productsCopy.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (category.length > 0) {
        productsCopy = productsCopy.filter((item) =>
          category.includes(item.category)
        );
      }
      if (subcategory.length > 0) {
        productsCopy = productsCopy.filter((item) =>
          subcategory.includes(item.subCategory)
        );
      }
      setFilteredProducts(productsCopy);
    }
  };
  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search]);
  useEffect(() => {
    sortProducts();
  }, [sortType]);
  return products ? (
    <div className="border-top d-flex flex-column flex-md-row align-items-start pt-5 gap-5">
      <FilterProducts
        category={category}
        setCategory={setCategory}
        subcategory={subcategory}
        setSubcategory={setSubcategory}
      />
      <div style={{ flex: "1" }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex align-items-center justify-content-center gap-3 ">
            <h4 className="m-0">
              <span className="text-secondary">ALL</span> COLLECTIONS
            </h4>
            <p
              className="m-0"
              style={{
                width: "2rem",
                height: "2px",
                backgroundColor: "black",
              }}></p>
          </div>
          <div className="sort">
            <select
              name="sortCollection"
              id="sortCollection"
              className="form-select"
              onChange={(e) => {
                setSortType(e.target.value);
              }}>
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>
        </div>
        <div className="row row-gap-3">
          {filteredProducts.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/Products/${item.id}`}
                className="col-6 col-md-4 col-lg-3">
                <ProductCard
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  price={item.price}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default Collection;
