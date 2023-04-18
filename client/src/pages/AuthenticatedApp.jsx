import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MatchingPage from "./MatchingPage";
import MerryList from "./MerryList";
import OwnerProfile from "./OwnerProfile";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/merrylist" element={<MerryList />} />
        <Route path="/owner" element={<OwnerProfile />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
