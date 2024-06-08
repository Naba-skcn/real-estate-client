import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseAuth from './routes/UseAuth';

const UpdateProperty = () => {
    const { user } = UseAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        property_image: '',
        property_title: '',
        property_location: '',
        agent_name: user.name,
        agent_email: user.email,
        price_range: '',
    });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { _id, ...updateData } = property;
            
            await axios.patch(`http://localhost:5000/property/${id}`, updateData);
            toast.success('Property successfully updated');
            navigate(`/dashboard/update-property/${id}`);
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('Failed to update property');
        }
        navigate(`/dashboard/my-properties`)
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
            <ToastContainer />
            <h2 className='text-3xl font-semibold mb-4 text-center'>Update Property</h2>
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Property Image</label>
                    <input
                        type='text'
                        name='property_image'
                        value={property.property_image}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Property Title</label>
                    <input
                        type='text'
                        name='property_title'
                        value={property.property_title}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Property Location</label>
                    <input
                        type='text'
                        name='property_location'
                        value={property.property_location}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border rounded'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Agent Name</label>
                    <input
                        type='text'
                        name='agent_name'
                        value={property.agent_name}
                        readOnly
                        className='w-full px-4 py-2 border rounded bg-gray-200 cursor-not-allowed'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Agent Email</label>
                    <input
                        type='email'
                        name='agent_email'
                        value={property.agent_email}
                        readOnly
                        className='w-full px-4 py-2 border rounded bg-gray-200 cursor-not-allowed'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Price Range</label>
                    <input
                        type='text'
                        name='price_range'
                        value={property.price_range}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border rounded'
                    />
                </div>
                <button type='submit' className='bg-black text-[#d2ad5f] px-4 py-2 rounded'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UpdateProperty;
