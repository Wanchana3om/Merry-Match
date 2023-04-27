import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";
import axios from "axios";
import jwtDecode from "jwt-decode";

function MerryList() {
  const [usersData, setUsersData] = useState([]);
  const [clickedImgIndex, setClickedImgIndex] = useState([]);

  const handleClickImg = (index) => {
    setClickedImgIndex((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
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
        console.log(result);
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
      <div className="bg-[#FCFCFE]">
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
            <span className="text-[#646D89] text-base">
              Who do you want to match with?
            </span>
            <p className="text-[#FF1659] text-base">press now</p>
            <p className="text-[#646D89] text-base">you will be happy</p>
          </div>
        </div>
        {usersData.map((user, index) => (
          <div key={index} className="flex gap-10">
            <img
              src={user.pictures[0]?.pic_url || null}
              alt={user.name}
              className="object-cover w-[187px] h-[187px] border-[1px] border-[#A62D82] rounded-3xl"
            />
            <div className="basis-2/4 flex flex-col gap-6">
              <div className="flex gap-3 items-center">
                <span className="text-[#2A2E3F] text-2xl font-bold">
                  {user.name}
                </span>
                <span className="text-[#646D89] text-2xl font-bold">
                  {new Date().getFullYear() -
                    new Date(user.birthDate).getFullYear()}
                </span>
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
            <div className="flex flex-col items-end gap-4">
              <div
                className={`flex justify-evenly items-center py-1 px-4 border-[1px] rounded-[99px] text-[16px]`}
                style={{
                  color: `${
                    user.merry_status[0].mer_status === "MerryMatch"
                      ? "#C70039"
                      : "#646D89"
                  }`,
                  borderColor: `${
                    user.merry_status[0].mer_status === "MerryMatch"
                      ? "#C70039"
                      : "#646D89"
                  }`,
                  width: `${
                    user.merry_status[0].mer_status === "MerryMatch"
                      ? "160px"
                      : "140px"
                  }`,
                  fontWeight: `${
                    user.merry_status[0].mer_status === "MerryMatch"
                      ? "bold"
                      : ""
                  }`,
                }}
              >
                {user.merry_status[0].mer_status === "MerryMatch" && (
                  <img
                    src="/merrylist/merry match.svg"
                    className="h-[12px] w-[20.4px]"
                  />
                )}
                <h1>{user.merry_status[0].mer_status}</h1>
              </div>

              <div className="flex ">
                {user.merry_status[0].mer_status === "MerryMatch" && (
                  <div class="flex flex-col relative group">
                    <img
                      src="/merrylist/message.svg"
                      alt="message"
                      class="w-[114px] h-[114px] cursor-pointer"
                    />
                    <p class="absolute bottom-1 left-2 text-white bg-[#9AA1B9] rounded-[4px] py-[2px] px-[8px] text-xs opacity-0 group-hover:opacity-100">
                      Go to chat
                    </p>
                  </div>
                )}
                <div className="flex flex-col relative group">
                  <img
                    src="/merrylist/eye.svg"
                    alt="view"
                    className="w-[114px] h-[114px] cursor-pointer"
                  />
                  <p className="absolute bottom-1 left-3 text-white bg-[#9AA1B9] rounded-[4px] py-[2px] px-[8px] text-xs opacity-0 group-hover:opacity-100">
                    See profile
                  </p>
                </div>
                <div className="flex flex-col relative group">
                
                    <img
                      src={
                        clickedImgIndex[index]
                          ? "/icon/heartwhite.svg"
                          : "/merrylist/action button.svg"
                      }
                      alt="match"
                      className="w-[114px] h-[114px] cursor-pointer"
                      onClick={() => handleClickImg(index)}
                    />
                  
                  <p className="absolute bottom-1 left-6 text-white bg-[#9AA1B9] rounded-[4px] py-[2px] px-[8px] text-xs opacity-0 group-hover:opacity-100">
                    Merry
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[900px] mx-auto"></div>
      </div>
      <Footer />
    </>
  );
}

export default MerryList;
