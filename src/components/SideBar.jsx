import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import UseAuth from './routes/UseAuth'
import useRole from './hooks/useRole'
import MenuItem from './MenuItem'
import AgentMenu from './AgentMenu'
import AdminMenu from './AdminMenu'
import UserMenu from './UserMenu'
import { SiWelcometothejungle } from "react-icons/si";

const Sidebar = () => {
  const { logOut } = UseAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()
  console.log(role)
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    < >
      <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 font text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
            <div className="btn btn-ghost text-black text-xl lg:text-2xl font-bold">
                        <img className='lg:grid md:grid w-[70px] h-[48px] bg-none' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWPzrdKOMugAPOTt_QMYQ81_xtHbVHRjoBQ&s" alt="" />
                        Estate<span className='text-[#d2ad5f]'>Nest</span>
                    </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 font md:fixed flex flex-col justify-between overflow-x-hidden bg-black w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full md:flex p-2 shadow-lg rounded-lg justify-center items-center bg-gray-500 mx-auto'>
              <Link to='/'>
              <div className=" text-black flex text-xl lg:text-2xl font-bold">
                        <div><img className='lg:grid md:grid w-[70px] h-[48px] bg-none' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWPzrdKOMugAPOTt_QMYQ81_xtHbVHRjoBQ&s" alt="" /></div>
                        <div className='mt-2'>Estate<span className='text-[#d2ad5f]'> Nest</span></div>
                    </div>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col  justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}
            <MenuItem label='Welcome' address='/dashboard' icon={SiWelcometothejungle}></MenuItem>
            {/*  Menu Items */}
            <nav>
            {role == 'User' && <UserMenu></UserMenu>}
            {role == 'Agent' && <AgentMenu></AgentMenu>}
            {role == 'Admin' && <AdminMenu></AdminMenu>}
            </nav>
          </div>
        </div>
        <div>
          <hr />
          {/* Profile Menu */}
          <MenuItem label='Profile' address='/dashboard/profile' icon={FcSettings}></MenuItem>
          <Link to='/'>
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 text-[#d2ad5f] font-medium'>Logout</span>
          </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Sidebar