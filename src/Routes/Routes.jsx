import {
    createBrowserRouter,
  } from "react-router-dom";

import Main from "../Layout/Main";

import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";

import PrivateRoute from "../Route/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "../Route/AdminRoute/AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/menu",
          element:<Menu></Menu>
        },
        {
          path:"order/:category",
          element:<Order></Order>
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signup",
          element:<SignUp></SignUp>
        },
        {
          path:"dashboard",
          element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
          children:[
            {
              path:"cart",
              element:<Cart></Cart>
            },
            {
              path:"payment",
              element:<Payment></Payment>
            },
            {
              path:"paymentHistory",
              element:<PaymentHistory></PaymentHistory>
            },
            {
              path:"userhome",
              element:<UserHome></UserHome>

            },
            {
              path:"adminHome",
              element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
              path:"allUsers",
              element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
              path:"addItems",
              element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
              path:"manageItems",
              element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
              path:"updateItems/:id",
              
              element:<AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
              loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
            }
           
          ]
        }
    
        
      ]
    },
  ]);