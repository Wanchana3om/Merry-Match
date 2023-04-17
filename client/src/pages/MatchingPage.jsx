
import NavigationbarUser from "../components/NavigationbarUser";

function MatchingPage() {
  return (
    <>
      <NavigationbarUser />
      <div className="font-Poppins  grid grid-cols-5 mx-auto w-[1440px] h-[936px]">
        <div className="grid grid-rows-4 ">
          <div className="border-b border-solid border-gray-400 ">
            <div className="flex flex-col justify-center items-center p-6 gap-1 bg-[#F6F7FC] border-[1px] border-[#A62D82] rounded-2xl mt-[26px] ">
              <img src="/matching/search_heart.png" alt="search heart" />
              <h1 className="text-[#95002B] font-bold text-xl">
                Discover New Match
              </h1>
              <p className="text-[#646D89] text-center text-sm">
                Start find and Merry to get know <br /> and connect with new
                friend!
              </p>
            </div>
          </div>
          <div className="pt-10 row-span-3">
            <h1 className="font-bold text-lg">Merry Match!</h1>
            <div className="flex flex-row gap-3 py-6">
              <img src="" alt="" className=" w-[100px] h-[100px] border-[1px] border-[#A62D82] rounded-2xl"/>
              <img src="" alt="" className=" w-[100px] h-[100px] border-[1px] border-[#A62D82] rounded-2xl"/>
            </div>
            <h1 className="font-bold text-lg">Chat with Merry Match</h1>
            <div className="flex flex-row justify-evenly py-6">
              <img src="" alt="" className="w-[60px] h-[60px] border-[1px] border-[#A62D82] rounded-full"/>
              <div>
                <p className="font-bold">Ygritte</p>
                <p>You know nothing Jon Snow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-500 col-span-3"></div>

        <div className=" flex flex-col items-center ">
          <div className="basis-2/3 flex flex-col gap-10 border-b border-solid border-gray-400 ">
            <div className="mt-6 flex flex-col gap-5">
              <h1 className="text-[#191C77] font-bold">Search by Keywords</h1>
              <input
                placeholder="Search..."
                type="text"
                className="py-3 px-4 border-[1px] border-[#CCD0D7] rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[#191C77] font-bold">Sex you interest</h1>
              <form>
                <input type="checkbox" id="sex1" name="sex1" value="Default" />
                <label for="sex1"> Default</label>
                <br />
                <input type="checkbox" id="sex2" name="sex2" value="Female" />
                <label for="sex2"> Female</label>
                <br />
                <input
                  type="checkbox"
                  id="sex3"
                  name="sex3"
                  value="Non-bunary people"
                />
                <label for="sex3"> Non-bunary people</label>
              </form>
            </div>
            <div className="flex flex-col gap-6">
              <label for="age-range" className="text-[#191C77] font-bold">Age Range</label>
              <input
                type="range"
                id="age-range"
                name="age-range"
                min="18"
                max="60"
                className="block w-full h-1 mt-1 bg-gray-300 rounded-md appearance-none focus:outline-none "
              />
              <div className="flex justify-evenly items-center">
                <input type="number" className="border-[1px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"/>
                <p> - </p>
                <input type="number" className="border-[1px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"/>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-6">
            <h1 className="py-3 px-6 text-[#C70039] hover:underline hover:text-[#FF1659] hover:cursor-pointer">
              Clear
            </h1>
            <button className="py-3 px-6 bg-[#C70039] rounded-[99px] text-white hover:bg-[#FF1659]">
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchingPage;
