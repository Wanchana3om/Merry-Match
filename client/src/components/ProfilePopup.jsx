import React, { useState } from "react";
import location from "../../public/icon/location.png"
import action_button_love from "../../public/merrylist/action_button_love.png"
import left_arrow from "../../public/merrylist/left_arrow.png"
import right_arrow from "../../public/merrylist/right_arrow.png"
import action_button from "../../public/merrylist/action_button.png"

function ProfilePopup() {
    const [showProfile, setShowProfile] = useState(false)
    const handleProfile = () => {
        setShowProfile(!showProfile)
    }
    return (
        <>
            <button onClick={handleProfile}>
                1 2 3 4 5 F
            </button>

            {showProfile &&
                <div className="w-auto h-auto flex justify-center gap-20 z-10 bg-white p-10">

                    <div>
                        <img src="..\public\Foxy.jpg" alt="" className="w-96 rounded-3xl" />
                        <div className="flex justify-between relative">
                            <p> 1/<span className="text-gray-400">2</span></p>
                            <div className="flex absolute -top-10 left-20">
                                <img src={action_button} alt="" />
                                <img src={action_button_love} alt="" />

                            </div>
                            <div className="flex">
                                <a href="">
                                    <img src={left_arrow} alt="" />
                                </a>
                                <a href="">
                                    <img src={right_arrow} alt="" />
                                </a>

                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-9 relative">

                        <button
                            className="absolute -top-9 -right-7 "
                        >
                            ✕
                        </button>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-4">
                                <h1 className="text-3xl font-black">
                                    Name
                                </h1>
                                <h1 className="text-3xl font-black text-gray-500">
                                    18
                                </h1>
                            </div>
                            <div className="flex flex-row gap-5">
                                <img src={location} alt="Some" className="h-7" />
                                <h4 className="text-lg font-medium text-gray-500">city, location</h4>
                            </div>
                        </div>


                        <div className="flex flex-col gap-3">
                            <div className="flex">
                                <h3 className="text-gray-700">Sexual identities</h3>
                                <h3 className="text-gray-500 ml-[4.4rem]">Dog</h3>
                            </div>
                            <div className="flex">
                                <h3 className="text-gray-700">Sexual preferences</h3>
                                <h3 className="text-gray-500 ml-12">Catttt</h3>
                            </div>
                            <div className="flex">
                                <h3 className="text-gray-700">Racial preferences</h3>
                                <h3 className="text-gray-500 ml-[3.3rem]">Duck</h3>
                            </div>
                            <div className="flex">
                                <h3 className="text-gray-700">Meeting interests</h3>
                                <h3 className="text-gray-500 ml-16">FWB</h3>
                            </div>
                        </div>


                        <div className="flex flex-col gap-2">
                            <h1 className="font-semibold text-xl">About me</h1>
                            <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h1 className="text-xl font-semibold">Hobbies and interests</h1>
                            <div>
                                <ul className="flex flex-wrap w-72 h-auto" >
                                    {/* {props.hobbyLists.map((hobby, index) => ( */}
                                    <li
                                        className="bg-[#F4EBF2]  rounded-lg p-[8px] text-[#7D2262] border-[1px] border-pink-400 text-[14px] mr-2 mb-2 flex items-center"
                                    >
                                        some
                                    </li>
                                    


                                    {/* ))} */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}


export default ProfilePopup