import React from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const Payment = () => {

  const { parcelId } = useParams();

  // console.log(parcelId);
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
  // const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm parcelId={parcelId} />
      </Elements>
    </>
  );
};

export default Payment;
