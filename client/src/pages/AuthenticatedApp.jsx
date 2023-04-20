import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import MatchingPage from "./MatchingPage";
import MerryList from "./MerryList";
import OwnerProfile from "./OwnerProfile";
import MerryPackage from "./MerryPackage";
import Payment1 from "./Payment1";
import Payment2 from "./Payment2";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/matching" element={<MatchingPage/>} />
        <Route path="/merrylist" element={<MerryList/>} />
        <Route path="/ownerprofile" element={<OwnerProfile/>} />
        <Route path="/merrypackage" element={<MerryPackage/>} />
        <Route path="/payment1" element={<Payment1/>} />
        <Route path="/payment2" element={<Payment2/>} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
