import LoginPage from "./Loginpage";
import Homepage from "./Homepage";
import RegisterPage from "./Registerpage";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminSidebar />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
