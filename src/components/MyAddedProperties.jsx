import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UseAuth from './routes/UseAuth';
import { toast } from 'react-toastify';

const MyAddedProperties = () => {
    const { user } = UseAuth();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch properties added by the agent
        const fetchProperties = async () => {
            try {
                if (user) {
                    const response = await axios.get(`https://real-estate-server-a12.vercel.app/property/agent/${user.email}`);
                    setProperties(response.data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [user]);

    const handleDelete = async (propertyId) => {
        try {
            await axios.delete(`https://real-estate-server-a12.vercel.app/property/${propertyId}`);
            setProperties(properties.filter(property => property._id !== propertyId));
            toast.success('Property successfully deleted');
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Failed to delete property');
        }
    };

    const navigate = useNavigate();
    const handleUpdate = (propertyId) => {
        navigate(`/dashboard/update-property/${propertyId}`);
    };
    
    return (
        <div className='container font mx-auto'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className='text-3xl font-semibold mb-4 text-center'>My Added Properties</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {properties.map(property => (
                    <div key={property._id} className='border p-4 rounded-lg shadow'>
                        <img src={property.property_image} alt={property.property_title} className='w-full h-48 object-cover rounded' />
                        <h3 className='text-xl font-bold mt-2'>{property.property_title}</h3>
                        <p className='text-gray-700'>{property.property_location}</p>
                        <div className='flex items-center mt-2'>
                            <img src={property.agent_image} alt={property.agent_name} className='w-10 h-10 rounded-full' />
                            <p className='ml-2'>{property.agent_name}</p>
                        </div>
                        <p className='mt-2'>Status: {property.verification_status}</p>
                        <p className='mt-2'>Price: {property.price_range}</p>
                        {property.verification_status !== 'Rejected' && (
                            <button
                                onClick={() => handleUpdate(property._id)}
                                className='bg-black text-[#d2ad5f] px-4 py-2 rounded mt-2'>
                                Update
                            </button>
                        )}
                        <button
                            onClick={() => handleDelete(property._id)}
                            className='bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2'>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedProperties;
