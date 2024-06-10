import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from './routes/UseAuth';
import { useNavigate } from 'react-router-dom';

const PropertyBought = () => {
    const [offers, setOffers] = useState([]);
    const { user } = UseAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`https://real-estate-server-a12.vercel.app/buyer/offers/${user.email}`);
                setOffers(response.data);
            } catch (error) {
                console.error('Failed to fetch offers', error);
            }
        };

        fetchOffers();
    }, [user]);

    const handlePay = (offerId, offerAmount) => {
        navigate(`/dashboard/payment/${offerId}`, { state: { offerId, offerAmount } });
    };

    return (
        <div className="container mx-auto font py-8">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className="text-3xl font-bold mb-8">Property Bought</h2>
            <div className="flex flex-wrap -mx-4">
                {offers.map((offer) => (
                    <div key={offer._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={offer.propertyImage} alt={offer.propertyTitle} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{offer.propertyTitle}</h3>
                                <p className="text-gray-700 mb-1"><span className="font-semibold">Location:</span> {offer.propertyLocation}</p>
                                <p className="text-gray-700 mb-1"><span className="font-semibold">Agent:</span> {offer.agentName}</p>
                                <p className="text-gray-700 mb-1"><span className="font-semibold">Offered Amount:</span> ${offer.offerAmount}</p>
                                <p className="text-gray-700 mb-4"><span className="font-semibold">Status:</span> {offer.status}</p>
                                {offer.status === 'Accepted' && (
                                    <button 
                                        onClick={() => handlePay(offer._id, offer.offerAmount)} 
                                        className="bg-black text-[#d2ad5f] px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Pay
                                    </button>
                                )}
                                {offer.status === 'Bought' && (
                                    <p className="bg-black p-2 text-[#d2ad5f] rounded-lg">Transaction ID: {offer.transactionId}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyBought;
