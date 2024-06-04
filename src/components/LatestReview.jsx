import React from 'react';

const LatestReview = () => {
    return (
            <div className='container mx-auto md:w-3/4 mt-8'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <div className='font text-center mb-8'>
                <span className='text-xs text-[#d2ad5f]'>----- Explore latest reviews for why we stand out -----</span>
                <h2 className='text-3xl font-bold uppercase border-y-4 py-4'>Testimonial Spotlight</h2>
            </div>
        </div>
    );
};

export default LatestReview;