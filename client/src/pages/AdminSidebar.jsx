import Cancel from "../admin/Cancel";
import ComplaintList from "../admin/ComplaintList";
import Detail from "../admin/Detail";
import Resolve from "../admin/Resolve";


function AdminSidebar() {
  return (
    <div className="font-nunito flex bg-[#F6F7FC] h-screen">
      <div className="bg-white flex flex-col justify-between items-center w-72 h-full border-[1px] border-[#D6D9E4]">
        <div className="flex flex-col justify-around items-center p-6 h-[135px] mb-14">
          <div>
            <span className="text-black font-semibold text-4xl">Merry</span>
            <span className="text-red-500 font-bold text-4xl">Match</span>
          </div>
          <p className="text-[#646D89]">Admin Panel Control</p>
        </div>
        <div className="flex  items-start h-[540px] w-full ">
          <div className="flex justify-center gap-5 p-6 w-full cursor-pointer hover:bg-[#F1F2F6]">
            <img src="/admin/!!!.svg" alt="!" />
            <p className="text-[#424C6B] font-bold">Complaint</p>
          </div>
        </div>
        <div className="flex gap-5 p-6 mb-32 cursor-pointer">
          <img src="/admin/logout.svg" alt="logout" />
          <p className="text-[#424C6B] font-bold hover:text-[#FFB1C8] hover:underline">Log out</p>
        </div>
      </div>
      <div className="w-full ">
        <ComplaintList />
        {/* <Detail /> */}
        {/* <Resolve /> */}
        {/* <Cancel /> */}
      </div>
    </div>
  );
}

export default AdminSidebar;
