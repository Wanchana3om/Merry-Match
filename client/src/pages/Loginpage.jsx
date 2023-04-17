import { Link } from "react-router-dom/";
import NavigationbarNonUser from "../components/NavigationbarNonUser";
import { useAuth } from "../contexts/authentication";
import { useState } from "react";
// import useData from "../hook/useData";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
  };

  return (
    <>
      <NavigationbarNonUser />
      <div className="w-11/12 flex flex-row justify-between items-center h-auto py-5 bg-white mx-6 font-Nunito">
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
          <form onSubmit={handleSubmit}>
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
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                value={username}
              />
              <label className="block text-gray-600 text-base font-normal mt-8">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-red-500 focus:shadow-red-500"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
              />
              <button
                type="submit"
                className="block h-12 bg-red-500 hover:bg-red-600 text-white text-base font-bold px-56 rounded-full my-10"
              >
                Log in
              </button>
              <div className="my-6">
                <span className="text-base font-normal">
                  Don't have an account?
                </span>
                <Link to="/register">
                  <button className="text-base font-bold text-red-500 border-b-2 border-transparent hover:border-[#A62D82] hover:text-[#A62D82] mx-3">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
