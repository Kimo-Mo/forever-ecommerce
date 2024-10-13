import "./Style/NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="text-center my-4">
      <h3>Subscribe now & get 20% off</h3>
      <p className="text-secondary">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="NewsLetterForm d-flex justify-content-center flex-column flex-md-row my-4 mx-auto">
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter Your Email"
        />
        <button>Subscribe</button>
      </form>
    </div>
  );
};

export default NewsLetter;
