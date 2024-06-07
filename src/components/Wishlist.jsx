import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAuth from './routes/UseAuth';

const Wishlist = () => {
    const { user } = UseAuth();
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (user && user.email) {
                console.log(`Fetching wishlist for user: ${user.email}`);
                try {
                    const response = await axios.get(`http://localhost:5000/list/${user.email}`);
                    console.log('Response:', response.data);
                    setWishlist(response.data);
                } catch (error) {
                    console.error('Error fetching wishlist:', error);
                    Swal.fire('Error', 'Failed to fetch wishlist. Please try again later.', 'error');
                }
            }
        };

        fetchWishlist();
    }, [user]);

    const handleRemoveFromWishlist = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/list/${id}`);
            if (response.status === 200) {
                setWishlist(wishlist.filter(item => item._id !== id));
                Swal.fire('Success', 'Removed from wishlist', 'success');
            } else {
                throw new Error('Failed to remove from wishlist');
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            Swal.fire('Error', 'Failed to remove from wishlist. Please try again later.', 'error');
        }
    };

    const handleMakeOffer = (property) => {
        navigate('/dashboard/offer', { state: { property } });
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
            <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.length === 0 ? (
                    <p className="text-center col-span-3">No items in wishlist</p>
                ) : (
                    wishlist.map((property) => (
                        <div key={property._id} className="bg-white shadow-md rounded-lg p-4">
                            <img src={property.propertyImage} alt={property.propertyTitle} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{property.propertyTitle}</h3>
                            <p className="text-gray-600 mb-2">{property.propertyLocation}</p>
                            <div className="flex items-center mb-2">
                                <img src={property.agentImage} alt={property.agentName} className="w-10 h-10 rounded-full mr-2" />
                                <p className="text-gray-800">{property.agentName}</p>
                            </div>
                            <p className="text-green-500 mb-2">{property.verificationStatus}</p>
                            <p className="text-gray-800 font-bold mb-4">{property.priceRange}</p>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleMakeOffer(property)}
                                    className="bg-black text-[#d2ad5f] px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                                >
                                    Make an Offer
                                </button>
                                <button
                                    onClick={() => handleRemoveFromWishlist(property._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Wishlist;
