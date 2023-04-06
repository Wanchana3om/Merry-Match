import Navigationbar from "../components/Navigationbar";
import RegisterForm1 from "../components/RegisterForm1";

function Registerpage() {
  return (
    <div>
      <Navigationbar />
      <div className="font-Poppins relative w-screen h-fit px-[255px] py-12 bg-[#FCFCFE] flex items-center">
        <div className="bg-[#FAF1ED] absolute h-[100px] w-[100px] rounded-full top-[85px] left-[-19px]" />
        <div className="bg-[#7B4429] absolute h-[8px] w-[8px] rounded-full top-[210px] left-[81px]" />
        <div className="bg-[#FAF1ED] absolute h-[8px] w-[8px] rounded-full top-[605px] right-[1px]" />
        <div className="text-container flex flex-col w-1/2 h-1/3 pt-6">
          <h1 className="text-[#7B4429]">REGISTER</h1>
          <h2 className="text-[#A62D82] text-[46px] font-extrabold">
            Join us and start <br /> matching
          </h2>
        </div>
        <div className="tabs-container rounded-2xl tabs-container flex gap-4 w-1/2 h-full justify-items-center items-center">
          <div className="border-4 border-[#E4E6ED] px-[16px] w-auto h-[80px] rounded-[16px] flex justify-evenly items-center">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row justify-center items-center text-[#A62D82] font-bold text-[24px]">
              1
            </div>
            <div>
              <div className="text-[12px] px-[16px] font-medium text-[#646D89]">
                Step 1/3
              </div>
              <div className="text-base px-[16px] font-extrabold text-[#A62D82]">
                Basic Information
              </div>
            </div>
          </div>
          <div className="border-4 border-[#E4E6ED] w-[80px] h-[80px] rounded-[16px] flex flex-row justify-center items-center ">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row justify-center items-center text-[#9AA1B9] font-bold text-[24px]">
              2
            </div>
          </div>
          <div className="border-4 border-[#E4E6ED] w-[80px] h-[80px] rounded-[16px] flex flex-row justify-center items-center">
            <div className="w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row items-center  justify-center text-[#9AA1B9] font-bold text-[24px]">
              3
            </div>
          </div>
        </div>
      </div>
      <RegisterForm1 />
      {/* <div className="info-container">
        <div className="info-container-left"></div>
      </div> */}
      <div className="relative z-30 w-full border-t-2">
        <div className="w-[77%] flex flex-row justify-between items-center h-auto py-5 bg-white mx-auto ">
          <nav className="">
            <a href="#" className=" font-[400] text-base text-[#646D89]">
              1/3
            </a>
          </nav>
          <nav>
            <div className="flex flex-row mx-3">
              <div className="m-3 text-base font-bold hover:text-[#191C77]">
                <img src="/Vector.png" alt="" />
                <a
                  href="#"
                  class="text-[#C8CCDB] font-semibold mr-[17px] font-weight: bold; hover:text-[#191C77]"
                >
                  Back
                </a>
              </div>
              <button class="bg-red-500 hover:bg-red-600 text-white font-bold  px-6 rounded-full">
                Next step
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
