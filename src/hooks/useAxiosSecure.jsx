import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
})
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {logOut}= useAuth();

  // request interceptor to add authorization header for every secure call to the api  
  axiosSecure.interceptors.request.use(function (config){
    const token = localStorage.getItem('acess-token')
    // console.log('reqested stoped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },function (error){
    return Promise.reject(error);

  });
// axio u=ibterceptor 401 and 403 status 
axios.interceptors.response.use(function (response) {

  return response;
}, async(error)=> {
  const status = error.response.status;
  // console.log("status error in the interceptor", status);
  // for 401 or 403 logout the user and move the user to the login 
  if(status==401 || status==403)
    {
      await logOut();

      navigate("/login");
    }
  return Promise.reject(error);
});


  return axiosSecure;
};


export default useAxiosSecure;