import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from './routes/UseAuth';
import { toast } from 'react-toastify';

const MyReviews = () => {
    const { user } = UseAuth();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (user) {
                    const response = await axios.get(`http://localhost:5000/reviews/user/${user.email}`);
                    setReviews(response.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [user]);

    const handleDelete = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:5000/reviews/${reviewId}`);
            setReviews(reviews.filter(review => review._id !== reviewId));
            toast.success('Review successfully deleted');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
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
            <h2 className='text-3xl font-semibold mb-4'>My Reviews</h2>
            {reviews.map(review => (
                <div key={review._id} className='border p-4 rounded-lg shadow mb-4'>
                    <h3 className='text-xl font-bold'>{review.propertyTitle}</h3>
                    <p className='text-gray-700'>Agent: {review.agentName}</p>
                    <p className='text-gray-700'>Description: {review.review}</p>
                    <p className='text-gray-700'>Review Time: {review.reviewTime}</p>
                    <p className='mt-2'>{review.review_description}</p>
                    <button
                        onClick={() => handleDelete(review._id)}
                        className='bg-red-500 text-white px-4 py-2 rounded mt-2'>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MyReviews;
