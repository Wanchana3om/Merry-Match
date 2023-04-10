import { Link } from "react-router-dom";

function Loginpage() {
  return (
    <>
      <div className="w-11/12 flex flex-row justify-between items-center h-auto py-5 bg-white mx-6 font-Poppins">
        <img
          src="/login/handsomedev.png"
          alt="man"
          className="relative w-1/3 ml-28"
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-[#7B4429] mt-5">LOGIN</p>
          <h1 className="text-5xl font-extrabold text-[#A62D82] mb-5 leading-tight">
            Welcome back to <br /> Merry Match
          </h1>
          <div>
            <label className="block text-gray-600 text-base font-normal mt-3">
              Username or Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-500 focus:shadow-red-500"
              type="text"
              name="username"
              placeholder="Enter Username or Email"
              required
            ></input>
            <label className="block text-gray-600 text-base font-normal mt-8">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-500 focus:shadow-red-500"
              type="text"
              name="password"
              placeholder="Enter password"
              required
            ></input>
            <button className="block h-12 bg-red-500 hover:bg-red-600 text-white text-base font-bold px-56 rounded-full my-10">
              Log in
            </button>
            <div className="my-6">
              <span className="text-base font-normal">
                Don't Have an account?
              </span>
              <Link to="/register"><button className="text-base font-bold text-red-500 mx-3">
                Register
              </button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Loginpage;
