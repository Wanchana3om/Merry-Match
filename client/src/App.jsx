import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
import { useNavigate } from "react-router-dom";

const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

function App() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const token = localStorage.getItem("token");

      if (!isTokenValid(token)) {
        alert("Your session has expired. Please log in again.");
        setTokenValid(false);
        auth.logout();
        navigate("/login");
      }
    }
  }, [auth, navigate]);

  return auth.isAuthenticated && tokenValid ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
}

export default App;
