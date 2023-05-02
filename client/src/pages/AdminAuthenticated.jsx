import { Routes, Route } from "react-router-dom";
import AdminPendingPage from "./AdminPendingPage";
import AdminCancelPage from "./AdminCancelPage";
import AdminResolvePage from "./AdminResolvePage";
import ComplaintList from "./ComplaintList";

function AdminAuthenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComplaintList />} />
        <Route path="/pending" element={<AdminPendingPage />} />
        <Route path="/cancel" element={<AdminCancelPage />} />
        <Route path="/resolve" element={<AdminResolvePage />} />
      </Routes>
    </>
  );
}

export default AdminAuthenticated;
