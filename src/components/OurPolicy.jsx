
const OurPolicy = () => {
  return (
    <div className="d-flex justify-content-around align-items-center flex-column flex-md-row gap-5 gap-md-2 py-5 text-center">
      <div>
        <img
          src="/imgs/exchange_icon.png"
          alt="exchange icon"
          className="d-block m-auto mb-3"
          style={{ width: "3rem" }}
        />
        <h5 className="m-0">Easy Exchange Policy</h5>
        <p className="m-0 text-secondary">
          We offer hassle free exchange policy
        </p>
      </div>
      <div>
        <img
          src={"/imgs/quality_icon.png"}
          alt="quality icon"
          className="d-block m-auto mb-3"
          style={{ width: "3rem" }}
        />
        <h5 className="m-0">7 Days Return Policy</h5>
        <p className="m-0 text-secondary">
          We provide 7 days free return policy
        </p>
      </div>
      <div>
        <img
          src="/imgs/support_img.png"
          alt="support icon"
          className="d-block m-auto mb-3"
          style={{ width: "3rem" }}
        />
        <h5 className="m-0">Best customer support</h5>
        <p className="m-0 text-secondary">we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
