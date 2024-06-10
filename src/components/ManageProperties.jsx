import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('https://real-estate-server-a12.vercel.app/property');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const handleVerify = async (id) => {
        try {
            await axios.patch(`https://real-estate-server-a12.vercel.app/property/verify/${id}`);
            fetchProperties();
        } catch (error) {
            console.error('Error verifying property:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.patch(`https://real-estate-server-a12.vercel.app/property/reject/${id}`);
            fetchProperties();
        } catch (error) {
            console.error('Error rejecting property:', error);
        }
    };

    return (
        <div className="container font mx-auto p-4">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-black text-[#d2ad5f]">
                        <tr>
                            <th className="py-2 px-4 border-b">Property Title</th>
                            <th className="py-2 px-4 border-b">Property Location</th>
                            <th className="py-2 px-4 border-b">Agent Name</th>
                            <th className="py-2 px-4 border-b">Agent Email</th>
                            <th className="py-2 px-4 border-b">Price Range</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{property.property_title}</td>
                                <td className="py-2 px-4 border-b">{property.property_location}</td>
                                <td className="py-2 px-4 border-b">{property.agent_name}</td>
                                <td className="py-2 px-4 border-b">{property.agent_email}</td>
                                <td className="py-2 px-4 border-b">{property.price_range}</td>
                                <td className="py-2 px-4 border-b">{property.verification_status}</td>
                                <td className="py-2 px-4 border-b">
                                    {property.verification_status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleVerify(property._id)}
                                                className="bg-black text-[#d2ad5f] p-2 rounded hover:bg-green-600"
                                            >
                                                Verify
                                            </button>
                                            <button
                                                onClick={() => handleReject(property._id)}
                                                className="bg-red-700 text-white p-2  rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;
