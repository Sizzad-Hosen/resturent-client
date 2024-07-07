import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialAuth = () => {
 const { googleSignIn } = useAuth();
 const axiosPublic = useAxiosPublic();
 const navigate = useNavigate();



    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
         const   userInfo = {
                email : result.user?.email,
                name : result.user?.displayName,

            }
            console.log("Google Sign-In successful:", result);
            axiosPublic.post("/users",userInfo)
            .then(res=>{
                console.log(res.data);
                navigate("/");

            })
        })
        .catch(error => {
            console.error("Google Sign-In error:", error);
        });
    };

    return (
        <div className="p-8 flex">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-error">
                <FaGoogle className="mr-2" />
                Google
            </button>
        </div>
    );
};

export default SocialAuth;
