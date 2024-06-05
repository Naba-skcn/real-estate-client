import React from 'react';
import { useQuery } from '@tanstack/react-query';

const AllProperties = () => {
    const { data: properties, error, isLoading } = useQuery({
        queryKey: ['properties'], 
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/property');
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const data = await response.json();
            return data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className='container mx-auto'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <div className='font text-center bg-black mb-8'>
            <h2 className='text-3xl font-bold uppercase  rounded-lg py-4'></h2>
            <h2 className='text-3xl font-bold uppercase  rounded-lg py-4'></h2>
                <h2 className='text-3xl font-bold uppercase rounded-lg py-4 text-[#d2ad5f]'>All Properties</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8 font sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {properties.map(property => (
                    <div key={property._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <img src={property.property_image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-2">{property.property_title}</h3>
                            <div className='flex gap-2'>
                             <img className='rounded-full size-[40px]' src={property.agent_image} alt="" />
                            <p className="text-gray-700 mt-2"><span className='text-black font-bold'></span> {property.agent_name}</p>
                            </div>
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

export default AllProperties;