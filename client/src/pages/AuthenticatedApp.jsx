import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MatchingPage from "./MatchingPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/match" element={<MatchingPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
