import { useState } from "react";

function RegisterForm2() {
  const [hobbyLists, setHobbyLists] = useState([]);
  const [info, setInfo] = useState("");
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

  return (
        <div className="form-container px-[255px] mb-24 py-8 h-[500px] bg-[#FCFCFE]">
      <h1 className="text-2xl text-[#A62D82] font-[700] mb-[24px] mt-[20px]">
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
            <option value="Female">Non-binary</option>
            <option selected="selected" value="Male">
              Male
            </option>
          </select>
        </div>
        <div>
          <h1>Sexual preferences</h1>
          <select
            className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
            name="Sexual preferences"
          >
            <option value="Female">Male</option>
            <option value="Female">Non-binary</option>
            <option selected="selected" value="Female ">
              Female
            </option>
          </select>
        </div>
        <div>
          <h1>Racial preferences</h1>
          <select
            className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px]  pl-[12px]"
            name="City"
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
            name="City"
          >
            <option value="Partners">Partners</option>
            <option value="Long-term commitment">Long-term commitment</option>
            <option value="Long-term commitment">Short-term commitment</option>
            <option selected="selected" value="Bangkok">
              Friends
            </option>
          </select>
        </div>
      </div>
    <div className="flex flex-col  mt-[50px]">
      <div className="relative flex flex-col items-start">
        <h1>Hobbies / Interests (Maximum 10)</h1>
        <input
          className="border-[1px] font-normal border-[#D6D9E4] rounded-lg w-[920px] h-[48px] py-[12px] pr-[12px] pl-[12px] mb-4"
          type="text"
          value={info}
          onChange={(e) => {
            setInfo(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        {hobbyLists.length > 0 && (
          <div className=" border-[1px] border-none rounded-lg p-[8px] text-[#9AA1B9] text-sm">
            <ul className="flex flex-wrap">
              {hobbyLists.slice(0, maxHobbies).map((hobby, index) => (
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
            {hobbyLists.length > maxHobbies && (
              <p className="text-red-500 mt-2">
                You have reached the maximum number of hobbies you can add.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default RegisterForm2;




