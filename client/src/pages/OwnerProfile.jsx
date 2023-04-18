import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";
import { useParams } from "react-router";
// import useData from "../hook/useData";

import DeletePopup from "../components/DeletePopup";
import axios from "axios";
import { useAuth } from "../contexts/authentication";
import jwtDecode from "jwt-decode";

function OwnerProfile(props) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("2022-01-01");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sexualIdentity, setSexualIdentity] = useState("Male");
  const [sexualPreference, setSexualPreference] = useState("Female");
  const [racialPreference, setRacialPreference] = useState("Asia");
  const [meetingInterest, setMeetingInterest] = useState("Partners");
  const [hobbyLists, setHobbyLists] = useState([]);
  const [info, setInfo] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);

        const result = await axios.get(
          `http://localhost:3000/users/${userDataFromToken.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(result.data[0].name);
        setBirthDate(result.data[0].birthDate);
        setLocation(result.data[0].location);
        setCity(result.data[0].city);
        setUsername(result.data[0].username);
        setEmail(result.data[0].email);
        setSexualIdentity(result.data[0].sexual_identity);
        setSexualPreference(result.data[0].sexual_preference);
        setRacialPreference(result.data[0].recial_preference);
        setMeetingInterest(result.data[0].meeting_interest);
        setInfo(result.data[0].about_me);
        setImages(result.data[0].pictures);

        let newHobbyList = [];
        let hobbyData = result.data[0].hobbies_interests;

        for (let i = 0; i < hobbyData.length; i++) {
          newHobbyList.push(hobbyData[i].hob_list);
        }
        setHobbyLists(newHobbyList);

        console.log(result.data);
        console.log(newHobbyList);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const maxHobbies = 10;

  const addHobbyLists = () => {
    if (info.trim() !== "") {
      if (hobbyLists.length >= maxHobbies) {
        alert(`You can only add up to ${maxHobbies} hobbies.`);
        return;
      }
      const newHobbyLists = [...hobbyLists];
      newHobbyLists.push(info.trim());
      setHobbyLists(newHobbyLists);
      setInfo("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addHobbyLists();
    }
  };

  const deleteHobby = (index) => {
    const newHobbyLists = [...hobbyLists];
    newHobbyLists.splice(index, 1);
    setHobbyLists(newHobbyLists);
<<<<<<< HEAD
  };

  // ------------section 3 ---------------
  const handleImageClick = (index) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[index] = reader.result;
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleImageDrop = (event, index) => {
    event.preventDefault();
    const droppedIndex = event.dataTransfer.getData("text");
    if (droppedIndex === "") return;
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const temp = newImages[index];
      newImages[index] = newImages[droppedIndex];
      newImages[droppedIndex] = temp;
      return newImages;
    });
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("text", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const deleteImage = (event, index) => {
    event.preventDefault();
    delete imageUrls[Object.keys(imageUrls)[index]];
    setImageUrls({ ...imageUrls });

    event.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    setDeleteAccount(!deleteAccount);
  };
  const handleClosePopupDelete = () => {
    setDeleteAccount(false);
=======
>>>>>>> 8e9e81f (fix: error fixing)
  };

  return (
    <>
      <NavigationbarUser />
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
                placeholder={name}
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
                defaultValue={birthDate}
              />
            </label>
          </div>
          <div>
            <h1>Location</h1>
            <select
              className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
              name="country"
            >
              <option value={location} selected disabled>
                {location}
              </option>
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
              <option value={city} selected disabled>
                {city}
              </option>
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
                placeholder={username}
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
                placeholder={email}
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
              <option value="" selected disabled>
                {sexualIdentity}
              </option>
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
              <option value="" selected disabled>
                {sexualPreference}
              </option>
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
              <option value="" selected disabled>
                {racialPreference}
              </option>
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
              <option value="" selected disabled>
                {meetingInterest}
              </option>
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
<<<<<<< HEAD
            <input
              className="border-[1px] font-normal border-[#D6D9E4] rounded-lg w-[931px] h-[48px] py-[12px] pr-[12px] pl-[12px] mb-4"
              type="text"
              value={info}
              onChange={(e) => {
                setInfo(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            {/* props.hobbyLists.length  */}
            {hobbyLists.length > 0 && (
              <div className=" border-[1px] border-none rounded-lg p-[8px] text-[#9AA1B9] text-sm">
                <ul className="flex flex-wrap">
                  {props.hobbyLists.map((hobby, index) => (
                    <li
                      key={index}
                      className="bg-[#F4EBF2]  border-[#D6D9E4]  rounded-lg p-[8px] text-[#7D2262] text-[14px] mr-2 mb-2 flex items-center"
                    >
                      {hobby}
                      <button
                        className="absolute -right-2 -top-1 cursor-pointer z-10 block rounded-full bg-[#AF2758] text-white h-6 w-6"
                        onClick={(event) => deleteImage(event, index)}
=======
            <div className="w-full relative flex flex-row items-start justify-center m-[1px] border-[#D6D9E4] border-t-[1px] border-r-[1px] border-b-[1px] border-l-[1px] rounded-lg h-[50px] bg-white ">
              {hobbyLists.length > 0 && (
                <div className=" border-[1px] border-none rounded-lg h-[full] p-[8px] text-[#9AA1B9] text-sm ">
                  <ul className="flex flex-row">
                    {hobbyLists.map((hobby, index) => (
                      <li
                        key={index}
                        className="bg-[#F4EBF2]  border-[#D6D9E4]  rounded-lg p-[6px] text-[#7D2262] text-[14px] mr-2 mb-2 flex items-center"
>>>>>>> 8e9e81f (fix: error fixing)
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
              <input
                className="border-[1px] font-normal border-none rounded-lg w-full h-full py-[12px] pr-[12px] pl-[12px] mb-4 focus:outline-none"
                type="text"
                value={info}
                onChange={(e) => {
                  setInfo(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>

          <div className="flex justify-end mt-20 mr-5">
            <button
              className="hover:underline hover:text-red-600 active:text-red-800"
              onClick={handleDeleteAccount}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OwnerProfile;
