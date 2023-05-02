import { Routes, Route } from "react-router-dom";
import ComplaintDashboard from "../admin/ComplaintDashboard";
import AdminDetailPage from "../admin/AdminDetailPage";
import AdminResolvePage from "../admin/AdminResolvePage";
import AdminCancelPage from "../admin/AdminCancelPage";

function AdminAuthenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComplaintDashboard />} />
        <Route path="/detail" element={<AdminDetailPage />} />
        <Route path="/resolve" element={<AdminResolvePage />} />
        <Route path="/cancel" element={<AdminCancelPage />} />
      </Routes>
    </>
  );
}

export default AdminAuthenticated;
