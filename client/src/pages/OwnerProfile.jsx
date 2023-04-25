import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavigationbarUser from "../components/NavigationbarUser";
import useData from "../hook/useData";
import ProfilePopup from "../components/ProfilePopup";
import DeletePopup from "../components/DeletePopup";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useAuth } from "../contexts/authentication";
import { uploadCloudinary } from "../components/uploadCloudinary";

function OwnerProfile() {
  const { updateUserProfile } = useData();
  const { state } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [sexualIdentity, setSexualIdentity] = useState("");
  const [sexualPreference, setSexualPreference] = useState("");
  const [racialPreference, setRacialPreference] = useState("");
  const [meetingInterest, setMeetingInterest] = useState("");
  const [hobbyLists, setHobbyLists] = useState([]);
  const [aboutMe, setAboutMe] = useState("");
  const [images, setImages] = useState(Array(5).fill(null));
  const [info, setInfo] = useState("");

  

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (images.length > 2) {
      let nullCount = 0;
      for (let i = 0; i < images.length; i++) {
        if (images[i] === null) {
          nullCount = nullCount + 1;
        }
      }
      if (nullCount >= 4) {
        alert("Please upload at least two photos");
      } 
      else if (!username) {
        alert("Please enter username");
      } else if (!name) {
        alert("Please enter name");
      } else {
        let imageUrls = [];
        const noNullImages = images.filter((image) => image !== null);
        for (let i = 0; i < noNullImages.length; i++) {
          const data = await uploadCloudinary(noNullImages[i]);
          imageUrls.push(data);
        }
        updateUserProfile(state?.user?.user_id,{
          name: name,
          username: username,
          birthDate: birthDate,
          location: location,
          city: city,
          sexual_preference: sexualPreference,
          sexual_identity: sexualIdentity,
          meeting_interest: meetingInterest,
          racial_preference: racialPreference,
          about_me: aboutMe,
          image: imageUrls,
          hobby: hobbyLists,
        });
        alert("Data submitted");
        window.location.reload();
      }
    } 
  };

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
        setAboutMe(result.data[0].about_me);

        let newHobbyList = [];
        let hobbyData = result.data[0].hobbies_interests;

        for (let i = 0; i < hobbyData.length; i++) {
          newHobbyList.push(hobbyData[i].hob_list);
        }
        setHobbyLists(newHobbyList);

        let newImageList = [];
        let imageData = result.data[0].pictures;

        for (let i = 0; i < imageData.length; i++) {
          newImageList.push(imageData[i].pic_url);
        }
        setImages([
          ...newImageList,
          ...Array(5 - newImageList.length).fill(null),
        ]);

        console.log(images);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // ------------section 2 ---------------
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
    delete images[Object.keys(images)[index]];
    setImages({ ...images });
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
  };

  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = (event) => {
    event.preventDefault();
    setShowProfile(!showProfile);
  };
  const handleClosePopupProfile = () => {
    setShowProfile(false);
  };

  return (
    <>
      <NavigationbarUser />

      {deleteAccount && (
        <DeletePopup handleClose={handleClosePopupDelete} />
      )}
      {showProfile && (
        <ProfilePopup handleClose={handleClosePopupProfile} />
      )}
      {/* bg-[#FCFCFE] */}
      <form onSubmit={handleUpdate} className="w-screen bg-[#FCFCFE] ">
        <div className=" flex flex-col w-[1440px] mx-auto font-Poppins h-fit px-[255px] py-12 bg-[#FCFCFE] ">
          <div className="w-full mx-auto bg-[#FCFCFE]">
            <div className="flex flex-row justify-between items-center w-full ">
              <div>
                <h2 className="text-[#7B4429] text-sm">Profile</h2>
                <h1 className="text-[#A62D82] text-[46px] font-extrabold">
                  Let’s make profile <br />
                  to let others know you
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  className="text-[#95002B] bg-[#FFE1EA] py-3 px-6 rounded-[99px] hover:bg-[#FFB1C8]"
                  onClick={handleShowProfile}
                >
                  Preview Profile
                </button>
                <button
                  type="submit"
                  className="text-[#FFFFFF] bg-[#C70039] py-3 px-6 rounded-[99px] hover:bg-[#FF1659]"
                >
                  Update Profile
                </button>
              </div>
            </div >
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                      e.target.classList.add("text-black");
                    }}
                  />
                </label>
              </div>
              <div>
                <h1>Location</h1>
                <select
                  className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
                  name="country"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    e.target.classList.add("text-black");
                  }}
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
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    e.target.classList.add("text-black");
                  }}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />
                </label>
              </div>
            </div >

            {/*------------------------section 2 ---------------------------- */}

            <h1 className="text-2xl text-[#A62D82] font-[700]  mb-5" >
              Identities and Interests
            </h1>

            <div className="info-container grid grid-cols-2 grid-rows-2 gap-5">
              <div>
                <h1>Sexual identities </h1>
                <select
                  className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
                  name="Sexual identities"
                  value={sexualIdentity}
                  onChange={(e) => {
                    setSexualIdentity(e.target.value);
                    e.target.classList.add("text-black");
                  }}
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
                  value={sexualPreference}
                  onChange={(e) => {
                    setSexualPreference(e.target.value);
                    e.target.classList.add("text-black");
                  }}
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
                  value={racialPreference}
                  onChange={(e) => {
                    setRacialPreference(e.target.value);
                    e.target.classList.add("text-black");
                  }}
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
                  value={meetingInterest}
                  onChange={(e) => {
                    setMeetingInterest(e.target.value);
                    e.target.classList.add("text-black");
                  }}
                >
                  <option value="Partners">Partners</option>
                  <option value="Long-term commitment">
                    Long-term commitment
                  </option>
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
                <div className="relative w-full flex flex-row items-start justify-center m-[1px] border-[#D6D9E4] border-t-[1px] border-r-[1px] border-b-[1px] border-l-[1px] rounded-lg h-[50px] bg-white ">
                  {hobbyLists.length > 0 && (
                    <div className=" border-[1px] border-none rounded-lg h-[full] p-[8px] text-[#9AA1B9] text-sm ">
                      <ul className="flex flex-row">
                        {hobbyLists.map((hobby, index) => (
                          <li
                            key={index}
                            className="bg-[#F4EBF2]  border-[#D6D9E4]  rounded-lg p-[6px] text-[#7D2262] text-[14px] mr-2 mb-2 flex items-center"
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
              <div className="mt-[24px]">
                <h1>About me (Maximum 150 characters)</h1>
                <label htmlFor="About me">
                  <textarea
                    className="border-[1px] border-[#D6D9E4] rounded-lg w-[931px] h-[120px] py-[12px] pr-[16px] pl-[12px] "
                    type="text"
                    name="About me"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                  />
                </label>
              </div>
            </div>

            {/*------------------------section 3 ---------------------------- */}

            <div className="bg-[#FCFCFE] form-container w-full py-8 h-[500px]">
              <h1 className="text-2xl text-[#A62D82] font-[700] mb-1">
                Profile pictures
              </h1>
              <h2 className="mb-5">Upload at least 2 photos</h2>
              <div className="grid grid-cols-5 grid-rows-1 gap-2">
                {images.map((image, index) => (
                  <div key={index}>
                    <div
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
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-20 mr-5">
              <button className="hover:underline hover:text-red-600 active:text-red-800" onClick={handleDeleteAccount}>Delete account</button>
            </div>

          </div >
        </div >
      </form >
      <Footer />
    </>
  );
}

export default OwnerProfile;
