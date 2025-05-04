import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import LoadingProducts from "./LoadingProducts";
import { useShopContext } from "../customs/useShopContext";

const LatestCollection = () => {
  const [LatestProducts, setLatestProducts] = useState([]);
  const { products } = useShopContext();
  useEffect(() => {
    if (products) {
      let LatestProducts = structuredClone(products);
      setLatestProducts(LatestProducts.filter((p) => p.latestCollection));
    }
  }, [products]);
  return products ? (
    <div className="my-5">
      <SectionTitle text1={"LATEST"} text2={"COLLECTIONS"} />
      <div className="row row-gap-3 mt-5">
        {LatestProducts.map((product, index) => {
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
      <Link
        to="/Collection"
        className="btn bg-dark text-white mt-5 mx-auto px-5 py-2 d-block text-uppercase"
        style={{ width: "fit-content" }}>
        Collection
      </Link>
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default LatestCollection;
