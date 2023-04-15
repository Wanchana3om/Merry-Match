import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
// import "../App.css";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
