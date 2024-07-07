import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import login from "../assets/login.svg"
const SignUp = () => {
  const { createUser,updateUserprofile  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();


  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserprofile (data.name,data.photourl)
        .then(() => {

          const userInfo = {
            name : data.name,
            email : data.email,
            photo : data.photo,
          }
            console.log('update user');
            // axios
            axiosPublic.post("/users",userInfo)
            .then(res=>{
              
              console.log(res.data);
              if(res.data.InsertedId)
                {
                  
                  Swal.fire({
                    text: "Successfully Signup!",
                    icon: "success",
                  });
                }
                
              });
              reset()
          navigate("/");

            }) 
        })
      
        .catch((error) => {
          console.error(error);
        });
        
  };
  console.log(watch("example"));

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Signup</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl mb-12 font-bold">SignUp now!</h1>
            <img src={login} alt="" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: true })}
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Photo Url"
                  {...register("photourl", { required: true })}
                  
                  className="input input-bordered"
                />
                {errors.photourl && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  {...register("password", {
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    minLength: 6,
                    maxLength: 18,
                    required: true,
                  })}
                  name="password"
                  className="input input-bordered w-full"
                />
                <span
                  className="absolute top-14 right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
                {errors.password?.type === "required" && (
                  <p className="text-red-400">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-400">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-400">
                    Password must contain one uppercase, one lowercase, one
                    special character, and one digit
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-400">
                    Password must be less than 18 characters
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">SignUp</button>
              </div>
            </form>
            <p className="p-3 text-center">
              Already, Have An Account?{" "}
              <Link to="/login" className="text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
