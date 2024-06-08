import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
    const location = useLocation();
    const { offerAmount } = location.state;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-lg w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>
                <Elements stripe={stripePromise}>
                    <PaymentForm offerAmount={offerAmount} />
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
