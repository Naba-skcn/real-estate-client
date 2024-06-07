import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import 'animate.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from './providers/AuthProvider';
import useRole from './hooks/useRole';

const MyProfile = () => {
    const { user: authUser } = useContext(AuthContext);
     const [role] = useRole()
    useEffect(() => {
        AOS.init({
            duration: 600,
            offset: 200,
            easing: 'ease-in-sine'
        });
    }, []);

    const { data: user, error, isLoading } = useQuery({
        queryKey: ['user', authUser?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/users/${authUser?.email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            return data;
        },
        enabled: !!authUser?.email // only run the query if authUser is available
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container bg-cover bg-[url('https://images.unsplash.com/photo-1695278255455-9afc87008775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <Helmet>
                <title>EstateNest | User Profile</title>
            </Helmet>
            <div className="text-center font mt-10 rounded-lg p-8 bg-black shadow-lg">
                <div className='border-2 border-[#d2ad5f] rounded-lg p-5' data-aos="fade-up">
                    <h1 className="text-3xl font-bold mb-6 text-[#d2ad5f] animate__animated animate__fadeInDown">User Profile</h1>
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user.image}
              className='w-32 h-32 rounded-full mx-auto border-4 mt-10 border-[#d2ad5f] '
            />
          </a>

          <p className='p-2 mb-2 z-10 -mt-[15px] text-xs font-semibold bg-black border-2 border-[#d2ad5f] text-[#d2ad5f] rounded-full'>
            {role}
          </p>
                        <p className="text-white text-xl mb-2 animate__animated animate__fadeInUp"><span className='text-[#d2ad5f] font-semibold'>Name:</span> {user.name}</p>
                        <p className="text-gray-400 text-lg animate__animated animate__fadeInUp">Email: {user.email}</p>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
