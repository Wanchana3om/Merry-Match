import AdminSidebar from "./AdminSidebar";
import Detail from "./Detail";

function AdminDetailPage() {
  return (
    <div className="flex">
      <AdminSidebar />
      <Detail />
    </div>
  );
}

export default AdminDetailPage;