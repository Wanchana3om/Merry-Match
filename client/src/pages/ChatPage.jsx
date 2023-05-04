import NavigationbarUser from "../components/NavigationbarUser";
import React, { useState, useEffect, useRef } from "react";
import useData from "../hook/useData";
import { useLocation } from "react-router-dom";
import editMessageIcon from "/icon/editMessageIcon.png"
import jwtDecode from "jwt-decode";
import axios from "axios"
import { io } from "socket.io-client"
import { useNavigate } from "react-router-dom";
import threeDotsIcon from "/icon/threeDotsIcon.png"

const socket = io.connect("http://localhost:4000", {
  transports: ['websocket']
});

function ChatPage() {

  const [message, setMessege] = useState("")
  const { chatMessage, conversation, sendingChatMessage, editChatMessage, deleteChatMessage } = useData()
  const { state } = useLocation();
  const senderID = state.senderID;
  const receiverID = state.receiverID;
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    if (message !== "" || event.key === "Enter") {
      sendingChatMessage(senderID, receiverID, message)
      chatMessage(senderID, receiverID)
      setMessege("");
    } else {
      alert("Enter message box")
    }
  };
  console.log(selectedMessageId)

  const handleEditMessage = () => {

  }
  const handleDeleteMessage = () => {

  }

  const getMerryList = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userDataFromToken = jwtDecode(token);

        const result = await axios.get(
          `http://localhost:3000/merrylist/${userDataFromToken.user_id}`
        );
        setUsersData(result.data);
      } catch (error) {
        console.error("Error decoding the token or fetching user data:", error);
      }
    }
  };

  const handleChat = () => {
    try {
      navigate("/chat", { state: { senderID, receiverID } });
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (messageId) => {
    try {
      setToggle(!toggle)
      setSelectedMessageId(messageId);
    } catch (error) {
      console.error(error);

    }
  }


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     chatMessage(senderID, receiverID);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [conversation]);

  useEffect(() => {
    chatMessage(senderID, receiverID);
    getMerryList();
  }, [])

  console.log(toggle)
  return (
    <>
      <NavigationbarUser />

      <div className="font-nunito mx-auto w-[1440px] h-[936px] flex flex-row relative">
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
            <h1 className="text-[#191C77] font-bold text-lg">Merry Match!</h1>
            <div className="flex flex-row gap-3 w-[100px] h-[100px]">
              {usersData
                .filter(
                  (user) => user.merry_status[0].mer_status === "MerryMatch"
                )
                .map((user, index) => (
                  <button key={index} className="relative"
                  >
                    <img
                      src={user.pictures[0]?.pic_url || null}
                      alt={user.name}
                      className="w-[100px] h-[100px] border-[1px] rounded-2xl"
                    />
                    <img
                      src={"/matching/merry match.svg"}
                      className="absolute bottom-0 right-0"
                    />
                  </button>
                ))}
            </div>
          </div>
          <div className="w-[282px] mx-auto pt-[12px]">
            <h1 className="text-[#191C77] font-bold text-lg">
              Chat with Merry Match
            </h1>
            {usersData.map((user, index) => (
              <div key={index} className="flex flex-row justify-evenly py-2">
                {user.merry_status[0].mer_status === "MerryMatch" && (
                  <img
                    src={user.pictures[0]?.pic_url || null}
                    alt={user.name}
                    className="object-cover w-[60px] h-[60px] border-[1px] border-[#A62D82] rounded-full cursor-pointer"

                  />
                )}
                {user.merry_status[0].mer_status === "MerryMatch" && (
                  <div>
                    <p className="font-[400] text-[#2A2E3F] text-[16px]">
                      {user.name}
                    </p>
                    <p className="font-[500] text-[#646D89] text-[14px]">
                      You know nothing Jon Snow
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FF597B] flex flex-col justify-end col-span-3 w-full">
          <div className="w-full h-[836px] flex flex-row justify-center pt-[50px]  ">


            <div className="flex flex-col w-full">


              <div className="flex items-center justify-center">
                <div className="w-[750px] h-[90px] flex flex-row justify-center  items-center bg-[#F4EBF2] border-[1px] border-[#DF89C6] rounded-2xl">
                  <img
                    src="/chat/merry match.svg"
                    alt="merry match"
                    className=" pr-[27px] animate-bounce"
                  />
                  <p className="text-[#64001D]">
                    Now you and Daeny are Merry Match! <br />
                    You can messege something nice and make a good conversation.
                    Happy Merry!
                  </p>
                </div>
              </div>


              <div className="flex flex-col-reverse h-full bg-[#FF597B] overflow-y-auto mx-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`${message.sender_id === senderID ? "ml-auto max-w-md h-auto " : "mr-auto max-w-md h-auto"
                      } my-4 relative`}
                  >

                    <div
                      className={`${message.sender_id === senderID ? "bg-[#E0144C] text-white" : "bg-[#FFA1CF] text-black"
                        } p-4 rounded-lg`}
                    >
                      <p className="">
                        {message.sender_id === senderID ? (
                          <div>
                            <button
                              className="absolute top-3 -left-7"
                              onClick={() => handleToggle(message.chat_id)}
                            >
                              <img src={threeDotsIcon} alt="three dots icon" className="w-8" />
                            </button>
                            {selectedMessageId === message.chat_id && (
                              <div className="text-center absolute -top-4 -left-[85px]">
                                <button
                                  className="bg-[#F88379] p-2 rounded-3xl mb-2"
                                >
                                  Edit
                                </button> <br />
                                <button
                                  className="bg-[#ff1519] p-2 rounded-3xl"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        ) : null}
                        {message.message}
                      </p>

                    </div>
                  </div>
                ))}
              </div>


            </div>



          </div>







          <form onSubmit={(event) => (handleSubmit(event))}>

            <div className="w-full h-[100px] bg-[#FFABAB] border-t-[1px] flex flex-row border-gray-200 items-center justify-center ">
              <img
                src="/matching/mini_heart.svg"
                alt="upload image"
                className="w-[45px] h-[45px] mr-[10px]"
              />
              <input
                type="text"
                className="w-[908px] h-[50px] px-[15px] bg-[#FF597B] placeholder:italic placeholder:text-slate-400 focus:outline-none text-white rounded-lg"
                placeholder="Message here..."
                value={message}
                onChange={(event) => {
                  setMessege(event.target.value);
                }}
                style={{ wordWrap: "break-word" }}

              />
              <button type="submit">
                <img
                  src="/chat/send button.svg"
                  alt="send button"
                  className="w-[70px] h-[70px] ml-[10px]"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
