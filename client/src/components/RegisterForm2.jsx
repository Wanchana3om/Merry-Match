import { useState } from "react";

function RegisterForm2() {
  //   const [hobbyLists, setHobbyLists] = useState([]);
  //   const [info, setInfo] = useState("");

  //   const addHobbyLists = (event) => {
  //     event.preventDefault();
  //     const newHobbyLists = [...hobbyLists];
  //     newHobbyLists.push(info);
  //     setHobbyLists(newHobbyLists);
  //   };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setHobbyLists((prevHobbie) => [...prevHobbie, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className="form-container px-[255px] mb-24 py-8 h-[500px]">
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
      <div className="mt-[30px]">
        <h1>Hobbies / Interests (Maximum 10)</h1>
        <label htmlFor="hobbie">
          <input
            className=" border-[1px] text-[#9AA1B9] font-normal border-[#D6D9E4] rounded-lg w-[920px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
            type="text"
            // onChange={(e) => {
            //   setInfo(e.target.value);
            // }}
            onKeyPress={handleKeyPress}
          />
        </label>
      </div>
    </div>
  );
}

export default RegisterForm2;
