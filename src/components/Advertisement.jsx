import React from 'react';

const Advertisement = () => {
    return (
        <div className='container mx-auto md:w-3/12 mt-3'>
             <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <div className='font text-center'>
              <span className='text-xs  text-[#d2ad5f]'>-----Discover Deals Now-----</span>
              <h2 className='text-2xl font-bold uppercase border-y-4 py-4'>Spotlight Showcase</h2>
            </div>
        </div>
    );
};

export default Advertisement;
