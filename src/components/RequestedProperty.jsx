import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure you've installed and configured Tailwind CSS
import UseAuth from './routes/UseAuth';

const RequestedProperty = () => {
    const [offers, setOffers] = useState([]);
    const {user} = UseAuth();

    useEffect(() => {
        // Fetch the offers from the server
        const fetchOffers = async () => {
            try {
                const response = await fetch(`http://localhost:5000/offers/${user.email}`); 
                const data = await response.json();
                setOffers(data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers(user);
    }, []);

    const handleAccept = async (offerId, propertyId) => {
        try {
            // Update the offer status to "Accepted"
            await fetch(`http://localhost:5000/offers/${offerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Accepted' }),
            });

            // Reject other offers for the same property
            await fetch(`http://localhost:5000/offers/rejectOthers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId, offerId }),
            });

            // Update the offers state
            setOffers(prevOffers => prevOffers.map(offer =>
                offer._id === offerId ? { ...offer, status: 'Accepted' } :
                offer.propertyId === propertyId ? { ...offer, status: 'Rejected' } :
                offer
            ));
        } catch (error) {
            console.error('Error accepting offer:', error);
        }
    };

    const handleReject = async (offerId) => {
        try {
            // Update the offer status to "Rejected"
            await fetch(`http://localhost:5000/offers/${offerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Rejected' }),
            });

            // Update the offers state
            setOffers(prevOffers => prevOffers.map(offer =>
                offer._id === offerId ? { ...offer, status: 'Rejected' } : offer
            ));
        } catch (error) {
            console.error('Error rejecting offer:', error);
        }
    };

    return (
        <div className="container font mx-auto px-4 py-8">
             <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className="text-2xl font-bold mb-4">Requested Property</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Property Title</th>
                            <th className="px-4 py-2 border-b">Property Location</th>
                            <th className="px-4 py-2 border-b">Buyer Email</th>
                            <th className="px-4 py-2 border-b">Buyer Name</th>
                            <th className="px-4 py-2 border-b">Offered Price</th>
                            <th className="px-4 py-2 border-b">Status</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map(offer => (
                            <tr key={offer._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b">{offer.propertyTitle}</td>
                                <td className="px-4 py-2 border-b">{offer.propertyLocation}</td>
                                <td className="px-4 py-2 border-b">{offer.buyerEmail}</td>
                                <td className="px-4 py-2 border-b">{offer.buyerName}</td>
                                <td className="px-4 py-2 border-b">{offer.offerAmount}</td>
                                <td className="px-4 py-2 border-b">{offer.status}</td>
                                <td className="px-4 py-2 border-b">
                                    {offer.status === 'Pending' && (
                                        <>
                                           <div className='flex gap-2'>
                                           <button
                                                className="bg-green-500 text-white p-1 rounded mr-2"
                                                onClick={() => handleAccept(offer._id, offer.propertyId)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-1 rounded"
                                                onClick={() => handleReject(offer._id)}
                                            >
                                                Reject
                                            </button>
                                           </div>
                                        </>
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

export default RequestedProperty;
