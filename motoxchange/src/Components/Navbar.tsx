import React, { useState } from 'react';
import logo from "../assets/Logo.png";
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHome, BiMoon, BiSun } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [dark, setDark] = useState<boolean>(false);

  const toggleNavbar = (): void => {
    setOpen((prev) => !prev);
  };

  const toggleTheme = (): void => {
    if (dark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
      {/* MotoXChange Name and Icon */}
      <nav className="fixed top-0 left-0 w-full z-50 dark:text-gray-100">
        <div className="flex flex-wrap justify-between items-center text-lg dark:bg-gray-600 bg-white border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-16 w-20 md:h-20 md:w-20 lg:h-24 lg:w-28">
              <img src={logo} alt="Logo" className="dark:invert" />
            </div>
            <div className="font-anton text-2xl px-1 md:px-3 lg:px-5 md:text-4xl lg:text-4xl">
              Moto
              <span className="text-3xl md:text-5xl lg:text-5xl font-libre text-blue-900 dark:text-yellow-500">
                X
              </span>
              Change
            </div>
          </div>

          {/* Hamburger for smaller screens */}
          <div
            className={`lg:hidden text-3xl ${isOpen ? 'rotate-90' : 'rotate-0'} transition-transform duration-300`}
            onClick={toggleNavbar}
          >
            <GiHamburgerMenu />
          </div>

          {/* For Larger Screens */}
          <div className="hidden lg:block w-1/3 font-bold cursor-pointer">
            <ul className="flex justify-evenly">
              <NavLink
                to="/"
                className={({ isActive }) => `${isActive ? "text-yellow-500" : ""}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) => `${isActive ? "text-yellow-500" : ""}`}
              >
                Settings
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) => `${isActive ? "text-yellow-500" : ""}`}
              >
                Login
              </NavLink>
              <li>
                <div
                  className="h-8 w-16 shadow-sm shadow-gray-400 bg-gray-800 dark:text-gray-50 dark:shadow-white dark:bg-gray-200 rounded-full"
                  onClick={() => {
                    setDark(!dark);
                    toggleTheme();
                  }}
                >
                  <div
                    className={`flex items-center justify-center text-xl shadow-sm bg-gray-200 dark:bg-gray-700 w-1/2 h-full rounded-full ${
                      dark ? 'translate-x-full rotate-180' : 'translate-x-0'
                    } shadow-xl transition-all duration-200`}
                  >
                    {dark ? <BiSun /> : <BiMoon />}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* For Smaller Screens */}
        <div
          className={`lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } h-screen bg-white dark:bg-gray-600 transition-transform duration-300`}
        >
          <ul className="px-4 py-5 flex flex-col gap-6">
            <li>
              <div
                className="h-8 w-16 bg-gray-800 dark:text-gray-50 dark:shadow-white dark:bg-gray-200 rounded-full"
                onClick={() => {
                  setDark(!dark);
                  toggleTheme();
                }}
              >
                <div
                  className={`flex items-center justify-center text-xl shadow-sm bg-gray-200 dark:bg-gray-700 w-1/2 h-full rounded-full ${
                    dark ? 'translate-x-full' : 'translate-x-0'
                  } shadow-xl transition-all duration-200`}
                >
                  {dark ? <BiSun /> : <BiMoon />}
                </div>
              </div>
            </li>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? 'text-yellow-400' : ''}`}
            >
              <li className="flex items-center text-xl gap-2">
                <span className="text-2xl">
                  <BiHome />
                </span>
                <span>Home</span>
              </li>
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => `${isActive ? 'text-yellow-400' : ''}`}
            >
              <li className="flex items-center text-xl gap-2">
                <span className="text-2xl">
                  <CiSettings />
                </span>
                <span>Settings</span>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
