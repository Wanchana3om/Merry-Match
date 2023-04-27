import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";

function NavigationbarUser() {
  // const [showMenu, setShowMenu] = useState(false);

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };

  const { logout, state } = useAuth();

  return (
    <header className="font-nunito relative z-30 w-screen shadow-md">
      <div className="w-screen  flex flex-row justify-between items-center py-5 bg-white mx-auto">
        <nav className="ml-[12%]">
          <Link to="/" className="text-black font-semibold text-4xl">
            Merry
          </Link>
          <Link to="/" className="text-red-500 font-bold text-4xl">
            Match
          </Link>
        </nav>
        <nav className="mr-[12%]">
          <ul className="flex flex-row items-center">
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77]">
              <Link to="/matching">Start Matching! </Link>
            </li>
            <li className="mr-[56px] text-base font-bold hover:text-[#191C77] ">
              <Link to="/merrypackage">Merry Membership</Link>
            </li>

            <div className="pr-[12px]">
              <img
                src="/nav-bar/bell.svg"
                alt="Profile"
                className="w-[48px] h-[48px] rounded-full cursor-pointer"
              />
            </div>
            <button className="group ">
              <div className="relative mr-[16px]">
                <img
                  src={state?.user?.profilePic}
                  alt="Profile"
                  className="w-[48px] h-[48px]  rounded-full cursor-pointer object-cover hover:scale-125 transition-all duration-300"
                />
              </div>
              <div className="font-nunito  absolute z-50 w-[204px] mt-2 bg-white rounded-[12px] shadow-lg flex flex-col p-[8px] opacity-0 group-focus:opacity-100 transition-all duration-700">
                <img src="/nav-bar/premium cta.svg" alt="icon" />
                <div className="flex items-center p-[8px]  hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                  <img
                    src="/nav-bar/Vector.svg"
                    className="w-[13px] h-[13px] "
                    alt=""
                  />
                  <a
                    href="/ownerprofile"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    Profile
                  </a>
                </div>
                <div className="flex items-center p-[8px] hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                  <img
                    src="/nav-bar/Vector2.png"
                    className="w-[13px] h-[13px] "
                    alt="icon"
                  />
                  <a
                    href="/merrylist"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    Merry list
                  </a>
                </div>
                <div className="flex items-center p-[8px]  hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px] w-full">
                  <img
                    src="/nav-bar/Vector (2).svg"
                    className="w-[13px] h-[13px] "
                    alt="icon"
                  />
                  <a
                    href="/merrypackage"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    Merry Membership
                  </a>
                </div>
                <div className="flex items-center p-[8px] hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                  <img
                    src="/nav-bar/Vector (3).svg"
                    className="w-[13px] h-[13px] "
                    alt="icon"
                  />
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 "
                  >
                    Complaint
                  </a>
                </div>
                <div className="flex items-center p-[8px] border-t-[1px] border-gray hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                  <img
                    src="/nav-bar/Vector (4).svg"
                    className="w-[13px] h-[13px] "
                    alt="icon"
                  />
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 "
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log Out
                  </a>
                </div>
              </div>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavigationbarUser;
