/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
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
  let AdminUser = {
    username: "Kareem",
    email: "kimomo844@gmail.com",
    password: "KimoMo192",
  };
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = storedUsers.some(
      (user) => user.email === AdminUser.email
    );
    if (!adminExists) {
      storedUsers.push(AdminUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));
    }
  }, [AdminUser]);
  function validateUsername(username) {
    return username.length > 3 && username !== "";
  }
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  function handleSubmitForm() {
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

    if (formIsValid) {
      const userData = {
        username: formInputs.username,
        email: formInputs.email,
        password: formInputs.password,
      };
      // Handle SIGN UP
      if (currentState === "SIGN UP") {
        // Get the users array from localStorage or initialize an empty array
        let allUsers = JSON.parse(localStorage.getItem("users")) || [];
        // Check if email is already registered
        const userExists = allUsers.some(
          (storedUser) => storedUser.email === formInputs.email
        );
        if (
          userExists ||
          (userData.email === AdminUser.email &&
            userData.password === AdminUser.password)
        ) {
          toast.error("Email already registered. Please log in.");
        } else {
          allUsers.push(userData); // Add new user to the array
          localStorage.setItem("users", JSON.stringify(allUsers)); // Save updated array to localStorage
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          localStorage.setItem("username", JSON.stringify(userData.username));
          toast.success("User registered successfully!");
          navigate("/");
        }
      } else {
        // Handle LOGIN
        const savedUsers = JSON.parse(localStorage.getItem("users"));
        if (savedUsers) {
          // Check if the email exists in the savedUsers array
          const matchingUser = savedUsers.find(
            (storedUser) => storedUser.email === formInputs.email
          );

          if (matchingUser) {
            // If the email exists, check the password
            if (matchingUser.password === formInputs.password) {
              if (
                userData.email === AdminUser.email &&
                userData.password === AdminUser.password
              ) {
                localStorage.setItem("isAdminUser", JSON.stringify(true));
              }
              setIsLoggedIn(true);
              localStorage.setItem("isLoggedIn", JSON.stringify(true));
              toast.success("User logged in successfully!");
              localStorage.setItem(
                "username",
                JSON.stringify(matchingUser.username)
              );
              navigate("/");
            } else {
              // Email exists, but password is incorrect
              toast.error("Incorrect password.");
            }
          } else {
            // No registered user with the provided email
            toast.error("No registered user found. Please sign up.");
          }
        } else {
          toast.error("No registered user found. Please sign up.");
        }
      }
    }
  }

  // Handle input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  }

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
        <form
          className="loginForm d-flex flex-column align-items-center mx-auto mt-4 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm();
          }}>
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
                currentState === "SIGN UP"
                  ? setCurrentState("LOGIN")
                  : setCurrentState("SIGN UP");
              }}>
              {currentState === "SIGN UP" ? "Login" : "Sign Up"} here
            </p>
          </div>

          <button type="submit" className="btn bg-dark text-light py-2 px-5">
            {currentState}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
