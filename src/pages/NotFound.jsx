const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column h-50">
      <img
        src="/imgs/notFoundPage.png"
        alt="not found page"
        style={{ maxHeight: "450px" }}
      />
      <h1 className="text-uppercase">page not found</h1>
    </div>
  );
};

export default NotFound;
