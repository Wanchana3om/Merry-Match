import { Link, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function Navigationbar1() {
  const navigate = useNavigate();

  const { logout } = useAuth();

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
          <Link to="/login">
            <button
              className="bg-blue-500 hover:bg-red-600 text-white font-bold mx-5 px-6 py-2 rounded-full h-[66]"
              onClick={() => {
                logout();
              }}
            >
              Loout
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navigationbar1;
