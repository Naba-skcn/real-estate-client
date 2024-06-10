import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
            const response = await axios.get('https://real-estate-server-a12.vercel.app/property/verified');
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
            await axios.post('https://real-estate-server-a12.vercel.app/advertise', property);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Property advertised successfully!',
                timer: 3000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error('Error advertising property:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to advertise property',
                timer: 3000,
                showConfirmButton: false
            });
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
                }

                .responsive-table {
                    overflow-x: auto;
                    width: 100%;
                }

                @media screen and (max-width: 640px) {
                    .responsive-table {
                        overflow-x: auto;
                    }
                }

                @media screen and (max-width: 480px) {
                    .container {
                        width: 90%;
                    }
                }
                `}
            </style>
            <h2 className='text-2xl font-bold mb-4'>Verified Properties</h2>
            <div className='responsive-table'>
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
                                        className='bg-green-800 text-white py-1 px-3 rounded hover:bg-green-700 transition duration-300'
                                    >
                                        Advertise
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseProperty;
