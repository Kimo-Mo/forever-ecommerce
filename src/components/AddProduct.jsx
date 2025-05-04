import { useState } from "react";
import { toast } from "react-toastify";
import { useShopContext } from "../customs/useShopContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

let initialFormState = {
  img: "",
  productName: "",
  productDescription: "",
  category: "Men",
  subcategory: "TopWear",
  productPrice: "",
  bestseller: false,
  latestCollection: false,
};

const AddProduct = () => {
  const { fetchProducts } = useShopContext();
  const [formInputs, setFormInputs] = useState(initialFormState);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;

    if (name === "img") {
      setFormInputs({
        ...formInputs,
        img: value.replace("C:\\fakepath\\", "/productImgs/"),
      });
      return;
    }
    if (name === "bestseller") {
      setFormInputs({
        ...formInputs,
        bestseller: e.target.checked,
      });
      return;
    }
    if (name === "latestCollection") {
      setFormInputs({
        ...formInputs,
        latestCollection: e.target.checked,
      });
      return;
    }
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  }
  function validateForm() {
    const newErrors = {};
    let isValid = true;
    if (!formInputs.img) {
      newErrors.img = "Please upload an image.";
      isValid = false;
    }
    if (formInputs.productName.length < 3) {
      newErrors.productName =
        "Product name must be at least 3 characters long.";
      isValid = false;
    }
    if (formInputs.productDescription.length < 10) {
      newErrors.productDescription =
        "Product description must be at least 10 characters long.";
      isValid = false;
    }
    if (!formInputs.productPrice || formInputs.productPrice <= 0) {
      newErrors.productPrice = "Please enter a valid product price.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    const productData = {
      img: formInputs.img,
      title: formInputs.productName,
      description: formInputs.productDescription,
      category: formInputs.category,
      subCategory: formInputs.subcategory,
      price: parseFloat(formInputs.productPrice),
      bestseller: formInputs.bestseller,
      latestCollection: formInputs.latestCollection,
    };
    try {
      if (!productData.img) {
        toast.error("Please upload an image.");
        return;
      }
      const productsCollection = collection(db, "products");
      await addDoc(productsCollection, productData);
      fetchProducts();
      toast.success("Product Added Successfully.");
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Cannot add Product!");
    } finally {
      setIsSubmitting(false);
      setFormInputs(initialFormState);
    }
  }

  return (
    <form
      className="addProductForm text-capitalize"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <p>Upload</p>
      <input
        type="file"
        name="img"
        id="img"
        className="form-control"
        accept=".png, .jpg, .jpeg"
        onChange={handleInputChange}
      />
      {errors.img && <small className="text-danger">{errors.img}</small>}

      <p className="mt-3">Product Name</p>
      <input
        type="text"
        className="form-control"
        placeholder="Type here"
        name="productName"
        value={formInputs.productName}
        onChange={handleInputChange}
      />
      {errors.productName && (
        <small className="text-danger">{errors.productName}</small>
      )}

      <p className="mt-3">Product Description</p>
      <textarea
        className="form-control"
        placeholder="Write content here"
        name="productDescription"
        value={formInputs.productDescription}
        onChange={handleInputChange}></textarea>
      {errors.productDescription && (
        <small className="text-danger">{errors.productDescription}</small>
      )}

      <div className="d-flex flex-column flex-md-row row-gap-3 column-gap-5 my-3">
        <div>
          <p>Category</p>
          <select
            name="category"
            className="form-select"
            value={formInputs.category}
            onChange={handleInputChange}>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p>Subcategory</p>
          <select
            name="subcategory"
            className="form-select"
            value={formInputs.subcategory}
            onChange={handleInputChange}>
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
          </select>
        </div>
        <div>
          <p>Price</p>
          <input
            type="number"
            className="form-control"
            placeholder="100"
            min={0}
            name="productPrice"
            value={formInputs.productPrice}
            onChange={handleInputChange}
          />
          {errors.productPrice && (
            <small className="text-danger mb-3">{errors.productPrice}</small>
          )}
        </div>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          name="bestseller"
          checked={formInputs.bestseller}
          onChange={handleInputChange}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Add to Bestseller
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault1"
          name="latestCollection"
          checked={formInputs.latestCollection}
          onChange={handleInputChange}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault1">
          Add to Latest Collection
        </label>
      </div>
      <button
        type="submit"
        className="btn bg-dark text-light my-3 py-2 px-5 text-uppercase"
        disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default AddProduct;
