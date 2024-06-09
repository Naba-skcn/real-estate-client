import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/css/PaymentForm.css';
import UseAuth from './routes/UseAuth';

const PaymentForm = ({ offerId, offerAmount }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = UseAuth();

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/create-payment-intent', { amount: offerAmount });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Failed to create payment intent', error);
            }
        };

        createPaymentIntent();
    }, [offerAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error: createPaymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (createPaymentMethodError) {
            setError(createPaymentMethodError.message);
            console.log('[createPaymentMethodError]', createPaymentMethodError);
            return;
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            console.log('[confirmError]', confirmError);
        } else {
            console.log('[PaymentIntent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction Id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Update offer status to 'Bought'
                await axios.post('http://localhost:5000/update-offer-status', {
                    offerId: offerId,
                    transactionId: paymentIntent.id
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
           <div className='flex font gap-2'>
           <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .font {
                    font-family: 'PT Serif', serif;
                }`}
            </style>
           
            <button type="submit" className="pay-button bg-black p-2 text-[#d2ad5f] rounded-lg" disabled={!stripe || !clientSecret}>
                Pay ${offerAmount}
            </button>
           </div>
           {error && <div className="card-error" role="alert">{error}</div>}
            {transactionId && (
                <p className="text-green-500 rounded-lg p-2 bg-black mt-2">Transaction complete with transactionId: {transactionId}</p>
            )}
          <div className='mt-3'>
          <Link to="/dashboard/bought" className="back-button bg-black p-2 text-[#d2ad5f] rounded-lg">
                Go Back
            </Link>
          </div>
        </form>
    );
};

export default PaymentForm;
