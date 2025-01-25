import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuBox, LuUser, LuMessageSquare, LuCalendar,LuSettings } from 'react-icons/lu';
import { FaSuitcase } from 'react-icons/fa';
import { TbUser } from 'react-icons/tb'
import logo from "../../assets/logo.webp";

const Sidebar = () => {

  const [activeLink, setActiveLink] = useState(0);
  const handleLinkClick = (index) => {
    setActiveLink(index);
  }

  const SIDERBAR_LINKS = [
    { id: 1, path: "/", name: "Dashboard", icon: LuBox },

    { id: 2, path: "/dashboard/users", name: "users", icon: TbUser },
    { id: 3, path: "/dashboard/posts", name: "posts", icon: LuMessageSquare },
    { id: 4, path: "/dashboard/setting", name: "setting", icon: LuSettings },  
   

  ]

  return (
    <div className='w-16 lg:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-slate-200'>
      {/* Logo */}
      <div className='mb-8'>
        <img src={logo} alt="logo" className='w-14 hidden lg:flex' />
      </div>
      {/* Logo */}

      {/* Navigation Links */}
      <ul className='mt-6 space-y-4'>
        {
          SIDERBAR_LINKS.map((link, index) => (
            <li
              key={index}
              className={`font-medium rounded-md py-2 px-5 hover:bg-gray-300 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-200 text-indigo-500" : ""}`}
            >
              <Link
                to={link.path}
                className='flex justify-center lg:justify-start items-center lg:space-x-5'
                onClick={() => handleLinkClick(index)}
              >
                <span className='mb-1'>{link.icon()}</span>
                <span className='text-1xl text-gray-500 hidden lg:flex'>{link.name}</span>
              </Link>
            </li>
          ))
        }
      </ul>
      {/* Navigation Links */}

      <div className='w-full absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center'>
        {/* Switch to Home Page Button */}
        <button
         onClick={() => window.location.href = '/home'}
         className='flex items-center space-x-2 text-sm text-white py-2 px-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full mb-2 w-full text-center'>
          <span className='text-sm'>🏠</span>
          <span className='hidden text-sm lg:flex'>Switch To Home Page</span>
        </button >
        <p className='flex items-center space-x-2 text-sm text-white py-2 px-3 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'>
          {" "}
          <span className='text-sm'>?</span> <span className='hidden text-sm lg:flex'>Need Help</span>
        </p>
      </div>
    </div>
  )
}

export default Sidebar