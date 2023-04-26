import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Homepage from "./Homepage";
import MatchingPage from "./MatchingPage";
import MerryList from "./MerryList";
import OwnerProfile from "./OwnerProfile";
import MerryPackage from "./MerryPackage";
import Payment1 from "./Payment1";
import Payment2 from "./Payment2";

const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};

function AuthenticatedApp() {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
      alert("Your session has expired. Please log in again.");
      setTokenValid(false);
      navigate("/login");
    }
  }, [navigate]);

  if (!tokenValid) {
    return null;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/merrylist" element={<MerryList />} />
        <Route path="/ownerprofile" element={<OwnerProfile />} />
        <Route path="/merrypackage" element={<MerryPackage />} />
        <Route path="/payment1" element={<Payment1 />} />
        <Route path="/payment2" element={<Payment2 />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
