import { useState } from "react";
import NewsLetter from "../components/NewsLetter";
import SectionTitle from "../components/SectionTitle";
import "../components/Style/Contact.css";
import { toast } from "react-toastify";
const Contact = () => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    message: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  }
  return (
    <div className="border-top">
      <SectionTitle text1="CONTACT" text2="US" />
      <div
        className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-5 my-5"
        style={{ marginBottom: "5rem" }}>
        <img
          className="contactImg"
          src="/imgs/contact_img.png"
          alt="about image"
        />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                formInputs.name.trim() != "" &&
                formInputs.email.trim() != "" &&
                formInputs.message.trim() != ""
              ) {
                setFormInputs({
                  name: "",
                  email: "",
                  message: "",
                });
                toast.success("Thanks for contacting us :)");
              } else {
                toast.error("Fields mustn't be empty");
              }
            }}
            className="d-flex flex-column gap-4 contactForm">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
              value={formInputs.name}
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Your Email address"
              required
              value={formInputs.email}
              onChange={(e) => handleInputChange(e)}
            />
            <textarea
              className="form-control"
              name="message"
              id="message"
              placeholder="Your Message"
              rows="2"
              required
              value={formInputs.message}
              onChange={(e) => handleInputChange(e)}></textarea>
            <button
              type="submit"
              className="btn border bg-dark text-white text-uppercase">
              Submit
            </button>
          </form>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Contact;
