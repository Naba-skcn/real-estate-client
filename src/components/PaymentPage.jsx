import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
    const location = useLocation();
    const { offerId, offerAmount } = location.state;

    return (
        <div className="container mx-auto flex font justify-center items-center min-h-screen bg-[url('https://images.unsplash.com/photo-1695278255455-9afc87008775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
            <div className="max-w-lg w-full bg-white p-8 rounded-lg ">
                <h2 className="text-2xl font-bold text-center p-2 bg-black text-[#d2ad5f] rounded-lg mb-6">Payment</h2>
                <Elements stripe={stripePromise}>
                    <PaymentForm offerId={offerId} offerAmount={offerAmount} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
