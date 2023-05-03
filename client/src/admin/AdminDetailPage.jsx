import { useState, useEffect } from "react";
import ResolvePopup from "./ResolvePopup";
import CancelPopup from "./CancelPopup";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import Loading from "../components/loading";

function AdminDetailPage() {
  // -----------resovle--------------
  const [resolve, setResolve] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [issue, setIssue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("");
 const { userParam, isLoading, setIsLoading }= useAuth()

  const getComplaint = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true)
      try {
        
        const userDataFromToken = jwtDecode(token);
        const result = await axios.get(
          `http://localhost:3000/complaint/${userDataFromToken.admin_id}/${userParam}`
        );

        console.log(result);
        setName(result.data[0].user_id);
        setStatus(result.data[0].com_status);
        setIssue(result.data[0].com_title);
        setDescription(result.data[0].com_description);
        setDate(result.data[0].com_date);

        setIsLoading(false);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };


  const submitResolve = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true)
      try {
        const userDataFromToken = jwtDecode(token);
        const result = await axios.put(
          `http://localhost:3000/complaint/${userDataFromToken.admin_id}/${userParam}`,{status}
        );

        console.log(result);
        setName(result.data[0].user_id);
        setStatus(result.data[0].com_status);
        setIssue(result.data[0].com_title);
        setDescription(result.data[0].com_description);
        setDate(result.data[0].com_date);
        setNewDate(result.data[0].com_date);

        setIsLoading(false);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };


  const submitCancel = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true)
      try {
        const userDataFromToken = jwtDecode(token);
        const result = await axios.put(
          `http://localhost:3000/complaint/${userDataFromToken.admin_id}/${userParam}`,{status}
        );

        console.log(result);
        setName(result.data[0].user_id);
        setStatus(result.data[0].com_status);
        setIssue(result.data[0].com_title);
        setDescription(result.data[0].com_description);
        setDate(result.data[0].com_date);
        setNewDate(result.data[0].com_date);

        setIsLoading(false);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };

  console.log(name);
  console.log(status);
  console.log(issue);
  console.log(description);
  console.log(date);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    getComplaint();
  }, []);

  const handleResolve = (event) => {
    event.preventDefault();
    setResolve(!resolve);
  };

  const handleClosePopupResolve = () => {
    setResolve(false);
  };
  // -------------cancel-------------------
  const [cancel, setCancel] = useState(false);

  const handleCancel = (event) => {
    event.preventDefault();
    setCancel(!cancel);
  };

  const handleClosePopupCancel = () => {
    setCancel(false);
  };

  return (
    <div className="flex w-screen">
       {isLoading && <Loading />}
      <AdminSidebar />
      {resolve && <ResolvePopup handleClose={handleClosePopupResolve} />}
      {cancel && <CancelPopup handleClose={handleClosePopupCancel} />}
      <div className="font-nunito w-full ">
        <nav className="flex justify-between items-center py-4 h-[80px] px-16 bg-white  border-[1px] border-[#D6D9E4]">
          <div className=" flex gap-7 items-center">
            <Link to="/">
              <button href="/">
                <img src="/admin/arrow.svg" alt="back" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold">I was insulted by Ygritte</h1>

            <p
              className={` py-1 px-2.5 rounded-[8px] ${
                status === "Pending"
                  ? "bg-[#FFF6D4] text-[#393735]" 
                  : status === "Cancel"
                  ? "text-[#646D89] bg-[#F1F2F6]"
                  : status === "Resolved"
                  ? "text-[#197418] bg-[#E7FFE7]"
                  : ""
              }`}
            >
              {status}
            </p>
          </div>
          <div className={`${status === "Pending" ? "flex" : "hidden"}  gap-3`}>
            <button
              className=" text-[#C70039] font-bold py-3 px-4 rounded-full hover:underline"
              onClick={handleCancel}
            >
              Cancel Complaint 
            </button>
            <button
              className=" text-white bg-[#C70039] py-3 px-4 rounded-full hover:bg-[#FF1659]"
              onClick={handleResolve}
            >
              Resolve Complaint
            </button>
          </div>
        </nav>
        <div className="p-20">
          <div className="flex flex-col gap-9 bg-white pt-[40px] px-[100px] pb-[60px] border-[1px] border-[#E6E7EB] rounded-[16px]">
            <div className="flex items-center gap-3">
              <h1 className="text-[#646D89] text-[20px]">Complaint by:</h1>
              <p>{name}</p>
            </div>
            <div className="border-[1px] border-[#E4E6ED]"></div>
            <div>
              <h1 className="text-[#646D89] text-[20px]">Issue</h1>
              <p>{issue}</p>
            </div>
            <div>
              <h1 className="text-[#646D89] text-[20px]">Description</h1>
              <p>{description}</p>
            </div>
            <div>
              <h1 className="text-[#646D89] text-[20px]">Date Submitted</h1>
              <p>{formatDate(date)}</p>
            </div>
            <div className={`${status === "Pending" ? "hidden"  : ""} border-[1px] border-[#E4E6ED]`}></div>
          <div className={`${status === "Pending" ? "hidden"  : ""}`}>
            <h1 className="text-[#646D89] text-[20px]">Resolved date</h1>
            <p>15/02/2022 10:30PM</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDetailPage;