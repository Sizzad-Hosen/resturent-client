import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {

  const { user, logout } = useContext(AuthContext); 
  const [cart] = useCart();
  const [isAdmin]  = useAdmin();



  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navlinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/menu">Menu</NavLink></li>
      <li><NavLink to="/order/salad">Order Food</NavLink></li>

      {
        user && isAdmin &&
        <li><NavLink to="/dashboard/adminHome">Dashboard</NavLink></li>
      }
      {
        user && !isAdmin &&
        <li><NavLink to="/dashboard/userhome">Dashboard</NavLink></li>
      }

      <li><NavLink to="/dashboard/cart">
          <button className="btn">
     <FaShoppingCart className=""></FaShoppingCart>
      <div className="badge badge-secondary">+{cart.length}</div>
    </button>
          </NavLink>
          </li>

      {user ?
    <>
       {/* <span>{user?.displayName}</span> */}
      
        <button onClick={handleLogOut} className="btn btn-accent">Logout</button>
       </>: <>
        <li><NavLink to="/login">Login</NavLink></li>
        </>
      }
    </>
  );

  return (
    <div className="navbar fixed z-10 opacity-50 max-w-screen-lg font-bold bg-black mx-auto text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">RESTRA.BD</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navlinks}
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">GET STARTED</a>
      </div>
    </div>
  );
};

export default NavBar;
