import { useState } from "react";
import Navigationbar from "../components/Navigationbar";
import RegisterForm1 from "../components/RegisterForm1";
import RegisterForm2 from "../components/RegisterForm2";
import RegisterForm3 from "../components/RegisterForm3";

function Registerpage() {
  const [currentFormPage, setCurrentFormPage] = useState(1);
  const handleNextStep = () => {
    if (currentFormPage === 3) {
      return null;
    } else {
      setCurrentFormPage(currentFormPage + 1);
    }
  };
  const handleBack = () => {
    if (currentFormPage != 1) {
      setCurrentFormPage(currentFormPage - 1);
    } else {
      return null;
    }
  };
  let [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <Navigationbar />
      <div className="font-Poppins relative w-screen h-fit px-[255px] py-12 bg-[#FCFCFE] flex items-center">
        <div className="bg-[#FAF1ED] absolute h-[100px] w-[100px] rounded-full top-[85px] left-[-19px]" />
        <div className="bg-[#7B4429] absolute h-[8px] w-[8px] rounded-full top-[210px] left-[81px]" />
        <div className="bg-[#FAF1ED] absolute h-[8px] w-[8px] rounded-full top-[605px] right-[1px]" />
        <div className="text-container flex flex-col w-1/2 h-1/3 pt-6 mt-[29px]">
          <h1 className="text-[#7B4429]">REGISTER</h1>
          <h2 className="text-[#A62D82] text-[46px] font-extrabold">
            Join us and start <br /> matching
          </h2>
        </div>
        <div className="tabs-container rounded-2xl tabs-container flex gap-4 w-1/2 h-full justify-items-center items-center">
          <div
            className={`border-4 border-[#E4E6ED] px-[16px] ${
              currentFormPage === 1 ? "w-auto" : "w-[80px]"
            } h-[80px] rounded-[16px] flex justify-evenly items-center`}
          >
            <div
              className={`w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row justify-center items-center font-bold text-[24px] ${
                currentFormPage === 1 ? "text-[#A62D82]" : "text-[#9AA1B9]"
              }`}
            >
              1
            </div>
            <div className={`${currentFormPage > 1 ? "hidden" : ""}`}>
              <div className="text-[12px] px-[16px] font-medium text-[#646D89]">
                Step {currentFormPage}/3
              </div>
              <div className="text-base px-[16px] font-extrabold text-[#A62D82]">
                Basic Information
              </div>
            </div>
          </div>
          <div
            className={`border-4 border-[#E4E6ED] h-[80px] rounded-[16px] flex flex-row justify-center items-center ${
              currentFormPage === 2 ? "w-auto px-3" : "w-[80px]"
            }`}
          >
            <div
              className={`w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row justify-center items-center text-[#9AA1B9] font-bold text-[24px] ${
                currentFormPage === 2 ? "text-[#A62D82]" : "text-[#9AA1B9]"
              }`}
            >
              2
            </div>
            <div className={`${currentFormPage != 2 ? "hidden" : ""}`}>
              <div className="text-[12px] px-[16px] font-medium text-[#646D89]">
                Step {currentFormPage}/3
              </div>
              <div className="text-base px-[16px] font-extrabold text-[#A62D82]">
                Identities and Interests
              </div>
            </div>
          </div>
          <div
            className={`border-4 border-[#E4E6ED] w-[80px] h-[80px] rounded-[16px] flex flex-row justify-center items-center ${
              currentFormPage === 3 ? "w-auto px-3" : "w-[80px]"
            }`}
          >
            <div
              className={`w-[48px] h-[48px] rounded-[16px] bg-[#F1F2F6] flex flex-row items-center  justify-center text-[#9AA1B9] font-bold text-[24px] ${
                currentFormPage === 3 ? "text-[#A62D82]" : "text-[#9AA1B9]"
              }`}
            >
              3
            </div>
            <div className={`${currentFormPage != 3 ? "hidden" : ""}`}>
              <div className="text-[12px] px-[16px] font-medium text-[#646D89]">
                Step {currentFormPage}/3
              </div>
              <div className="text-base px-[16px] font-extrabold text-[#A62D82]">
                Upload Photos
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentFormPage === 1 && <RegisterForm1 />}
      {currentFormPage === 2 && <RegisterForm2 />}
      {currentFormPage === 3 && <RegisterForm3 />}
      <div className="relative z-30 w-full border-t-2">
        <div className="w-[77%] flex flex-row justify-between items-center h-auto py-5 bg-white mx-auto ">
          <nav className="">
            <a href="#" className=" font-[400] text-base text-[#646D89]">
              {currentFormPage}/3
            </a>
          </nav>
          <nav>
            <div className="flex flex-row mx-3">
              <div className="m-3 text-base font-bold hover:text-[#191C77]">
                <img src="/Vector.png" alt="" />
                <button
                  onClick={handleBack}
                  className="text-[#C8CCDB] font-semibold mr-[17px] font-weight: bold; hover:text-[#191C77]"
                >
                  Back
                </button>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold  px-6 rounded-full"
                onClick={handleNextStep}
              >
                {currentFormPage === 3 ? "Confirm" : "Next step"}
              </button>
            </div>
          </nav>
        </div>
      </div>
      {/* <DraggableList /> */}
    </div>
  );
}

export default Registerpage;
