import React from 'react';
import { Link } from 'react-router-dom';

const NeighborhoodGuidesSection = () => {
    return (
        
        <section className="neighborhood-guides-section py-12">
            <div >
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <div className='font  text-center mb-8'>
                <span className='text-xs md:w-3/4 text-[#d2ad5f]'>----- Discover vibrant communities and serene enclaves with our comprehensive neighborhood guides -----</span>
                <h2 className='text-3xl font-bold uppercase border-y-4 py-4'>Our Neighborhoods</h2>
            </div>
        </div>
            <div className="container font mx-auto px-4">
               
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="neighborhood-card bg-white rounded-lg overflow-hidden shadow-md">
                        <img src="https://images.unsplash.com/photo-1495317823589-e67efe1524b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2l0eSUyMENlbnRlcnxlbnwwfHwwfHx8MA%3D%3D" alt="City Center" className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">City Center</h3>
                            <p className="text-gray-700 mb-4">Experience the heartbeat of the city in the vibrant City Center. From trendy cafes to cultural landmarks, immerse yourself in urban living.</p>
                            <button className="btn bg-black text-[#d2ad5f]">Explore City Center</button>
                        </div>
                    </div>
        
                    <div className="neighborhood-card bg-white rounded-lg overflow-hidden shadow-md">
                        <img src="https://media.istockphoto.com/id/1147674294/photo/single-family-new-construction-home-in-suburb-neighborhood-in-the-south.jpg?s=612x612&w=0&k=20&c=OamzEVBG9yuj7pPiRt1gefEXw0Onb6ByMVkMCO7nscw=" alt="Suburban Paradise" className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Suburban Paradise</h3>
                            <p className="text-gray-700 mb-4">Escape the hustle and bustle of the city in Suburban Paradise. Enjoy peaceful surroundings and family-friendly amenities.</p>
                            <button className="btn bg-black text-[#d2ad5f]">Discover Suburban Living</button>
                        </div>
                    </div>
                    <div className="neighborhood-card bg-white rounded-lg overflow-hidden shadow-md">
                        <img src="https://media.istockphoto.com/id/1734195279/photo/philadelphia-skyline-with-the-schuylkill-river.jpg?s=612x612&w=0&k=20&c=03aNJ18GgV4pyM4Lq6AoTbSo-zzxhgi70CIExUfqn-o=" alt="Riverside Retreat" className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Riverside Retreat</h3>
                            <p className="text-gray-700 mb-4">Find tranquility along the riverbanks in Riverside Retreat. Experience scenic views and outdoor adventures.</p>
                            <button className="btn bg-black text-[#d2ad5f]">Explore Riverside Living</button>
                        </div>
                    </div>
                </div>
                <p className="text-center text-lg text-gray-600 mt-8">Can't find your ideal neighborhood? Let us help you discover the perfect place to call home. Contact our expert agents for personalized recommendations.</p>
                <Link to="/contact" className="btn bg-black block  text-[#d2ad5f] py-2 text-2xl mx-auto mt-6">Contact Us</Link>
            </div>
        </section>
    );
};

export default NeighborhoodGuidesSection;
