import { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [formInputs, setFormInputs] = useState({
    img: "",
    productName: "",
    productDescription: "",
    category: "Men",
    subcategory: "TopWear",
    productPrice: "",
    bestseller: false,
  });

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
    // setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    toast.error("Add Feature is Disabled.");
    return;
    // try {
    //   const productData = {
    //     img: formInputs.img,
    //     title: formInputs.productName,
    //     description: formInputs.productDescription,
    //     category: formInputs.category,
    //     subCategory: formInputs.subcategory,
    //     price: parseFloat(formInputs.productPrice),
    //     bestseller: formInputs.bestseller,
    //   };
    //   const response = await fetch(
    //     "https://forever-json-server.vercel.app/products",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(productData),
    //     }
    //   );
    //   if (response.ok) {
    //     setFormInputs({
    //       img: "",
    //       productName: "",
    //       productDescription: "",
    //       category: "Men",
    //       subcategory: "TopWear",
    //       productPrice: "",
    //       bestseller: false,
    //     });
    //     toast.success("Product added successfully!");
    //   } else {
    //     console.error("Failed to add product");
    //     alert("Failed to add product");
    //   }
    // } catch (error) {
    //   console.error("Error submitting product:", error);
    //   alert("An error occurred while adding the product");
    // } finally {
    //   setIsSubmitting(false);
    // }
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
