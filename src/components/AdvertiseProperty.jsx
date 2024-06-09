import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdvertiseProperty = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVerifiedProperties();
    }, []);

    const fetchVerifiedProperties = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/property/verified');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching verified properties:', error);
            setError('Failed to fetch verified properties');
        } finally {
            setLoading(false);
        }
    };

    const handleAdvertise = async (property) => {
        try {
            await axios.post('http://localhost:5000/advertise', property);
            alert('Property advertised successfully!');
        } catch (error) {
            console.error('Error advertising property:', error);
            alert('Failed to advertise property');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='container font mx-auto md:w-3/4 mt-8'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className='text-2xl font-bold mb-4'>Verified Properties</h2>
            <table className='min-w-full bg-white border border-gray-300'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='py-2 px-4 border-b'>Property Image</th>
                        <th className='py-2 px-4 border-b'>Property Title</th>
                        <th className='py-2 px-4 border-b'>Price Range</th>
                        <th className='py-2 px-4 border-b'>Agent Name</th>
                        <th className='py-2 px-4 border-b'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id} className='hover:bg-gray-100'>
                            <td className='py-2 px-4 border-b'>
                                <img src={property.property_image} alt={property.property_title} width="100" />
                            </td>
                            <td className='py-2 px-4 border-b'>{property.property_title}</td>
                            <td className='py-2 px-4 border-b'>{property.price_range}</td>
                            <td className='py-2 px-4 border-b'>{property.agent_name}</td>
                            <td className='py-2 px-4 border-b'>
                                <button
                                    onClick={() => handleAdvertise(property)}
                                    className='bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700 transition duration-300'
                                >
                                    Advertise
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdvertiseProperty;
