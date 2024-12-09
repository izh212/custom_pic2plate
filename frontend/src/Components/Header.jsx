import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isMenu, setMenu] = useState(false);


  return (
    <div>
      <div className='flex justify-between items-center w-full lg:px-16 md:px-10 sm:px-8 px-4 py-2 shadow-lg'>
        <div className='flex items-center gap-2'>
          <img src="logo.png" alt="logo" className='md:h-20 md:w-28 sm:h-14 sm:w-20 h-10 w-14' />
          <p className='md:text-xl text-lg font-bold'>pic<span className='text-orange text-2xl'>2</span>plate</p>
        </div>
        <div className='md:flex items-center gap-6 hidden'>
          <a href="#home" className='font-medium hover:text-orange hover:scale-110'>Home</a>
          <a href="#about" className='font-medium hover:text-orange hover:scale-110'>About</a>
        </div>
        <FiMenu
          onClick={() => setMenu(true)}
          className="text-3xl cursor-pointer md:hidden"
        />
      </div>
      <div
        className={`fixed h-full w-screen z-40 lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all ${isMenu ? "-translate-y-0" : "-translate-y-full"
          }`}
      >
        <section className="bg-white h-auto flex-col p-8 gap-4 z-50 flex w-full">
          <IoCloseOutline
            onClick={() => setMenu(false)}
            className="text-3xl mt-0 mb-4 cursor-pointer absolute right-2 top-2"
          />
          <div className="flex justify-center flex-col gap-3 items-center">
            <a href="#home" onClick={() => setMenu(false)} className='font-medium hover:text-orange hover:scale-110'>Home</a>
            <a href="#about" onClick={() => setMenu(false)} className='font-medium hover:text-orange hover:scale-110'>About</a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Header