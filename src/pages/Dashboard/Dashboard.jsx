
import { FaCalendar, FaEnvelope, FaHome, FaShoppingCart, FaStreetView } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { TiThMenu } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">

            {/* side bar */}
            <div className="w-64 min-h-screen text-white font-semibold bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?  <> 

                        <li>
                        <NavLink to="/dashboard/adminHome" className="flex items-center space-x-2">
                            <FaHome />
                            <span>Admin Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems" className="flex items-center space-x-2">
                            <FaShoppingCart />
                            <span>Add Items</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems" className="flex items-center space-x-2">
                            <FaCalendar />
                            <span>Manage Items</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="flex items-center space-x-2">
                            <FaStreetView />
                            <span>Manage Bookings</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allUsers" className="flex items-center space-x-2">
                            <FaCalendar />
                            <span>All Users</span>
                        </NavLink>
                    </li>
                    
                     </> 
                        :
                        <>
                               <li>
                        <NavLink to="/dashboard/userhome" className="flex items-center space-x-2">
                            <FaHome />
                            <span>User Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart" className="flex items-center space-x-2">
                            <FaShoppingCart />
                            <span>My Cart</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation" className="flex items-center space-x-2">
                            <FaCalendar />
                            <span>Reservation</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review" className="flex items-center space-x-2">
                            <FaStreetView />
                            <span>Add Review</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="flex items-center space-x-2">
                            <FaCalendar />
                            <span>Payment History</span>
                        </NavLink>
                    </li>
                 

                   
                        </>
                     }
                        <div className=" bg-white divider"></div>
                      <li>
                        <NavLink to="/" className="flex items-center space-x-2">
                            <FaHome />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu" className="flex items-center space-x-2">
                        <TiThMenu />

                            <span>Menu</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad" className="flex items-center space-x-2">
                        <GiShoppingBag />
                            <span>Order</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact" className="flex items-center space-x-2">
                     <FaEnvelope></FaEnvelope>
                            <span>Contact</span>
                        </NavLink>
                    </li>
             

                </ul>
            </div>

            {/* dashboard content  */}

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
