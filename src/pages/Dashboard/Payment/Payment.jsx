import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from "../Dashboard/../Payment/CheckoutFrom/CheckoutFrom";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_GATEWAY_API);
const Payment = () => {
    return (
        <div>
            <SectionTitle header={"PAYMENT"} subheader={"PLEASE PAYMENT FOR EAT"}></SectionTitle>
            <Elements stripe={stripePromise}>
              <CheckoutFrom></CheckoutFrom>
            </Elements>
        </div>
    );
};

export default Payment;