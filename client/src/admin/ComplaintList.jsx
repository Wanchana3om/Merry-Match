import { useState, useEffect } from "react";
import axios from "axios";

function ComplaintList() {
  const [complaintData, setComplaintData] = useState([]);

  const fetchComplaint = async () => {
    try {
      const adminId = "admin_id"; 
      const adminResponse = await axios.get(`http://localhost:3000/admins/${adminId}`);
      const isAdmin = adminResponse.data.role === "admin";
      console.log(adminResponse);
      
      if (isAdmin) {
        const complaintResponse = await axios.get(`http://localhost:3000/complaints`);
        setComplaintData(complaintResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchComplaint();
  }, []);

  return (
    <div className="font-nunito w-full ">
      <nav className="flex justify-between items-center py-4 px-16 bg-white  border-[1px] border-[#D6D9E4]">
        <h1 className="text-2xl font-bold">Complaint list</h1>
        <div className="flex gap-3">
          <div className="flex gap-3 border-[1px] border-[#CCD0D7] py-3 px-4 rounded-[8px]">
            <img src="/admin/search.svg" alt="search" />
            <input type="text" placeholder="Search..." class="outline-none" />
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
        <div className="flex justify-between border-b-2 border-[#F1F2F6]">
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tl-xl">User</p>
            <p className="bg-white p-8">Jon Snow</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Issue</p>
            <p className="bg-white p-8">I was insulted by Ygri...</p>
          </div>
          <div className=" w-2/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Description</p>
            <p className="bg-white p-8">Hello, there was a ploblem with user ‘Ygritte’ who in...</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2">Date Submitted</p>
            <p className="bg-white p-8">12/02/2022</p>
          </div>
          <div className=" w-1/3">
            <p className=" bg-[#D6D9E4] text-[#424C6B] p-2 rounded-tr-xl">Status</p>
            <div className="bg-white p-8">
              <p className="text-[#7B4429] bg-[#FAF1ED] py-1 px-2.5 w-20 rounded-[8px]">
                new
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintList;
