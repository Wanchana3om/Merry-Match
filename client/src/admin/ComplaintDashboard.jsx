import AdminSidebar from "./AdminSidebar";
import ComplaintList from "./ComplaintList";

function ComplaintDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <ComplaintList />
    </div>
  );
}

export default ComplaintDashboard;