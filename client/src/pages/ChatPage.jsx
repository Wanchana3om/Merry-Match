import NavigationbarUser from "../components/NavigationbarUser";
import React, { useState, useEffect } from "react";
import useData from "../hook/useData";
import { useLocation } from "react-router-dom";
import editMessageIcon from "/icon/editMessageIcon.png"
function ChatPage() {

  const [message, setMessege] = useState("")
  const { chatMessage, conversation, sendingChatMessage, editChatMessage, deleteChatMessage } = useData()
  const { state } = useLocation();
  const senderID = state.senderID; // my Id
  const receiverID = state.receiverID;

  const handleSubmit = (event) => {
    event.preventDefault()
    if (message !== "" || event.key === "Enter") {

      setMessege("");
      sendingChatMessage(senderID, receiverID, message)
      chatMessage(senderID, receiverID)

    } else {
      alert("Enter message box")
    }
  };

  const handleEditMessage = () => {

  }
  const handleDeleteMessage = () => {

  }

  useEffect(() => {
    chatMessage(senderID, receiverID)

  }, [])

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
            <h1 className="text-[#191C77] font-bold text-lg">
              Chat with Merry Match
            </h1>
            <div className="flex flex-row justify-evenly py-6">
              <img
                src=""
                alt="dd"
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
        <div className="bg-[#160404] flex flex-col justify-end col-span-3 w-full  overflow-hidden">
          <div className="w-full h-[836px] flex flex-row justify-center pt-[90px]  ">


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


              <div className="flex flex-col-reverse h-full bg-red-200">
                {conversation.map((message, index) => (
                  <div
                    key={index}
                    className={`${message.sender_id === senderID ? "ml-auto" : "mr-auto"
                      } my-4`}
                  >
                    <div
                      className={`${message.sender_id === senderID ? "bg-purple-600 text-white" : "bg-pink-200 text-black"
                        } p-4 rounded-lg`}
                    >
                      <p className="">{message.message}</p>
                      <div className="flex justify-end mt-2 relative">
                        <button
                          className=""
                          onClick={() => handleEditMessage(message)}
                        >
                          <img
                            src={editMessageIcon}
                            alt="edit message icon"
                            className="w-4 h-4 absolute" />
                        </button>
                        <button
                          className="bg-gray-600 p-2 rounded-full "
                          onClick={() => handleDeleteMessage(message)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


            </div>



          </div>







          <form onSubmit={(event) => (handleSubmit(event))}>

            <div className="w-full h-[100px] bg-[#160404] border-t-[1px] flex flex-row border-gray-200 items-center justify-center ">
              <img
                src="/matching/mini_heart.svg"
                alt="upload image"
                className="w-[45px] h-[45px] mr-[10px]"
              />
              <input
                type="text"
                className="w-[908px] h-[50px] px-[15px] bg-[#160404] placeholder:italic placeholder:text-slate-400 focus:outline-none text-white"
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
