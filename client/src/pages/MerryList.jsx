import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";

function MerryList() {
  return (
    <>
      <NavigationbarUser />
      <div className="flex flex-col gap-28 font-Nunito h-fit px-[255px] py-12 bg-[#FCFCFE]  w-[1440px] mx-auto">
        <div className="flex flex-row justify-between items-center w-full ">
          <div>
            <h2 className="text-[#7B4429] text-sm">Merry list</h2>
            <h1 className="text-[#A62D82] text-[46px] font-extrabold">
              Let’s know each other <br />
              with Merry!
            </h1>
          </div>
          <div>
            <span className="text-[#646D89] text-base">Merry limit today</span>{" "}
            <span className="text-[#FF1659] text-base">2/20</span>
            <p className="text-[#646D89] text-base">Reset in 12h...</p>
          </div>
        </div>
        <div className="flex justify-between">
          <img
            src=""
            alt=""
            className="w-[187px] h-[187px] border-[1px] border-[#A62D82] rounded-3xl"
          />
          <div className="basis-2/4 flex flex-col gap-6">
            <div>
              <span className="text-[#2A2E3F] text-2xl">Daeny</span>{" "}
              <span className="text-[#646D89] text-2xl">24</span>{" "}
              <span className="text-[#646D89] text-base">
                Bangkok, Thailand{" "}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Sexual identities</p>
              <p className="text-[#646D89]">Female</p>
              <p>Sexual preferences</p>
              <p className="text-[#646D89]">Male</p>
              <p>Racial preferences</p>
              <p className="text-[#646D89]">Indefinite</p>
              <p>Meeting interests</p>
              <p className="text-[#646D89]">Long-term commitment</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-evenly items-center py-1 px-4 border-[1px] border-[#C70039] rounded-[99px] font-bold text-[#C70039]">
              <img
                src="/merrylist/merry match.png"
                className="h-[12px] w-[20.4px]"
              />
              <h1>Merry Match!</h1>
            </div>
            <div className="flex">
              <img src="/merrylist/message.png" alt="message" />
              <img src="/merrylist/action button.png" alt="view" />
              <img src="/merrylist/redheart.png" alt="match" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MerryList;
