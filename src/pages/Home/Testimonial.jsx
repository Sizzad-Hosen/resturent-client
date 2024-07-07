import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

// import Swiper core and required modules
import { Navigation} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Testimonial = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/reviews")
        .then(res=>res.json())
        .then(data=>{
            setReviews(data);
        })
    },[])
    return (
        <div className="mb-10 mt-5">
         <SectionTitle
         subheader={"What Our Client Say"}
         header={"TESTIMONIALS"}
      >
     
      </SectionTitle>
{/* -------------------------- main moja nica  ---------------------- */}
<Swiper
      // install Swiper modules
      modules={[Navigation]}
     
      navigation={true}
  className="mySwiper"
     
 
    >
      <div>
        {
            reviews.map(review=>
                
                <SwiperSlide key={review._id}>
<div className="text-center p-6">
<div className="rating ">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 " />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 " checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 " />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 " />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 " />
</div>

</div>
                <p className="ml-10">{review.details}</p>
                <p className="text-center text-yellow-400">{review.name}</p>
                </SwiperSlide>)
        }
      </div>
            
        </Swiper>
      </div>
    );
};

export default Testimonial;