import React from 'react'
import {PiAirplaneTiltFill} from 'react-icons/pi'
function Navbar() {
  return (
    <nav className=" bg-gradient-to-br from-green-400 to-blue-600">
      <div className="max-w-screen-xl flex  items-center justify-start mx-auto p-4">
        <p className="flex items-center justify-center space-x-4"> 
        <PiAirplaneTiltFill className='text-gray-50' size={36}/>
          <span className="text-start text-2xl font-bold whitespace-nowrap text-gray-50">
            Flight Search
          </span>
        </p>
      </div>
    </nav>
  );
}

export default Navbar
