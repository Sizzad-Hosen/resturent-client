
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const AdminRoute = ({children}) => {
    const location = useLocation();
    const {user,loading} = useAuth();
    const [ isAdmin,isAdminLoading] = useAdmin();

   
    if(loading ||isAdminLoading)
        {
            <progress className="progress w-56"></progress>
        }
    if(user && isAdmin)
        {
            return children;
        }
    return <Navigate to="/login" state={{from:location}} replace ></Navigate>
};

export default AdminRoute;