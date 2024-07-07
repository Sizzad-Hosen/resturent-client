import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const {user} = useAuth();
    const  axiosSecure = useAxiosSecure();

    const {data: payments = []} = useQuery({
        queryKey:['payments', user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })
    return (
        <div className="p-5">
            <h2 className="text-4xl">Total Payment History : {payments.length}</h2>
            
        </div>
    );
};

export default PaymentHistory;