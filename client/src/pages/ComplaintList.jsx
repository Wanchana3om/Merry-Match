import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import AdminSidebar from "../components/AdminSidebar";


function ComplaintList() {
  const [complaintData, setComplaintData] = useState([]);
  const { state } = useAuth();
  // console.log(complaintData[0].com_title);

  const fetchComplaint = async () => {
    try {
      const adminId = state?.user?.admin_id; 
      // console.log(adminId);
      
      if (state?.user?.role === "admin") {
        const complaintResponse = await axios.get(`http://localhost:3000/complaint/${adminId}`);
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
    <AdminSidebar/>
    <div className="font-nunito w-full ">
      
      <nav className="flex justify-between items-center py-4 px-16 bg-white  border-[1px] border-[#D6D9E4]">
        <h1 className="text-2xl font-bold">Complaint list</h1>
        <div className="flex gap-3">
          <div className="flex gap-3 border-[1px] border-[#CCD0D7] py-3 px-4 rounded-[8px]">
            <img src="/admin/search.svg" alt="search" />
            <input type="text" placeholder="Search..." className="outline-none" />
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
      {complaintData.map((user, index) => (
        <div className="flex justify-between border-b-2 border-[#F1F2F6]" key={index}>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tl-xl">{user.com_title}</p>
            <p className="bg-white p-8">sdfc</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Issue</p>
            <p className="bg-white p-8">hhh</p>
          </div>
          <div className=" w-2/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Description</p>
            <p className="bg-white p-8">hhhh</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Date Submitted</p>
            <p className="bg-white p-8">hhhh</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tr-xl">Status</p>
            <div className="bg-white p-8">
              <p className="text-[#7B4429] bg-[#FAF1ED] py-1 px-2.5 w-20 rounded-[8px]">
               hhhh
              </p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
    </div>
  );
}

export default ComplaintList;
