import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const PaymentForm = ({ parcelId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // get the purchase parsel

  const { data, isPending } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/parcel/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <p>Loading.........</p>;
  }
  // amount transfer cents
  const amount = data?.parcelCost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // *****************
    if (!stripe || !elements) {
      return;
    }
    // **************

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    // ****************
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }
    // ***********create payment intent**********
    const res = await axiosSecure.post(`/create-payment-intent`, {
      amountInCents,
      parcelId,
    });
    // final result
    // console.log("rsponse for the server", res);

    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
        },
      },
    });

    console.log("result in the client", result);
   
    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");

      if (result.paymentIntent.status === "succeeded") {

        const transactionId=result.paymentIntent.id;
        console.log("transaction id",transactionId)
 console.log("this is payment",result.paymentIntent.id)
        const paymentData = {
          paymentIntentId: transactionId,
          parcelId,
          userId: user?.uid,
          billing_name: user?.displayName,
          userEmail: user?.email,
          amount: result.paymentIntent.amount,
          currency: result.paymentIntent.currency,
          payment_method: result.paymentIntent.payment_method,
          status: result.paymentIntent.status,
          method_type: result.paymentIntent.payment_method_types?.[0] || "card",
          liveMode: result.paymentIntent.livemode,
        };
        await axiosSecure.post("/payments/record", paymentData).then((res) => {
          console.log(res);
          if (res?.data?.insertedId) {
            // payment success
            console.log("✅ Payment succeeded 1");

            Swal.fire({
              title: "Payment Successful!",
              text: `Transaction ID: ${transactionId}`,
              icon: "success",
              confirmButtonText: "Go to My Parcels",
            }).then(() => {
              // Redirect
              navigate("/dashboard/myParcels");
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" space-y-4 bg-white p-6 rounded-xl shadow-md  w-full max-w-md mx-auto"
      >
        <CardElement className=" p-2 border rounded "></CardElement>
        <button 
          className=" btn btn-primary bg-green-500 border-none mx-auto flex justify-center  text-center"
          disabled={!stripe}
        >
          Pay ${data?.parcelCost}
        </button>
        {error && <p className=" text-error">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
