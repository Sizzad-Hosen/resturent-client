import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart,refetch] = useCart();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const totalPrice = cart.reduce((total,item)=> total + item.price, 0) 
       const handleDeleted =(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
         
           axiosSecure.delete(`/cart/${id}`)
           .then(res=>{
            console.log(res.data);
            if(res.data.deletedCount>0)
                {
                    refetch();
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
           })

            }
          });
       }
    

    return (
        <div className="ps-4">
            <h2 className="text-4xl text-center p-4">My Cart</h2>
            <div className="flex justify-evenly">
            <h2>Items : {cart.length}</h2>
            <h2>Total Price : {totalPrice}</h2>
           <Link to="/dashboard/payment">
           <button disabled={!cart.length} className="btn bg-teal-500 text-white hover:bg-orange-500">PAY</button>
           </Link>

            </div>

            <div className="overflow-x-auto">

  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
         <th>Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Deleted</th>
      
      </tr>
    </thead>
    <tbody>
{
    cart.map((item,index)=>

        <tr key={item._id}>

           <th>
            {
                index+1
            }
           </th>
        
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={item.image}
                    alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">{item.name}</div>
             
              </div>
            </div>
          </td>


          <td>
          {item.name}
           
    
          </td>
          <td>${item.price}</td>
          <th>
            <button onClick={()=>handleDeleted(item._id)} className="btn btn-ghost btn-xs"><FaTrashAlt></FaTrashAlt></button>
          </th>
        </tr>
    )


}
</tbody>
    
  </table>


</div>
        </div>
    );
};

export default Cart;