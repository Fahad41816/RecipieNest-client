/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

'use client'
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
   
import { useRouter } from 'next/navigation';
import { useUser } from '@/src/context/AuthProvider';
import { addusermembership } from '@/src/services/AuthService';

// Load Stripe public key
const stripePromise = loadStripe('pk_test_51NJZyDEWZrevdXvyL05y7mCSXWpHPt9NeWkzPIzXaCa95EoLq9npzOrJJup1OAJlG530TjFWQvccU6l4etn0BknB00Igt4nJwY');

// Custom styling for the Stripe input fields
const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#9e2146' },
  },
};

// Stripe payment form component with separated inputs
const CheckoutForm = () => {
  const stripe : any = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [ClientSecret, setClientSecret] = useState('')

  const {user} : any  =  useUser()

   
  const route = useRouter()

 
  const handleSubmit = async (event : any) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      console.log(paymentMethod.id);
      setErrorMessage(null);
      // Handle the payment m ethod ID
      setTimeout(async() => {
        setLoading(false);      
        const responce = await addusermembership(user._id)
        if(responce.success){
          route.push('/paymentSuccess')   
        } 
      }, 1500);
    }
  };


  return (
    <div className="max-w-lg mx-auto   shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Card Number
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardNumberElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardExpiryElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        <div className="form-group">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            CVC
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardCvcElement options={ELEMENT_OPTIONS} />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full text-white py-2 px-4 rounded-md transition ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};


const page = () => {
  return (
    <div className="min-h-screen   flex items-center justify-center">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default page;
