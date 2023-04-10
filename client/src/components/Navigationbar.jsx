import { Link } from "react-router-dom";

function Navigationbar() {

  const handleOnClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

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
              <Link to="/" onClick={(e) => handleOnClick(e, "why-merry")}>
                Why Merry Match?
              </Link>
            </li>
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77]">
              <Link to="/" onClick={(e) => handleOnClick(e, "how-to")}>
                How to Merry
              </Link>
            </li>
            <Link to="/login">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold mx-5 px-6 py-2 rounded-full h-[66] ">
                Login
              </button>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navigationbar;
