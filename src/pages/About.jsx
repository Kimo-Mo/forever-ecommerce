import NewsLetter from "../components/NewsLetter";
import SectionTitle from "../components/SectionTitle";

const About = () => {
  return (
    <div className="border-top">
      <SectionTitle text1="ABOUT" text2="US" />
      <div className="d-flex flex-column flex-lg-row align-items-center gap-5 my-5">
        <img className="aboutImg" src="/imgs/about_img.png" alt="about image" />
        <div className=" d-flex flex-column gap-4">
          <p className="m-0">
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="m-0">
            Since our inception, we&apos;ve worked tirelessly to curate a
            diverse selection of high-quality products that cater to every taste
            and preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h5 className="m-0">Our Mission</h5>
          <p className="m-0">
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We&apos;re dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="d-flex align-items-center py-4 gap-3">
        <h4 className="m-0">
          <span className="text-secondary">WHY </span> CHOOSE US
        </h4>
        <p
          className="m-0"
          style={{
            width: "2rem",
            height: "2px",
            backgroundColor: "black",
          }}></p>
      </div>
      <div
        className="d-flex flex-column flex-md-row"
        style={{ marginBottom: "5rem" }}>
        <div className="border text-center p-5 rounded">
          <h6>Quality Assurance:</h6>
          <p className="m-0 text-secondary" style={{ fontSize: "0.875rem" }}>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border text-center p-5 rounded">
          <h6>Convenience:</h6>
          <p className="m-0 text-secondary" style={{ fontSize: "0.875rem" }}>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border text-center p-5 rounded">
          <h6>Exceptional Customer Service:</h6>
          <p className="m-0 text-secondary" style={{ fontSize: "0.875rem" }}>
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
