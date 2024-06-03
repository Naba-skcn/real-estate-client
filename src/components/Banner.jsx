import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const [autoPlay, setAutoPlay] = useState(true);

    const handleSlideChange = (index) => {
        if (index === 3) { 
            setAutoPlay(false);
        }
    };

    return (
        <div>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .banner {
                    font-family: 'PT Serif', serif;
                }

                .banner-heading {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: white;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                    text-align: center;
                }

                .banner-message {
                    font-size: 1rem;
                    color: white;
                    text-align: center;
                    margin-top: 0.5rem;
                }

                .banner-overlay {
                    background: rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    inset: 0;
                    padding: 1rem;
                }
                `}
            </style>
        
        <Carousel 
            autoPlay={autoPlay}
            infiniteLoop  
            interval={3000}
            showThumbs={false}  
            showStatus={false}  
            showIndicators={true} 
        >
            
            <div className="relative banner">
                <img className='w-full' src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner 1" />
                <div className="banner-overlay">
                    <h2 className="banner-heading">Welcome to EstateNest</h2>
                    <p className="banner-message">Discover the best properties in your area.</p>
                </div>
            </div>
            <div className="relative banner">
                <img className='w-full' src="https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner 2" />
                <div className="banner-overlay">
                    <h2 className="banner-heading">Find Your Dream Home</h2>
                    <p className="banner-message">Browse through our extensive listings.</p>
                </div>
            </div>
            <div className="relative banner">
                <img className='w-full' src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner 3" />
                <div className="banner-overlay">
                    <h2 className="banner-heading">Your Perfect Place Awaits</h2>
                    <p className="banner-message">Contact us to find out more.</p>
                </div>
            </div>
        </Carousel>
        </div>
    );
};

export default Banner;
