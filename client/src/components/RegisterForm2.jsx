import { useState } from "react";

function RegisterForm2() {
  const [hobbies, setHobbies] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newHobby = event.target.value;
      if (newHobby && hobbies.length < 10 && !hobbies.includes(newHobby)) {
        setHobbies((prevHobbies) => [...prevHobbies, newHobby]);
        event.target.value = "";
      }
    }
  };

  const handleDelete = (hobbyToDelete) => {
    setHobbies((prevHobbies) =>
      prevHobbies.filter((hobby) => hobby !== hobbyToDelete)
    );
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
            id="hobbies"
            onKeyDown={handleKeyPress}
            placeholder={hobbies.slice(-1)}
          />
        </label>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>
              {hobby}
              <button onClick={() => handleDelete(hobby)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RegisterForm2;
