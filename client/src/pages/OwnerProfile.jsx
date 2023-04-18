import { useState } from "react";
import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";

function OwnerProfile(props) {
  const maxHobbies = 10;

  const addHobbyLists = () => {
    if (props.info.trim() !== "") {
      if (props.hobbyLists.length >= maxHobbies) {
        alert(`You can only add up to ${maxHobbies} hobbies.`);
        return;
      }
      const newHobbyLists = [...props.hobbyLists];
      newHobbyLists.push(props.info.trim());
      props.setHobbyLists(newHobbyLists);
      props.setInfo("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addHobbyLists();
    }
  };

  const deleteHobby = (index) => {
    const newHobbyLists = [...props.hobbyLists];
    newHobbyLists.splice(index, 1);
    props.setHobbyLists(newHobbyLists);
  };

  return (
    <>
      <NavigationbarUser  />
      <div className="flex flex-col font-nunito h-fit px-[255px] py-12 bg-[#FCFCFE]  w-[1440px] mx-auto">
        <div className="flex flex-row justify-between items-center w-full ">
          <div>
            <h2 className="text-[#7B4429] text-sm">Profile</h2>
            <h1 className="text-[#A62D82] text-[46px] font-extrabold">
              Let’s make profile <br />
              to let others know you
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="text-[#95002B] bg-[#FFE1EA] py-3 px-6 rounded-[99px] hover:bg-[#FFB1C8]">
              Preview Profile
            </button>
            <button className="text-[#FFFFFF] bg-[#C70039] py-3 px-6 rounded-[99px] hover:bg-[#FF1659]">
              Update Profile
            </button>
          </div>
        </div>
        <h1 className="text-2xl text-[#A62D82] font-[700]  mt-20 mb-5">
          Basic Information
        </h1>
        <div className="info-container grid grid-cols-2 grid-rows-4 gap-5">
          <div>
            <h1>Name</h1>
            <label htmlFor="Name">
              <input
                className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                type="text"
                name="Name"
                placeholder="Jon Snow"
              />
            </label>
          </div>
          <div>
            <h1>Date of birth</h1>
            <label htmlFor="Date">
              <input
                className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                type="date"
                name="Date"
              />
            </label>
          </div>
          <div>
            <h1>Location</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
              name="country"
            >
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
              <option value="thailand ">Thailand</option>
            </select>
          </div>
          <div>
            <h1>City</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
              name="City"
            >
              <option value="Sydney">Sydney</option>
              <option value="Ottawa">Ottawa</option>
              <option value="new york">New York</option>
              <option value="Bangkok ">Bangkok</option>
            </select>
          </div>

          <div>
            <h1>Username</h1>
            <label htmlFor="Username">
              <input
                className=" border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                type="text"
                name="Username"
                placeholder="At least 6 characters"
              />
            </label>
          </div>

          <div>
            <h1>Email</h1>
            <label htmlFor="Email">
              <input
                className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                type="email"
                name="email"
                placeholder="Jon Snow"
              />
            </label>
          </div>
        </div>

        {/* section 2 */}
        <h1 className="text-2xl text-[#A62D82] font-[700]  mb-5">
          Identities and Interests
        </h1>
        <div className="info-container grid grid-cols-2 grid-rows-2 gap-5">
          <div>
            <h1>Sexual identities </h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
              name="Sexual identities"
            >
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Male">Male</option>
            </select>
          </div>
          <div>
            <h1>Sexual preferences</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
              name="Sexual preferences"
            >
              <option value="Female">Male</option>
              <option value="Non-binary">Non-binary</option>
              <option selected="selected" value="Female ">
                Female
              </option>
            </select>
          </div>
          <div>
            <h1>Racial preferences</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
              name="Racial preferences"
            >
              <option value="Black">Black</option>
              <option value="European">European</option>
              <option value="Caucasian">Caucasian</option>
              <option value="African">African</option>
              <option selected="selected" value="Asian">
                Asian
              </option>
            </select>
          </div>
          <div>
            <h1>Meeting interests</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
              name="Meeting interests"
            >
              <option value="Partners">Partners</option>
              <option value="Long-term commitment">Long-term commitment</option>
              <option value="Short-term commitment">
                Short-term commitment
              </option>
              <option selected="selected" value="Friends">
                Friends
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col  mt-[50px]">
          <div className="relative flex flex-col items-start">
            <h1>Hobbies / Interests (Maximum 10)</h1>
            <input
              className="border-[1px] font-normal border-[#D6D9E4] rounded-lg w-[931px] h-[48px] py-[12px] pr-[12px] pl-[12px] mb-4"
              type="text"
              value={props.info}
              onChange={(e) => {
                props.setInfo(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            {/* props.hobbyLists.length  */}
            {props.hobbyLists > 0 && (
              <div className=" border-[1px] border-none rounded-lg p-[8px] text-[#9AA1B9] text-sm">
                <ul className="flex flex-wrap">
                  {props.hobbyLists.map((hobby, index) => (
                    <li
                      key={index}
                      className="bg-[#F4EBF2]  border-[#D6D9E4]  rounded-lg p-[8px] text-[#7D2262] text-[14px] mr-2 mb-2 flex items-center"
                    >
                      {hobby}
                      <button
                        className="border-none bg-transparent text-[#7D2262] ml-4 cursor-pointer"
                        onClick={() => deleteHobby(index)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <h1>About me (Maximum 150 characters)</h1>
            <label htmlFor="About me">
              <input
                className="border-[1px] border-[#D6D9E4] rounded-lg w-[931px] h-[120px] py-[12px] pr-[16px] pl-[12px] "
                type="text"
                name="About me"
              />
            </label>
          </div>
        </div>

        {/* section 3 */}
        <div className="bg-[#FCFCFE] form-container w-[1440px] py-8 h-[500px]">
          <h1 className="text-2xl text-[#A62D82] font-[700] mb-1">
            Profile pictures
          </h1>
          <h2 className="mb-5">Upload at least 2 photos</h2>
          {/* 
          <div className="grid grid-cols-5 grid-rows-1 gap-2">
            {props.images.map((image, index) => (
              <>
                <div
                  key={index}
                  className="w-[167px] h-[167px] bg-[#F1F2F6] rounded-2xl cursor-pointer relative z-0 "
                  onClick={() => handleImageClick(index)}
                  onDrop={(event) => handleImageDrop(event, index)}
                  onDragOver={(event) => handleDragOver(event)}
                  draggable={image !== null}
                  onDragStart={(event) => handleDragStart(event, index)}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {image === null && (
                    <div className="flex flex-col text-center justify-center items-center h-full transform hover:scale-[1.2] active:scale-[0.8]">
                      <div>
                        <h1 className="text-[#7D2262] text-[30px]">+</h1>
                        <p className="text-[#7D2262] ">Upload photo</p>
                      </div>
                    </div>
                  )}

                  {image !== null && (
                    <button
                      className="absolute -right-2 -top-1 cursor-pointer z-10 block rounded-full bg-[#AF2758] text-white h-6 w-6"
                      onClick={(event) => deleteImage(event, index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </>
            ))}
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default OwnerProfile;
