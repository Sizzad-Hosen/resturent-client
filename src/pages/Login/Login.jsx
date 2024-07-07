import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialAuth from '../../components/SocialAuth/SocialAuth';
import login from "../../assets/login.svg"
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
 
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidCaptcha = (e) => {
    const user_Captchavalue = e.target.value;
    if (validateCaptcha(user_Captchavalue)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        
        Swal.fire({
          text: "Successfully Logged In!",
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          text: "Login Failed!",
          icon: "error",
        });
      });

      navigate (from, { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">


        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mb-12 font-bold">Login now!</h1>
     <img src={login} alt="" />
          </div>


          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
              </div>
              
              <div className="form-control relative">

                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input  type={showPassword ? "text" : "password"} placeholder="password" name="password" className="input input-bordered" required />
                <span
                  className="absolute top-14 right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>

              </div>



              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidCaptcha} type="text" placeholder="type the text above" name="captcha" className="input input-bordered" required />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn bg-blue-500 text-white" >Login</button>
              </div>
            </form>
            <p className='p-3 text-center'>New Here? Create an Account: <Link to="/signup" className='text-blue-400'>Sign Up</Link></p>
          
          <SocialAuth></SocialAuth>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
