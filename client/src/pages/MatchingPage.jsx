import NavigationbarUser from "../components/NavigationbarUser";
import ProfilePopup from "../components/ProfilePopup";
import { useState } from "react";
function MatchingPage() {
  const [ageRange, setAgeRange] = useState(18);

  function handleAgeRangeChange(event) {
    setAgeRange(event.target.value);
  }

  return (
    <>
      <NavigationbarUser />
      <div className="font-Nunito mx-auto w-[1440px] h-[936px] flex flex-row">
        <div className="w-[316px]">
          <div className="w-[316px] border-b-[1px] border-gray-400">
            <div className="w-[282px] mx-auto py-[36px]">
              <div className="flex flex-col justify-center items-center p-6 gap-1 bg-[#F6F7FC] border-[1px] border-[#A62D82] rounded-2xl">
                <img src="/matching/vector (5).svg" alt="search heart" />
                <h1 className="text-[#95002B] font-bold text-xl">
                  Discover New Match
                </h1>
                <p className="text-[#646D89] text-center text-sm">
                  Start find and Merry to get know <br /> and connect with new
                  friend!
                </p>
              </div>
            </div>
          </div>
          <div className="w-[282px] mx-auto py-[36px]">
            <h1 className="font-bold text-lg">Merry Match!</h1>
            <div className="flex flex-row gap-3 py-6">
              <img
                src=""
                alt=""
                className=" w-[100px] h-[100px] border-[1px] rounded-2xl"
              />
              <img
                src=""
                alt=""
                className=" w-[100px] h-[100px] border-[1px] rounded-2xl"
              />
            </div>
          </div>
          <div className="w-[282px] mx-auto pt-[12px]">
            <h1 className="font-bold text-lg">Chat with Merry Match</h1>
            <div className="flex flex-row justify-evenly py-6">
              <img
                src=""
                alt=""
                className="w-[60px] h-[60px] border-[1px] border-[#A62D82] rounded-full"
              />
              <div>
                <p className="font-[400] text-[#2A2E3F] text-[16px]">Ygritte</p>
                <p className="font-[500] text-[#646D89] text-[14px]">
                  You know nothing Jon Snow
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-300 col-span-3 w-[904px]">
          <ProfilePopup />
        </div>

        <div className="   w-[220px] flex flex-row justify-center ">
          <div className=" flex flex-col items-center  w-[188px] mx-auto>">
            <div className="flex flex-col gap-10 mb-[170px]">
              <div className="mt-6 flex flex-col gap-5">
                <h1 className="text-[#191C77] font-bold">Search by Keywords</h1>
                <input
                  placeholder="   Search..."
                  type="text"
                  className="py-3 border-[1px] border-[#CCD0D7] rounded-lg"
                />
              </div>
              <div class="flex flex-col gap-3 ">
                <h1 class="text-[#191C77] font-bold">Sex you interest</h1>
                <div class="flex">
                  <input
                    type="checkbox"
                    id="sex1"
                    name="sex1"
                    value="Default"
                    class="w-[24px] h-[24px] rounded-lg"
                  />
                  <label for="sex1" class="ml-[12px] text-[#646D89]">
                    Default
                  </label>
                </div>
                <div class="flex mt-[16px]">
                  <input
                    type="checkbox"
                    id="sex2"
                    name="sex2"
                    value="Female"
                    class="w-[24px] h-[24px] rounded-lg"
                  />
                  <label for="sex2" class="ml-[12px] text-[#646D89]">
                    Female
                  </label>
                </div>
                <div class="flex mt-[16px]">
                  <input
                    type="checkbox"
                    id="sex3"
                    name="sex3"
                    value="Non-binary people"
                    class="w-[24px] h-[24px] rounded-lg"
                  />
                  <label for="sex3" class="ml-[12px] text-[#646D89]">
                    Non-binary people
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label for="age-range" className="text-[#191C77] font-bold">
                  Age Range
                </label>
                <input
                  type="range"
                  id="age-range"
                  name="age-range"
                  min="18"
                  max="100"
                  value={ageRange}
                  className="block w-full h-1 mt-1 bg-gray-300 rounded-md appearance-none focus:outline-none"
                  onInput={handleAgeRangeChange}
                />
                <div className="flex justify-evenly items-center">
                  <input
                    type="number"
                    id="min-age"
                    name="min-age"
                    value={ageRange}
                    className="border-[1px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"
                  />
                  <p> - </p>
                  <input
                    type="number"
                    id="max-age"
                    name="max-age"
                    value="100"
                    className="border-[1px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="w-[220px] flex justify-center items-center border-t-[1px] border-gray-400">
              <div className="flex justify-center items-center w-[188px]  pt-6 ">
                <h1 className="py-3 px-6 text-[#C70039] hover:underline hover:text-[#FF1659] hover:cursor-pointer">
                  Clear
                </h1>
                <button className="py-3 px-6 bg-[#C70039] rounded-[99px] text-white hover:bg-[#FF1659]">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchingPage;
