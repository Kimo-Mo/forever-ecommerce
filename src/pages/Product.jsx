import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { useShopContext } from "../customs/useShopContext";
import { toast } from "react-toastify";
import LoadingProducts from "../components/LoadingProducts";
import { useAuth } from "../customs/useAuth";

const Product = () => {
  const { products, addToCart } = useShopContext();
  const { isLoggedIn } = useAuth();
  const [productItem, setProductItem] = useState({});
  const { productId } = useParams();
  const [img, setImg] = useState("");
  const [size, setSize] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (products) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        setProductItem(product);
        setImg(product.img);
      } else {
        console.log("Product not found");
      }
    }
  }, [productId, products]);

  return productItem ? (
    <div className="pt-5 border-top ">
      <div className="d-flex gap-5 gap-lg-0 flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex justify-content-center" style={{ flex: "1" }}>
          <img src={img} alt="product image" />
        </div>
        <div style={{ flex: "1" }}>
          <h4>{productItem.title || "Product Title"}</h4>
          <div className="stars d-flex gap-1 align-items-center mt-2 mb-4">
            <img src="/imgs/star_icon.png" alt="start icon" />
            <img src="/imgs/star_icon.png" alt="start icon" />
            <img src="/imgs/star_icon.png" alt="start icon" />
            <img src="/imgs/star_icon.png" alt="start icon" />
            <img src="/imgs/star_dull_icon.png" alt="start icon" />
            <p className="m-0">(122)</p>
          </div>
          <h2 className="mb-3">${productItem.price || "0"}</h2>
          <p className="text-secondary pe-md-5 me-md-5">
            {productItem.description || "Product Description"}
          </p>
          <div className="my-4">
            <p>Select Sizes</p>
            <div className="sizes d-flex gap-1 gap-md-3 text-uppercase">
              <button
                style={{ border: `${size == "s" ? "1px solid #FF532E" : ""}` }}
                onClick={(e) => setSize(e.target.value)}
                value="s">
                s
              </button>
              <button
                style={{ border: `${size == "m" ? "1px solid #FF532E" : ""}` }}
                onClick={(e) => setSize(e.target.value)}
                value="m">
                m
              </button>
              <button
                style={{ border: `${size == "l" ? "1px solid #FF532E" : ""}` }}
                onClick={(e) => setSize(e.target.value)}
                value="l">
                l
              </button>
              <button
                style={{ border: `${size == "xl" ? "1px solid #FF532E" : ""}` }}
                onClick={(e) => setSize(e.target.value)}
                value="xl">
                xl
              </button>
              <button
                style={{
                  border: `${size == "xxl" ? "1px solid #FF532E" : ""}`,
                }}
                onClick={(e) => setSize(e.target.value)}
                value="xxl">
                xxl
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (isLoggedIn) {
                addToCart(productId, size);
              } else {
                toast.error("You have to login");
                navigate("/Authentication");
              }
            }}
            className="btn bg-dark text-light py-2 px-5 text-uppercase">
            Add To Cart
          </button>
          <p className="mt-4 pt-3 border-top text-secondary">
            100% Original product. <br />
            Cash on delivery is available on this product.
            <br />
            Easy return and exchange policy within 7 days
          </p>
        </div>
      </div>
      <div className="mt-5 pt-5 border-top">
        <div className="d-flex">
          <span className="border p-3 d-block fw-bold">Description</span>
          <span className="border p-3 d-block">Reviews (122)</span>
        </div>
        <div className="p-3 border" style={{ fontSize: "14px" }}>
          <p className="text-secondary">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p className="text-secondary">
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productItem.category}
        subCategory={productItem.subCategory}
      />
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default Product;
