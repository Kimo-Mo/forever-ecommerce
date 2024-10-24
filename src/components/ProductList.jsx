import { useEffect, useState } from "react";
import LoadingProducts from "./LoadingProducts";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState();

  async function deleteProductById(/*productId*/) {
    toast.error("Delete Feature is Disabled.");
    return;
    // try {
    //   const response = await fetch(
    //     `https://forever-json-server.vercel.app/products/${productId}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   if (response.ok) {
    //     toast.error(`Product deleted successfully.`);
    //     displayProducts();
    //   } else {
    //     console.error(`Failed to delete product with ID ${productId}`);
    //     toast.error(`Failed to delete product.`);
    //   }
    // } catch (error) {
    //   console.error("Error deleting product:", error);
    //   alert("An error occurred while deleting the product.");
    // }
  }
  useEffect(() => {
    displayProducts();
  }, []);
  const displayProducts = () => {
    fetch("https://forever-json-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  };
  return products ? (
    <div className="d-flex flex-column gap-3">
      <div className="d-none d-md-flex justify-content-between align-items-center py-2 px-3 border rounded bg-dark-subtle text-capitalize">
        <p className="m-0">image</p>
        <p className="m-0">name</p>
        <p className="m-0">category</p>
        <p className="m-0">subCategory</p>
        <p className="m-0">price</p>
        <p className="m-0">action</p>
      </div>
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="d-flex flex-wrap justify-content-between align-items-center border rounded ps-md-0 ps-3 pe-3">
            <img
              src={product.img}
              alt="product.img"
              style={{ width: "3rem" }}
            />
            <p className="m-0">{product.title}</p>
            <p className="m-0">{product.category}</p>
            <p className="m-0">{product.subCategory}</p>
            <p className="m-0">{product.price}</p>
            <p
              onClick={() => deleteProductById(product.id)}
              className="m-0  btn btn-danger mb-2 mb-sm-0 py-1 px-2"
              style={{ cursor: "pointer" }}>
              X
            </p>
          </div>
        );
      })}
    </div>
  ) : (
    <LoadingProducts />
  );
};

export default ProductList;
