import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LatestReview = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentRating, setCurrentRating] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://real-estate-server-a12.vercel.app/reviews/latest`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleRating = (reviewId, rating) => {
        setCurrentRating(prev => ({
            ...prev,
            [reviewId]: rating,
        }));

        // Here you would typically send the new rating to the server
        // axios.post(`https://real-estate-server-a12.vercel.app/reviews/${reviewId}/rating`, { rating })
        //     .then(response => {
        //         // Handle success
        //     })
        //     .catch(error => {
        //         // Handle error
        //         console.error('Error updating rating:', error);
        //     });
    };

    const renderStars = (reviewId, rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i <= rating ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-5 h-5 cursor-pointer ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => handleRating(reviewId, i)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className='container mx-auto md:w-3/4 mt-8'>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }
                .review-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .review-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                `}
            </style>
            <div className='font text-center mb-2'>
                <span className='text-xs text-[#d2ad5f]'>----- Explore latest reviews for why we stand out -----</span>
                <h2 className='text-3xl font-bold uppercase border-y-4 py-4'>Testimonial Spotlight</h2>
            </div>

            <section className="my-4 font">
                <div className="container mx-auto flex flex-col items-center pb-6 mb-4 md:p-10 md:px-12">
                    <h1 className="text-4xl font-semibold leading-none text-center">What our customers are saying about us</h1>
                </div>
                <div className="container mx-auto grid grid-cols-1 gap-8 lg:gap-20 md:px-10 md:pb-10 lg:grid-cols-2">
                    {loading ? (
                        <p>Loading...</p>
                    ) : reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-card flex flex-col items-center mx-12 lg:mx-0 p-6 bg-black text-[#d2ad5f] rounded-lg shadow-md">
                                <div className="relative text-center">
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute top-0 left-0 w-8 h-8 text-gray-300">
                                        <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                        <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                    </svg>
                                    <p className="px-12 py-1 text-lg italic"> {review.review} </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute bottom-0 right-0 w-8 h-8 text-gray-300">
                                        <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                        <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                    </svg>
                                </div>
                                <img src={review.userImage} alt={`${review.userName}'s avatar`} className="w-16 h-16 rounded-full mb-4" />
                                <span className="w-12 h-1 my-2 rounded-lg bg-violet-600"></span>
                                <p className="font-bold text-lg">{review.userName}</p>
                                <p className="text-gray-500">{review.propertyTitle}</p>
                                <div className="flex mt-2">
                                    {renderStars(review.id, currentRating[review.id] || review.rating)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LatestReview;
