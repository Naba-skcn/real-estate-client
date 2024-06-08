import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAuth from './routes/UseAuth';

const MakeOffer = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = UseAuth();
    const { property } = state;
    const { propertyTitle, propertyLocation, propertyImage, agentName, priceRange, _id: propertyId, userName: buyerName } = property;
const extractPrices = priceStr => priceStr.match(/\$\d+(?:,\d+)*\s*-\s*\$\d+(?:,\d+)*/)?.[0].split(' - ').map(price => parseInt(price.replace(/\$|,/g, '')));
    const [offerAmount, setOfferAmount] = useState('');
    const [buyingDate, setBuyingDate] = useState('');

    const handleOffer = async () => {
        const [minPrice, maxPrice] = extractPrices(priceRange);
        console.log(minPrice, maxPrice)
        const offerAmountNumber = Number(offerAmount);

        if (isNaN(offerAmountNumber)) {
            Swal.fire('Error', 'Offer amount must be a number.', 'error');
            return;
        }

        if (offerAmountNumber < minPrice || offerAmountNumber > maxPrice) {
            Swal.fire('Error', 'Offer amount must be within the price range specified by the agent.', 'error');
            return;
        }

        const offer = {
            propertyId,
            propertyTitle,
            propertyLocation,
            propertyImage,
            agentName,
            offerAmount: offerAmountNumber,
            buyerEmail: user.email,
            buyerName,
            buyingDate,
            status: 'Pending'
        };
    
        try {
            const response = await axios.post('http://localhost:5000/offers', offer);
            if (response.status === 201) {
                Swal.fire('Success', 'Your offer has been submitted.', 'success');
                navigate('/dashboard/bought');
            } else {
                throw new Error('Failed to submit offer');
            }
        } catch (error) {
            console.error('Error submitting offer:', error);
            Swal.fire('Error', 'Failed to submit offer. Please try again later.', 'error');
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
            <h2 className="text-2xl font-bold mb-4">Make an Offer</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Property Title</label>
                    <input type="text" value={propertyTitle} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Property Location</label>
                    <input type="text" value={propertyLocation} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Property Image</label>
                    <input type="url" value={propertyImage} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Agent Name</label>
                    <input type="text" value={agentName} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Offered Amount</label>
                    <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Buyer Email</label>
                    <input type="text" value={user.email} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Buyer Name</label>
                    <input type="text" value={buyerName} readOnly className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Buying Date</label>
                    <input
                        type="date"
                        value={buyingDate}
                        onChange={(e) => setBuyingDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    onClick={handleOffer}
                    className="bg-black  text-[#d2ad5f] px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                >
                    Offer
                </button>
            </div>
        </div>
    );
};

export default MakeOffer;
