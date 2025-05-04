/* eslint-disable react/prop-types */

const ProductCard = ({ img, title, price }) => {
  return (
    <div className="productCard overflow-hidden border rounded h-100 ">
      <div className="overflow-hidden">
        <img src={img} alt="product image" />
      </div>
      <div className="p-3">
        <p>{title}</p>
        <p className="m-0 fw-bold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
