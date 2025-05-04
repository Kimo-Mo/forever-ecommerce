import { createContext, useEffect, useState } from "react";
import auth from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setCurrentUser(user);
            setIsLoggedIn(true);
            const adminEmail = "kimomo844@gmail.com";
            setIsAdmin(user.email.toLowerCase() === adminEmail);
          } else {
            setCurrentUser(null);
            setIsLoggedIn(false);
            setIsAdmin(false);
          }
          setIsLoading(false);
        });
        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });
  }, []);
  const signup = async (email, password, username) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      setCurrentUser(userCredential.user);
      setIsLoggedIn(true);
      toast.success("Signed up successfully 🩷");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error signing up:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setIsLoggedIn(true);
      toast.success("Logged in successfully ✅");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    try {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
      await signOut(auth);
      toast.warn("Logged out! 👋");
      navigate("/Authentication", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getErrorMessage = (error) => {
    const errorCode = error?.code || error?.message;

    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      case "auth/too-many-requests":
        return "Too many unsuccessful attempts. Please try again later.";
      case "auth/operation-not-allowed":
        return "This operation is not allowed.";
      default:
        console.error("Unhandled Firebase Auth Error:", errorCode);
        return `Authentication error: ${
          error.message || errorCode || "Unknown error"
        }`;
    }
  };
  const value = {
    currentUser,
    signup,
    login,
    logout,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    isLoading,
    setIsLoading,
    getErrorMessage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
