import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import AdminSidebar from "../components/AdminSidebar";
import { Link } from "react-router-dom";


function ComplaintList() {
  const [complaintData, setComplaintData] = useState([]);
  const { state } = useAuth();
  // console.log(complaintData[0].com_title); 

  const fetchComplaint = async () => {
    try {
      const adminId = state?.user?.admin_id;
      // console.log(adminId);

      if (state?.user?.role === "admin") {
        const complaintResponse = await axios.get(
          `http://localhost:3000/complaint/${adminId}`
        );
        setComplaintData(complaintResponse.data);
        // console.log(complaintResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  console.log(complaintData);
  useEffect(() => {
    fetchComplaint();
  }, []);

  return (
    <div className="flex w-screen">
      <AdminSidebar />
      <div className="font-nunito w-full bg-[#F6F7FC]">
        <nav className="flex justify-between items-center py-4 px-16 bg-white  border-[1px] border-[#D6D9E4]">
          <h1 className="text-2xl font-bold">Complaint list</h1>
          <div className="flex gap-3">
            <div className="flex gap-3 border-[1px] border-[#CCD0D7] py-3 px-4 rounded-[8px]">
              <img src="/admin/search.svg" alt="search" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none"
              />
            </div>
            <select
              name="status"
              className="py-3 px-4 border-[1px] border-[#CCD0D7] rounded-[8px] text-[#9AA1B9]"
              onChange={(e) => e.target.classList.add("text-black")}
            >
              <option value="">All status</option>
              <option value="">New</option>
              <option value="">Pending</option>
              <option value="">Resolved</option>
              <option value="">Cancel</option>
            </select>
          </div>
        </nav>
        <div className="p-20">
          <div className="flex justify-between ">
            <p className="w-1/3 bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tl-xl">
              user
            </p>
            <p className="w-1/3 bg-[#D6D9E4] text-[#424C6B] p-2">Issue</p>
            <p className="w-2/3 bg-[#D6D9E4] text-[#424C6B] p-2">Description</p>
            <p className="w-1/3 bg-[#D6D9E4] text-[#424C6B] p-2">
              Date Submitted
            </p>
            <p className=" w-1/3 bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tr-xl text-center">
              Status
            </p>
          </div>
          {complaintData.map((user, index) => (
            <Link to="/detail" key={index}>
            <div
              
              className="flex justify-between border-b-2 border-[#F1F2F6] bg-white hover:bg-[#F1F2F6]"
            >
              <p className="w-1/3 p-8">jack</p>
              <p className="w-1/3 py-8">{user.com_title}</p>
              <p className="w-2/3 py-8">{user.com_description}</p>
              <p className="w-1/3 py-8">{user.com_date}</p>
              <div className="w-1/3 flex items-center justify-center ">
              <p
                className={` py-1 px-2.5 w-20 rounded-[8px] 
                ${user.com_status === "New" ? "bg-[#FAF1ED] text-[#7B4429] w-14" 
                : user.com_status === "Pending" ? "bg-[#FFF6D4] text-[#393735] w-24"
                : user.com_status === "Resolved" ? "bg-[#E7FFE7] text-[#197418] w-24"
                : user.com_status === "Cancel" ? "bg-[#F1F2F6] text-[#646D89] w-20" : ""}`}
              >
                {user.com_status}
              </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>

  );
}

export default ComplaintList;
