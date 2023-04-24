import NavigationbarUser from "../components/NavigationbarUser";
import React, { useState, useMemo, useRef, useEffect } from "react";
import TinderCard from "react-tinder-card";
// import ProfilePopup from "../components/ProfilePopup";
import eye_button from "/matching/eye_button.svg";
import axios from "axios";
import jwtDecode from "jwt-decode";
import ProfilePopupMatching from "../components/ProfilePopupMatching";
import useData from "../hook/useData";
import { useAuth } from "../contexts/authentication";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

function MatchingPage() {
  const [matchingList, setMatchingList] = useState([]);

  const restructureData = (data) => {
    const usersMap = new Map();

    data.forEach((item) => {
      const user = item.users;
      if (!usersMap.has(user.user_id)) {
        usersMap.set(user.user_id, {
          ...user,
          hobbyLists: [],
        });
      }

      const currentUser = usersMap.get(user.user_id);
      if (item.hob_list && !currentUser.hobbyLists.includes(item.hob_list)) {
        currentUser.hobbyLists.push(item.hob_list);
      }
    });

    return Array.from(usersMap.values());
  };

  const getMatchingProfile = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);

        const result = await axios.get(`http://localhost:3000/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let matchingData = result.data;
        const newMatchingList = restructureData(matchingData);
        setMatchingList(newMatchingList);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getMatchingProfile();
  }, []);

  // useEffect(() => {
  //   console.log(matchingList);
  // }, [matchingList]);

  const [keyword, setKeyword] = useState("");
  const [meetingInterest, setMeetingInterest] = useState([]);
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);
  // const [range, setRange] = useState([18, 50]);

  const { getData } = useData();

  const handleSubmit = (event) => {
    event.preventDefault();

    getData({
      keyword,
      meetingInterest,
      minAge,
      maxAge,
    });
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setMeetingInterest((prevMeetingInterest) => [
        ...prevMeetingInterest,
        value,
      ]);
    } else {
      setMeetingInterest((prevMeetingInterest) =>
        prevMeetingInterest.filter((item) => item !== value)
      );
    }
  };
  console.log(keyword);
  console.log(meetingInterest);
  console.log(minAge);
  console.log(maxAge);

  const handleRangeChange = (newRange) => {
    setMinAge(newRange[0]);
    setMaxAge(newRange[1]);
  };

  const handleMinChange = (event) => {
    setMinAge(parseInt(event.target.value));
  };

  const handleMaxChange = (event) => {
    setMaxAge(parseInt(event.target.value));
  };

  const handleClear = (event) => {
    event.preventDefault();
    setKeyword("");
    setMeetingInterest([]);
    window.location.reload();
  };

  const [ageRange, setAgeRange] = useState(18);

  const [currentIndex, setCurrentIndex] = useState(matchingList.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(matchingList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < matchingList.length - 1;

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < matchingList.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      console.log(currentIndex);
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  const handleAgeRangeChange = (event) => {
    setAgeRange(event.target.value);
  };
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleShowProfile = (user) => {
    setSelectedUser(user);
    console.log(user);
    setShowProfile(!showProfile);
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <NavigationbarUser />
      {showProfile && (
        <ProfilePopupMatching
          user={selectedUser}
          handleCloseProfile={handleCloseProfile}
        />
      )}
      <div className="font-nunito mx-auto w-[1440px] h-[936px] flex flex-row">
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

        {/* ------------------------section 2 ----------------------------  */}
        <div className="bg-gray-300 flex flex-col justify-center col-span-3 w-[904px] overflow-hidden">
          <div className="relative w-[620px] h-[620px] rounded-[32px]">
            {matchingList.map((item, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="absolute top-0 left-32 w-full h-full rounded-[32px] bg-gradient-to-t from-[#390741] to-[#070941]"
                key={item.user_id}
                onSwipe={(dir) => swiped(dir, item.name, index)}
                onCardLeftScreen={() => outOfFrame(item.name, index)}
              >
                <div
                  style={{
                    backgroundImage: "url(" + item.pictures[0].pic_url + ")",
                  }}
                  className="z-30 bg-cover bg-center card h-full w-full flex items-end px-4 py-3 text-white rounded-[32px] bg-gradient-to-t from-[#390741] to-[#070941]"
                >
                  <h3 className="z-40 pb-8 pl-3 font-bold text-3xl text-white pointer-events-none ">
                    {item.name}
                  </h3>
                  <div className="z-40 mb-8 ml-4 bg-white/[.2] rounded-full flex items-center justify-center w-8 h-8">
                    <button onClick={() => handleShowProfile(item)}>
                      <img
                        src={eye_button}
                        alt="Eye"
                        className=" pointer-events-none"
                      />
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(360deg, #390741, rgba(7, 9, 65, 0) 70.71%)",
                  }}
                  className="z-20 rounded-[32px] bottom-0 absolute w-full h-2/6"
                />
              </TinderCard>
            ))}
          </div>
          <div className=" flex justify-center gap-2">
            <img
              src="/icon/crossbutton.png"
              className="transform hover:scale-110 transition duration-300  active:scale-90 "
              onClick={() => swipe("left")}
            />

            <img
              src="/icon/heartbutton.png"
              className="transform hover:scale-110 transition duration-300 active:scale-90"
              onClick={() => swipe("right")}
            />
          </div>
        </div>
        {/* ------------------------section 3 ----------------------------  */}
        <form
          onSubmit={handleSubmit}
          className="   w-[210px] flex flex-row justify-center "
        >
          <div className=" flex flex-col items-center  w-[188px] mx-auto>">
            <div className="flex flex-col gap-10 mb-[170px]">
              <div className="mt-6 flex flex-col gap-5">
                <h1 className="text-[#191C77] font-bold">Search by Keywords</h1>
                <input
                  placeholder="Search..."
                  type="text"
                  value={keyword}
                  className="py-3 border-[1px] w-[168px] px-[10px] border-[#CCD0D7] rounded-lg "
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-3 ">
                <h1 className="text-[#191C77] font-bold">Sex you interest</h1>
                <div className="flex">
                  <input
                    type="checkbox"
                    id="Friends"
                    name="Friends"
                    value="Friends"
                    className="w-[24px] h-[24px] rounded-lg"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="sex1" className="ml-[12px] text-[#646D89]">
                    Friends
                  </label>
                </div>
                <div className="flex mt-[16px]">
                  <input
                    type="checkbox"
                    id="Partners"
                    name="Partners"
                    value="Partners"
                    className="w-[24px] h-[24px] rounded-lg"
                    onChange={handleCheckboxChange}
                  />

                  <label htmlFor="sex2" className="ml-[12px] text-[#646D89]">
                    Partners
                  </label>
                </div>
                <div className="flex mt-[16px]">
                  <input
                    type="checkbox"
                    id="Short-term commitment"
                    name="Short-term commitment"
                    value="Short-term commitment"
                    className="w-[24px] h-[24px] rounded-lg"
                    onChange={handleCheckboxChange}
                  />

                  <label htmlFor="sex3" className="ml-[12px] text-[#646D89]">
                    Short-term
                  </label>
                </div>
                <div className="flex mt-[16px]">
                  <input
                    type="checkbox"
                    id="Long-term commitment"
                    name="Long-term commitment"
                    value="Long-term commitment"
                    className="w-[24px] h-[24px] rounded-lg"
                    onChange={handleCheckboxChange}
                  />

                  <label htmlFor="sex3" className="ml-[12px] text-[#646D89]">
                    Long-term
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label htmlFor="age-range" className="text-blue-700 font-bold">
                  Age Range
                </label>
                <div className="relative w-full">
                  <RangeSlider
                    aria-label={["min", "max"]}
                    colorScheme="pink"
                    defaultValue={[minAge, maxAge]}
                    min={18}
                    max={100}
                    onChange={handleRangeChange}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between mt-[40px]">
                    <input
                      type="number"
                      id="min"
                      value={minAge}
                      onChange={handleMinChange}
                      min={18}
                      max={maxAge}
                      className="border-[1px] mr-[4px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"
                    />
                    <div className="mt-[10px]"> - </div>
                    <input
                      type="number"
                      id="max"
                      value={maxAge}
                      onChange={handleMaxChange}
                      min={minAge}
                      max={100}
                      className="border-[1px] ml-[4px] border-[#D6D9E4] py-3 pr-4 pl-3 w-[85.5px] h-[48px] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[210px]  flex justify-center items-center border-t-[1px] border-gray-400">
              <div className="flex justify-center items-center w-[188px]  pt-6 ">
                <h1
                  onClick={handleClear}
                  className="py-3 px-6 text-[#C70039] hover:underline hover:text-[#FF1659] hover:cursor-pointer"
                >
                  Clear
                </h1>
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#C70039] rounded-[99px] text-white hover:bg-[#FF1659]"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MatchingPage;
