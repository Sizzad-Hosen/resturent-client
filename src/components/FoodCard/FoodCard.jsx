import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
  const { name, price, recipe, image, _id } = item;
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddCart = async (food) => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };

      try {
        const res = await axiosSecure.post("/cart", cartItem);
        if (res.data.insertedId) {
          Swal.fire({
            title: `${name} added to your cart list`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          // Refetch cart items to update the cart icon
          refetch();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      Swal.fire({
        title: "You are not Logged In?",
        text: "Please login, and add item to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card w-100 bg-slate-200 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="food" className="rounded-xl" />
      </figure>
      <p className="text-2xl absolute right-0 mr-12 mt-10 text-black font-semibold">
        ${price}
      </p>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-purple-600">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={() => handleAddCart(item)}
            className="btn btn-outline btn-secondary hover:bg-slate-500"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
