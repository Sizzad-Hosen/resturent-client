// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
// import SwiperCore, { Pagination } from 'swiper';
// import FoodCard from '../../../components/FoodCard/FoodCard';

// // Install Pagination module
// SwiperCore.use([Pagination]);

// const PaginatedFoodCards = ({ items }) => {
//   const slides = [];

//   // Create slides with 6 items each
//   for (let i = 0; i < items.length; i += 6) {
//     slides.push(
//       <SwiperSlide key={i}>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//           {items.slice(i, i + 6).map(item => (
//             <FoodCard key={item._id} item={item} />
//           ))}
//         </div>
//       </SwiperSlide>
//     );
//   }

//   return (
//     <Swiper
//       slidesPerView={1}
//       pagination={{ clickable: true }}
//       spaceBetween={30}
//     >
//       {slides}
//     </Swiper>
//   );
// };

// export default PaginatedFoodCards;
