import NavigationbarUser from "../components/NavigationbarUser";
import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import ProfilePopup from "../components/ProfilePopup";
import eye_button from "/merrylist/eye_button.png"

const db = [
  {
    name: "Richard Hendricks",
    url: "./img/richard.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "./img/erlich.jpg",
  },
  {
    name: "Monica Hall",
    url: "./public/emmy.jpg",
  },
  {
    name: "Jared Dunn",
    url: "./public/jbareham.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "./public/dragon.jpg",
  },
];

function MatchingPage() {
  const [ageRange, setAgeRange] = useState(18);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();

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

  const handleAgeRangeChange = (event) => {
    setAgeRange(event.target.value);

  }
  const [showProfile, setShowProfile] = useState(false)
  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }
  const handleCloseProfile = () => {
    setShowProfile(false)
  }

  return (
    <>

      <NavigationbarUser />
      {showProfile && (
        <ProfilePopup handleClose={handleCloseProfile} />
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
        <div className="bg-gray-300 col-span-3 w-[904px] overflow-hidden">
          <div className="relative w-[620px] h-[620px] rounded-[32px]">
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
                    <button onClick={handleShowProfile}><img src={eye_button} alt="Eye" /></button>

                  </div>
                </div>
              </TinderCard>
            ))}
          </div>
          <div className=" flex justify-center gap-2">
            <img
              src="/public/icon/crossbutton.png"
              className="transform hover:scale-110 transition duration-300  active:scale-90 "
              onClick={() => swipe("left")}
            />

            <img
              src="/public/icon/heartbutton.png"
              className="transform hover:scale-110 transition duration-300 active:scale-90"
              onClick={() => swipe("right")}
            />
          </div>
        </div>
        {/* ------------------------section 3 ----------------------------  */}
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