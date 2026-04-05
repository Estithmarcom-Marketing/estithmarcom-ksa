"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import banner_image from "@/assets/hero-banner.jpg";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerSwiper() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {[1, 2, 3].map((_, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[calc(100vh-140px)] bg-cover bg-center"
              style={{
                backgroundImage: `url(${banner_image.src})`,
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
