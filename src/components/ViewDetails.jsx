import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UseAuth from './routes/UseAuth';
import { Helmet } from 'react-helmet-async';

const ViewDetails = () => {
    const { user } = UseAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [change, setChange] = useState();
    const reviewReFetch = async () =>{
        setChange(!change)
    }
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`https://real-estate-server-a12.vercel.app/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://real-estate-server-a12.vercel.app/property/${id}/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchProperty();
        fetchReviews();
    }, [id, change]);

    const handleAddToWishlist = async () => {
        if (!user) {
            Swal.fire('Please log in to add to wishlist');
            return;
        }
        try {
            const response = await axios.post(`https://real-estate-server-a12.vercel.app/list`, {
                userId: user.id,
                propertyId: id,
                propertyTitle: property.property_title,
                propertyImage: property.property_image,
                propertyDescription: property.description,
                propertyLocation: property.property_location,
                priceRange: property.price_range,
                verificationStatus: property.verification_status,
                agentName: property.agent_name,
                agentImage: property.agent_image,
                agentEmail: property.agent_email,
                userEmail: user.email,
                userName: user.displayName,
            });
            if (response.status === 200 || response.status === 201) {
                Swal.fire('Added to wishlist!');
            } else {
                throw new Error('Failed to add to wishlist');
            }
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            Swal.fire('Failed to add to wishlist. Please try again later.');
        }
    };

    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire('Please log in to add a review');
            return;
        }
        try {
            const currentTime = new Date().toLocaleString();
            const response = await axios.post(`https://real-estate-server-a12.vercel.app/property/${id}/reviews`, {
                userId: user.id,
                review: newReview,
                agentName: property.agent_name,
                agentEmail: property.agent_email,
                reviewTime: currentTime,
                userName: user.displayName, 
                userImage: user.photoURL,
                userEmail: user.email,
                propertyTitle: property.property_title, 
            });
            if (response.status === 200 || response.status === 201) {
                const addedReview = response.data;
                setReviews([...reviews, addedReview]);
                setNewReview('');
                Swal.fire('Review added!');
                reviewReFetch();
                document.getElementById('addReviewModal').close(); 
            } else {
                throw new Error('Failed to add review');
            }
        } catch (error) {
            console.error('Error adding review:', error);
            Swal.fire('Failed to add review. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto">
            <Helmet><title>Real Estate | Property Details</title></Helmet>
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
                <h2 className='text-3xl font-bold uppercase rounded-lg py-4 text-[#d2ad5f]'>Property Insights</h2>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : property ? (
                <div className='font'>
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold mb-4">{property.property_title}</h3>
                        <p><span className='font-semibold text-black'>Description:</span> {property.description}</p>
                        <p><span className='font-semibold text-black'>Price Range:</span> {property.price_range}</p>
                        <p><span className='font-semibold text-black'>Agent Name:</span> {property.agent_name}</p>
                        <p><span className='font-semibold text-black'>Agent Email:</span> {property.agent_email}</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-8">
                        <img src={property.property_image} alt={property.title} className="w-full h-[500px] object-cover" />
                        <div className="p-8">
                            <button onClick={handleAddToWishlist} className="btn bg-black border-white text-[#d2ad5f]">Add to Wishlist</button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="mb-4">
                                    <p>{review.review}</p>
                                    <p className="text-gray-600 text-sm">- {review.userName}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                        <button className="btn bg-black border-white text-[#d2ad5f] mt-4" onClick={() => document.getElementById('addReviewModal').showModal()}>Add a Review</button>
                        <dialog id="addReviewModal" className="modal">
    <form onSubmit={handleAddReview} className="modal-box">
        <h3 className="font-bold text-lg">Add a Review</h3>
        <div className="mb-4">
            <img src={property && property.property_image} alt={property && property.property_title} className="w-full h-[200px] object-cover" />
        </div>
        <input type='text' readOnly className="input input-bordered w-full my-4" defaultValue={property.property_title}></input>
        <input type='text' readOnly className="input input-bordered w-full my-4" defaultValue={property.agent_name}></input>
        <input type='url'  readOnly className="input input-bordered w-full my-4" defaultValue={user && user.photoURL} ></input>
        <input type='text'  readOnly className="input input-bordered w-full my-4" defaultValue={user && user.email} ></input>
        <input
            type="text"
            className="input input-bordered w-full my-4"
            placeholder="Your Name"
            defaultValue={user && user.displayName}
            readOnly
        />
     
     <input
    type="text"
    className="input input-bordered w-full my-4"
    placeholder="Review Time"
    value={new Date().toLocaleString()}
    readOnly
     />
        <textarea
            className="textarea textarea-bordered w-full my-4"
            placeholder="Write your review here"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            required
        />
        <div className="modal-action">
            <button type="submit" className="btn bg-black border-white text-[#d2ad5f]">Submit</button>
            <button type="button" className="btn btn-outline" onClick={() => document.getElementById('addReviewModal').close()}>Cancel</button>
        </div>
    </form>
</dialog>

                    </div>
                </div>
            ) : (
                <p>Property not found.</p>
            )}
        </div>
    );
};

export default ViewDetails;
