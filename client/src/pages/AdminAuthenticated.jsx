import { Routes, Route } from "react-router-dom";
import AdminPendingPage from "./AdminPendingPage";
import ComplaintList from "./ComplaintList";

function AdminAuthenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComplaintList />} />
        <Route path="/detail" element={<AdminPendingPage />} />
      </Routes>
    </>
  );
}

export default AdminAuthenticated;
