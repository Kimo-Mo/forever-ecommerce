import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div
        className="row mb-5 align-items-start justify-content-between row-gap-3"
        style={{ marginTop: "8rem" }}>
        <div className="col-12 col-md-6">
          <img
            src="/imgs/logo.png"
            alt="logo image"
            className="mb-4"
            style={{ width: "8rem" }}
          />
          <p
            className="text-secondary m-0 pe-0 pe-md-5">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="mb-3">COMPANY</h6>
          <ul className="text-secondary">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            <li>
              <Link to="/Contact">Contact</Link>
            </li>
            <li>
              <Link to="/Collection">Collection</Link>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-3">
          <h6 className="mb-3">GET IN TOUCH</h6>
          <ul className="text-secondary">
            <li>+2-010-111-9999</li>
            <li>admin@forever.com</li>
            <li>Zagazig, Sharqia, Egypt</li>
          </ul>
        </div>
      </div>
      <p
        className="m-0 text-center py-3 border-top"
        style={{ fontSize: "14px" }}>
        Copyright 2024@ <span className="fw-bold">Kareem</span> - All Right
        Reserved.
      </p>
    </>
  );
};

export default Footer;
