import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:5000/reviews/latest');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/reviews/${id}`);
            setReviews(reviews.filter(review => review._id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="container font mx-auto px-4">
             <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map(review => (
                    <div key={review._id} className="bg-white shadow-lg rounded p-4">
                        <img src={review.userImage} alt="Reviewer" className="w-12 h-12 rounded-full mb-2" />
                        <p className="font-semibold text-gray-800">Name: {review.userName}</p>
                        <p className="text-gray-600">Email: {review.userEmail}</p>
                        <p className="text-gray-700">{review.review}</p>
                        <button onClick={() => handleDelete(review._id)} className="mt-2 px-4 py-2 bg-black text-[#d2ad5f] rounded hover:bg-gray-600">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageReviews;
