function RegisterForm1() {
  return (
    <div className="form-container px-[255px] mb-24 py-8">
      <h1 className="text-2xl text-[#A62D82] font-[700] mb-[24px]">
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
              value="2022-01-01"
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
            <option selected="selected" value="thailand ">
              Thailand
            </option>
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
            <option selected="selected" value="Bangkok ">
              Bangkok
            </option>
          </select>
        </div>

        <div>
          <h1>Username</h1>
          <label htmlFor="Username">
            <input
              className=" border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
              type="text"
              name="Name"
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
              name="Name"
              placeholder="Jon Snow"
            />
          </label>
        </div>
        <div>
          <h1>Password</h1>
          <label htmlFor="Password">
            <input
              className="border-[1px] border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
              type="password"
              name="Name"
              placeholder="At least 8 characters"
            />
          </label>
        </div>
        <div>
          <h1>Confirm password</h1>
          <label htmlFor="Confirm password">
            <input
              className="border-[1px] font-normal border-[#D6D9E4] rounded-lg w-[453px] h-[48px] py-[12px] pr-[16px] pl-[12px]"
              type="password"
              name="Name"
              placeholder="At least 8 characters"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm1;
