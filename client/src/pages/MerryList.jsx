import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";
import axios from "axios";
import jwtDecode from "jwt-decode";

function MerryList() {
  const [usersData, setUsersData] = useState([]);

  const getMerryList = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);

        const result = await axios.get(
          `http://localhost:3000/merrylist/${userDataFromToken.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersData(result.data);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };
  useEffect(() => {
    getMerryList();
  }, []);

  return (
    <>
      <NavigationbarUser />
      <div className="flex flex-col gap-28 font-nunito h-fit px-[255px] py-12 bg-[#FCFCFE]  w-[1440px] mx-auto">
        <div className="flex flex-row justify-between items-center w-full ">
          <div>
            <h2 className="text-[#7B4429] text-sm">Merry list</h2>
            <h1 className="text-[#A62D82] text-[46px] font-extrabold">
              Let’s know each other <br />
              with Merry!
            </h1>
          </div>
          <div>
            <span className="text-[#646D89] text-base">Who do you want to match with?</span>
            <p className="text-[#FF1659] text-base">press now</p>
            <p className="text-[#646D89] text-base">you will be happy</p>
          </div>
        </div>
          {usersData.map((user, index) => (
        <div key={index} className="flex gap-10">
          <img
            src={user.pictures[0].pic_url}
            alt={user.name}
            className="object-cover w-[187px] h-[187px] border-[1px] border-[#A62D82] rounded-3xl"
          />
          <div className="basis-2/4 flex flex-col gap-6">
            <div className="flex gap-3 items-center">
              <span className="text-[#2A2E3F] text-2xl font-bold">{user.name}</span>
              <span className="text-[#646D89] text-2xl font-bold">{new Date().getFullYear() - new Date(user.birthDate).getFullYear()}</span>
              <img src="/merrylist/Vector.svg" alt="location" />
              <span className="text-[#646D89] text-base">
                {user.city}, {user.location}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Sexual identities</p>
              <p className="text-[#646D89]">{user.sexual_identity}</p>
              <p>Sexual preferences</p>
              <p className="text-[#646D89]">{user.sexual_preference}</p>
              <p>Racial preferences</p>
              <p className="text-[#646D89]">{user.racial_preference}</p>
              <p>Meeting interests</p>
              <p className="text-[#646D89]">{user.meeting_interest}</p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-evenly items-center py-1 px-4 border-[1px] border-[#C70039] rounded-[99px] font-bold text-[#C70039]">
              <img
                src="/merrylist/merry match.svg"
                className="h-[12px] w-[20.4px]"
              />
              <h1>Merry Match!</h1>
            </div>
            <div className="flex">
              <img src="/merrylist/message.svg" alt="message" className="w-[84px] h-[84px]"/>
              <img src="/merrylist/eye.svg" alt="view" className="w-[84px] h-[84px]"/>
              <img src="/merrylist/action button.svg" alt="match" className="w-[84px] h-[84px]"/>
            </div>
          </div>
        </div>
          ))}
      </div>
      <div className="w-[900px] mx-auto"></div>
      <Footer />
    </>
  );
}

export default MerryList;
