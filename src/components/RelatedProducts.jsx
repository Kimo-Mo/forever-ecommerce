/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { useShopContext } from "../customs/useShopContext";
import LoadingProducts from "./LoadingProducts";

const RelatedProducts = ({ category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { products } = useShopContext();
  useEffect(() => {
    if (products) {
      let relatedProducts = structuredClone(products);
      setRelatedProducts(
        relatedProducts
          .filter((p) => p.category == category && p.subCategory == subCategory)
          .slice(0, 4)
      );
    }
  }, [category, subCategory, products]);
  return products ? (
    <div className="mt-4">
      <SectionTitle text1={"RELATED"} text2={"PRODUCTS"} />
      <div className="row row-gap-3 mt-5">
        {relatedProducts.map((product, index) => {
          return (
            <Link
              key={index}
              to={`/Products/${product.id}`}
              className="col-6 col-md-4 col-lg-3">
              <ProductCard
                className="text-primary"
                id={product.id}
                title={product.title}
                img={product.img}
                price={product.price}
              />
            </Link>
          );
        })}
      </div>
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default RelatedProducts;
