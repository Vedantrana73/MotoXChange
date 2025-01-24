import React, { useState } from 'react'
import { BiMoon, BiSun } from 'react-icons/bi';
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
function Navbar() {
    const [theme,setTheme] = useState('light');

    const handleTheme = () =>{
        setTheme((prev)=>theme==='light'?'dark':'light')
        document.documentElement.setAttribute('data-theme',theme);
    }
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}>Home</NavLink>Home</li>
                        </ul>
                    </div>
                    <div className='flex items-center'>
                    <img src={logo} alt="Logo" className='h-20 w-20' />
                    <a className="btn btn-ghost text-xl">TodoList</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'text-yellow-500' : '')}>Home</NavLink></li>
                    </ul>
                </div>
                <div className="navbar-end flex items-center">
                    <label className="swap swap-flip text-3xl">
                        <input type="checkbox" onClick={handleTheme}/>

                        <div className="swap-on"><BiMoon/></div>
                        <div className="swap-off"><BiSun/></div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Navbar
