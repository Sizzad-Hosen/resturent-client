import { Helmet } from "react-helmet-async";
import Banner from "../Banner";
import Category from "../Category";
import Featured from "../Featured";
import Popular from "../Popular";
import Testimonial from "../Testimonial";


const Home = () => {
    return (
        <div>
                  <Helmet>
                  <title>RESTRA.BD | Home </title>
                  </Helmet>

     <Banner></Banner>
     <Category></Category>
     <Popular></Popular>
     <Featured></Featured>
     <Testimonial></Testimonial>

        </div>
    );
};

export default Home;