function Cancel() {
  return (
    <div className="font-nunito w-full ">
      <nav className="flex justify-between items-center py-4 px-16 bg-white  border-[1px] border-[#D6D9E4]">
        <div className=" flex gap-7 items-center">
          <img src="/admin/arrow.svg" alt="back" />
          <h1 className="text-2xl font-bold">I was insulted by Ygritte</h1>
          <p className="text-[#646D89] bg-[#F1F2F6] py-1 px-2.5 w-25 rounded-[8px]">
            Cancel
          </p>
        </div>
      </nav>
      <div className="p-20">
        <div className="flex flex-col gap-9 bg-white pt-[40px] px-[100px] pb-[60px] border-[1px] border-[#E6E7EB] rounded-[16px]">
          <div className="flex items-center gap-3">
            <h1 className="text-[#646D89] text-[20px]">Complaint by:</h1>
            <p>Jon Snow</p>
          </div>
          <div className="border-[1px] border-[#E4E6ED]"></div>
          <div>
            <h1 className="text-[#646D89] text-[20px]">Issue</h1>
            <p>I was insulted by Ygritte</p>
          </div>
          <div>
            <h1 className="text-[#646D89] text-[20px]">Description</h1>
            <p>
              Hello, there was a ploblem with user ‘Ygritte’ who insult me. Can
              you check her out?
            </p>
          </div>
          <div>
            <h1 className="text-[#646D89] text-[20px]">Date Submitted</h1>
            <p>12/02/2022</p>
          </div>
          <div className="border-[1px] border-[#E4E6ED]"></div>
          <div>
            <h1 className="text-[#646D89] text-[20px]">Canceled date</h1>
            <p>15/02/2022 10:30PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
