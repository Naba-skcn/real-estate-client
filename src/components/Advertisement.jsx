import React from 'react';
import { useQuery } from '@tanstack/react-query';

const Advertisement = () => {
    const { data: properties, error, isLoading } = useQuery({
        queryKey: ['properties'], 
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/property');
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const data = await response.json();
            return data.slice(0, 4);
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
                <span className='text-xs text-[#d2ad5f]'>----- Discover Deals Now -----</span>
                <h2 className='text-3xl font-bold uppercase border-y-4 py-4'>Spotlight Showcase</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 font sm:grid-cols-2 lg:grid-cols-2 mt-4">
                {properties.map(property => (
                    <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <img src={property.property_image} alt={property.name} className="w-full h-48 object-cover hover:scale-90 rounded-t-lg" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">{property.name}</h3>
                            <p className="text-gray-700 mb-1"><span className='text-black font-bold'>Location:</span> {property.property_location}</p>
                            <p className="text-gray-700 mb-1"><span className='text-black font-bold'>Price Range: </span>{property.price_range}</p>
                            <p className="text-gray-700 mb-1"><span className='text-black font-bold'>Verification Status:</span> {property.verification_status ? 'Verified' : 'Not Verified'}</p>
                            <div className="flex justify-end mt-4">
                                <a href={`/property/${property._id}`} className="bg-black text-[#d2ad5f] py-2 px-4 rounded hover:bg-gray-800 transition duration-300">View Details</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Advertisement;
