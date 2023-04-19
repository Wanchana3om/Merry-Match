import React, { useState } from "react";
import location from "/icon/location.png";
import action_button_love from "/merrylist/action_button_love.png";
import left_arrow from "/merrylist/left_arrow.png";
import right_arrow from "/merrylist/right_arrow.png";
import action_button_X from "/merrylist/action_button_X.png";
import Foxy from "/merrylist/Foxy.jpg";
function ProfilePopup(props) {
  const handleCloseProfile = () => {
    props.handleClose();
  };
  return (
    <div
      className="flex justify-center items-center fixed z-50 w-full h-auto p-4 bg-black bg-opacity-50 inset-0"
      onClick={handleCloseProfile}
    >
      <div
        className="flex relative max-w-full h-auto bg-white gap-20 pt-14 px-16 pb-20 rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col justify-start items-center">
          <img src={Foxy} alt="" className="max-w-96 max-h-96 rounded-3xl" />
          <div className="w-full flex justify-between items-center relative pt-2">
            <p>
              {" "}
              1/<span className="text-gray-400">2</span>
            </p>
            <div className="flex absolute -top-10 left-24">
              <button>
                <img src={action_button_X} alt="Close picture" />
              </button>
              <button>
                <img src={action_button_love} alt="Heart picture" />
              </button>
            </div>
            <div className="flex gap-5">
              <button>
                <img src={left_arrow} alt="Left arrow" />
              </button>
              <button>
                <img src={right_arrow} alt="Right arrow" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9 relative">
          <button
            className="absolute -right-12 -top-12 text-gray-400"
            onClick={handleCloseProfile}
          >
            ✕
          </button>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <h1 className="text-3xl font-black">Name</h1>
              <h1 className="text-3xl font-black text-gray-500">18</h1>
            </div>
            <div className="flex flex-row gap-5">
              <img src={location} alt="Some" className="h-6" />
              <h4 className="text-lg font-medium text-gray-500">
                city, location
              </h4>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex space-x-16">
              <h3 className="text-gray-700">Sexual identities</h3>
              <h3 className="text-gray-500">Male</h3>
            </div>
            <div className="flex space-x-[2.9rem]">
              <h3 className="text-gray-700">Sexual preferences</h3>
              <h3 className="text-gray-500">Male</h3>
            </div>
            <div className="flex space-x-[3.2rem]">
              <h3 className="text-gray-700">Racial preferences</h3>
              <h3 className="text-gray-500">Male</h3>
            </div>
            <div className="flex space-x-14">
              <h3 className="text-gray-700">Meeting interests</h3>
              <h3 className="text-gray-500">ONS</h3>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl">About me</h1>
            <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Hobbies and interests</h1>
            <div>
              <ul className="flex flex-wrap w-80 h-auto">
                <li className="bg-[#F4EBF2]  rounded-lg p-[8px] text-[#7D2262] border-[1px] border-pink-400 text-[14px] mr-2 mb-2 flex items-center">
                  smooke
                </li>
                <li className="bg-[#F4EBF2]  rounded-lg p-[8px] text-[#7D2262] border-[1px] border-pink-400 text-[14px] mr-2 mb-2 flex items-center">
                  weed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopup;
