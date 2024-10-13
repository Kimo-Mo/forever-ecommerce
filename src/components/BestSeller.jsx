import { useContext, useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import ProductCard from "./ProductCard";
import LoadingProducts from "./LoadingProducts";
import { Link } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";

const BestSeller = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const { products } = useContext(ShopContext);
  useEffect(() => {
    if (products) {
      let bestProducts = structuredClone(products);
      setBestProducts(
        bestProducts.filter((product) => product.bestseller).splice(0, 4)
      );
    }
  }, [products]);
  return products ? (
    <div className="my-5">
      <SectionTitle text1={"BEST"} text2={"SELLERS"} />
      <div className="row row-gap-3 mt-5">
        {bestProducts.map((product, index) => {
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

export default BestSeller;
