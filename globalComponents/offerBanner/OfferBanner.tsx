

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function OfferBanner() {
  const images = [
   "/public/images/imgae1.jpg",
   "/public/images/imgae1.jpg",
   "/public/images/imgae1.jpg",
   "/public/images/imgae1.jpg",
   "/public/images/imgae1.jpg",
   "/public/images/imgae1.jpg",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={800}
              height={500}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

