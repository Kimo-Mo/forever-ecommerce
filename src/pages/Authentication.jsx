import { useState } from "react";
import { useAuth } from "../customs/useAuth";

const Authentication = () => {
  const { signup, login, isLoading } = useAuth();
  const [currentState, setCurrentState] = useState("LOGIN");
  const [formInputs, setFormInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  function validateUsername(username) {
    return username.trim().length > 3;
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {
      username: false,
      email: false,
      password: false,
    };

    // Validate inputs
    if (currentState === "SIGN UP" && !validateUsername(formInputs.username)) {
      formIsValid = false;
      newErrors.username = true;
    }
    if (!validateEmail(formInputs.email)) {
      formIsValid = false;
      newErrors.email = true;
    }
    if (!validatePassword(formInputs.password)) {
      formIsValid = false;
      newErrors.password = true;
    }
    setErrors(newErrors);
    if (!formIsValid) return;
    try {
      if (currentState === "SIGN UP") {
        await signup(
          formInputs.email,
          formInputs.password,
          formInputs.username
        );
      } else if (currentState === "LOGIN") {
        await login(formInputs.email, formInputs.password);
      }
    } catch (error) {
      console.error("Error setting persistence:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  return (
    <div className="pt-5 border-top">
      <div>
        <div className="d-flex align-items-center justify-content-center py-4 gap-3 ">
          <h2 className="loginTitle m-0">{currentState}</h2>
          <p
            className="m-0"
            style={{
              width: "2rem",
              height: "2px",
              backgroundColor: "black",
            }}></p>
        </div>
        <form className="loginForm d-flex flex-column align-items-center mx-auto mt-4 gap-4">
          {currentState === "SIGN UP" && (
            <div className="w-100">
              <input
                type="text"
                name="username"
                placeholder="User Name"
                className="form-control"
                value={formInputs.username}
                onChange={handleInputChange}
              />
              {errors.username && (
                <p className="text-danger text-capitalize mb-0 ps-2">
                  Username must be more than 3 characters
                </p>
              )}
            </div>
          )}

          <div className="w-100">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control"
              value={formInputs.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-danger text-capitalize mb-0 ps-2">
                Invalid email format!
              </p>
            )}
          </div>

          <div className="w-100">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={formInputs.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-danger text-capitalize mb-0 ps-2">
                Password must be at least 6 characters and include a number
              </p>
            )}
          </div>

          <div className="d-flex justify-content-between w-100 text-capitalize">
            <p>Forgot your password?</p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCurrentState((prev) =>
                  prev === "SIGN UP" ? "LOGIN" : "SIGN UP"
                );
              }}>
              {currentState === "SIGN UP" ? "Login" : "Sign Up"} here
            </p>
          </div>

          <button
            type="submit"
            className="btn bg-dark text-light py-2 px-5"
            disabled={isLoading}
            onClick={handleSubmitForm}>
            {isLoading ? "Processing..." : currentState}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
