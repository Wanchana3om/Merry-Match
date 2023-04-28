import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import React, { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Image,
  MenuDivider,
} from "@chakra-ui/react";

function NavigationbarUser() {
  // const [showMenu, setShowMenu] = useState(false);

  // const toggleMenu = () => {
  //   setShowMenu(!showMenu);
  // };
  // const { isOpen, onToggle } = useDisclosure()
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
            <div className="">
              <img
                src="/nav-bar/bell.svg"
                alt="Profile"
                className="w-[48px] h-[48px] rounded-full cursor-pointer"
              />
            </div>

            <Menu width="204px">
              <MenuButton
                as={Button}
                colorScheme="white"
                _hover={{ scale: 125 }}
              >
                <div>
                  <Image
                    src={state?.user?.profilePic}
                    alt="Profile"
                    className="w-[48px] h-[48px] rounded-full cursor-pointer object-cover transition-all duration-300 hover:scale-125"
                  />
                </div>
              </MenuButton>

              <MenuList borderRadius={12} width="204px" alignItems="center">
                <MenuItem _hover={{ borderRadius: 12 }} alignItems="center">
                  <div className="flex items-center px-[8px]">
                    <img
                      src="/nav-bar/Vector.svg"
                      className="w-[13px] h-[13px] "
                      alt=""
                    />
                    <a
                      href="/ownerprofile"
                      className="block px-4 py-2  text-gray-700 "
                    >
                      Profile
                    </a>
                  </div>
                </MenuItem>
                <MenuItem _hover={{ borderRadius: 12 }}>
                  <div className="flex items-center px-[8px] hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                    <img
                      src="/nav-bar/Vector2.png"
                      className="w-[13px] h-[13px] "
                      alt="icon"
                    />
                    <a
                      href="/merrylist"
                      className="block px-4 py-2  text-gray-700 "
                    >
                      Merry list
                    </a>
                  </div>
                </MenuItem>

                <MenuItem _hover={{ borderRadius: 12 }}>
                  <div className="flex items-center px-[8px] hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                    <img
                      src="/nav-bar/Vector (3).svg"
                      className="w-[13px] h-[13px] "
                      alt="icon"
                    />
                    <a href="#" className="block px-4 py-2  text-gray-700 ">
                      Complaint
                    </a>
                  </div>
                </MenuItem>

                <MenuDivider />
                <MenuItem _hover={{ borderRadius: 12 }}>
                  <div className="flex items-center px-[8px] border-gray hover:bg-gray-100 hover:cursor-pointer hover:rounded-[12px]">
                    <img
                      src="/nav-bar/Vector (4).svg"
                      className="w-[13px] h-[13px] "
                      alt="icon"
                    />
                    <a
                      href="/"
                      className="block px-4 py-2  text-gray-700 "
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log Out
                    </a>
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavigationbarUser;
