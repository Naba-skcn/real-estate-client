import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HostModal from './HostRequestModal';
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark'); 
    const [isOpen, setIsOpen] = useState(false)
    // for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const modalHandler = async () => {
        console.log('I want to be a agent')
        try {
            const currentUser = {
                email: user?.email,
                role: 'guest',
                status: 'Requested',
            }
            const { data } = await axios.put(`http://localhost:5000/user`, currentUser)
            console.log(data)
            if (data.modifiedCount > 0) {
                toast.success('Success! Please wait for admin confirmation')
            } else {
                toast.success('Please!, Wait for admin approval👊')
            }
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            closeModal()
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme); 
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark')); 
    };

    const handleLogOut = () => {
        logout()
            .then(() => console.log('User logged out successfully'))
            .catch(error => console.error(error));
    };
    
    const navLinks = (
        <>
            <li><NavLink to="/"><span className='text-[#d2ad5f]'>Home</span></NavLink></li>
            {user && <li><NavLink to="/all"><span className='text-[#d2ad5f]'>All Properties</span></NavLink></li>}
            {user && <li><NavLink to="/dashboard"><span className='text-[#d2ad5f]'>Dashboard</span></NavLink></li>}
        </>
    );

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .navbar {
                    font-family: 'PT Serif', serif;
                }

                .navbar .btn-ghost {
                    display: flex;
                    align-items: center;
                }

                .navbar .dropdown .btn-ghost {
                    display: flex;
                    align-items: center;
                }

                .navbar .navbar-start .btn-ghost img {
                    margin-right: 8px;
                }

                .theme-controller {
                    cursor: pointer;
                }

                .tooltip img {
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                }

                `}
            </style>
            <ToastContainer />
            <div className="navbar fixed z-20 bg-opacity-40 bg-slate-600 text-black">
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="btn btn-ghost text-black text-xl lg:text-2xl font-bold">
                        <img className='hidden lg:grid md:grid w-[70px] h-[48px] bg-none' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdWPzrdKOMugAPOTt_QMYQ81_xtHbVHRjoBQ&s" alt="" />
                        Estate<span className='text-[#d2ad5f]'>Nest</span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <label className="cursor-pointer place-items-center ml-[70px] hidden lg:grid lg:ml-[20px]">
                    <input onChange={handleToggle} type="checkbox" checked={theme === 'light'} className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
                <div className="navbar-end">
                    {user ? (
                        <>
                            <div className="hidden md:grid lg:grid tooltip tooltip-left" data-tip={user.displayName}>
                                <span><img className='rounded-full size-[30px]' src={user.photoURL} alt="" /></span>
                            </div>
                            <button onClick={handleLogOut} className="btn btn-sm bg-black border-white text-[#d2ad5f] ml-1">Sign out</button>
                            <button onClick={() => setIsModalOpen(true)} className='btn bg-black btn-sm border-white text-[#d2ad5f] ml-1 '>Host your property</button>
                            <HostModal 
                            isOpen={isModalOpen}
                            closeModal={closeModal}
                             modalHandler={modalHandler}></HostModal>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="btn btn-sm bg-black border-white text-[#d2ad5f]">Sign in</button></Link>
                            <Link to="/register"><button className="btn btn-sm bg-black border-white text-[#d2ad5f] hidden lg:block">Sign up</button></Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
