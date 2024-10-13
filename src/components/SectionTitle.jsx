/* eslint-disable react/prop-types */
const SectionTitle = ({ text1, text2 }) => {
  return (
    <div className="d-flex align-items-center justify-content-center py-4 gap-3 ">
      <h2 className="m-0">
        <span className="text-secondary">{text1}</span> {text2}
      </h2>
      <p
        className="m-0"
        style={{
          width: "2rem",
          height: "2px",
          backgroundColor: "black",
        }}></p>
    </div>
  );
};

export default SectionTitle;
