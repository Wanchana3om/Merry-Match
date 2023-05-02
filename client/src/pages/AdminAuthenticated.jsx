import { Routes, Route } from "react-router-dom";
import DetailPage from "./DetailPage";

import ComplaintList from "./ComplaintList";

function AdminAuthenticated() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ComplaintList />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default AdminAuthenticated;
