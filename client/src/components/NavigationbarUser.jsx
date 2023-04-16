import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function NavigationbarUser() {

  const { logout, state } = useAuth();

  return (

    <div className="relative z-30 w-full shadow-md">
      <div className="w-[77%]  flex flex-row justify-between items-center py-5 bg-white mx-auto ">
        <nav>
          <Link to="/" className="text-black font-semibold text-4xl">
            Merry 
          </Link>
          <Link to="/" className="text-red-500 font-bold text-4xl">
            Match
          </Link>
        </nav>
        <nav>
          <ul className="flex flex-row items-center">
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77]">
              <Link to="/match">
               Start Matching!
              </Link>
            </li>
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77] ">
              <Link to="/">
              Merry Membership
              </Link>
            </li>
          <Link to="/">
            <button
              className="bg-blue-500 hover:bg-red-600 text-white font-bold mx-5 px-6 py-2 rounded-full h-[66]"
              onClick={() => {
                logout();
              }}
            >
              Log Out
            </button>
          </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavigationbarUser;
