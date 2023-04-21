import NavigationbarUser from "../components/NavigationbarUser";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import ProfilePopup from "../components/ProfilePopup";
import eye_button from "/merrylist/eye_button.png";
import useData from "../hook/useData";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const db = [
  {
    name: "Richard Hendricks",
    url: "/img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "/img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "/emmy.jpg",
  },
  {
    name: "Jared Dunn",
    url: "/jbareham.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "/dragon.jpg",
  },
];

function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
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

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

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
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  };
  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <NavigationbarUser />
      {showProfile && <ProfilePopup handleClose={handleCloseProfile} />}
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
        <div className="bg-[#160404] col-span-3 w-[904px] overflow-hidden">
          <div className="relative w-[620px] h-[620px] mt-40 rounded-[32px]">
            {db.map((character, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="absolute top-0 left-32 w-full h-full rounded-[32px] bg-gradient-to-t from-[#390741] to-[#070941]"
                key={character.name}
                onSwipe={(dir) => swiped(dir, character.name, index)}
                onCardLeftScreen={() => outOfFrame(character.name, index)}
              >
                <div
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card h-full w-full flex items-end px-4 py-3 text-white rounded-[32px] bg-gradient-to-t from-[#390741] to-[#070941]"
                >
                  <h3>{character.name}</h3>
                  <div>
                    <button onClick={handleShowProfile}>
                      <img
                        src={eye_button}
                        alt="Eye"
                        className="pointer-events-none"
                      />
                    </button>
                  </div>
                </div>
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
