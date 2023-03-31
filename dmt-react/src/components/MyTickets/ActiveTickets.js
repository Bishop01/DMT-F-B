import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../common/Loader";

import "swiper/css";
import "swiper/css/bundle";
import MyTicket from "./MyTicket";

export const ActiveTickets = ({
  tickets,
  swiper,
  activeSlide,
  setActiveSlide,
  onRefund,
}) => {
  const style = {
    container: "w-[80%] flex items-center",
    slideContainer: "w-full flex items-center justify-center",
    slide: `w-full h-[450px]`,
    swiperSlider: "h-[450px] w-full",
  };

  const active = {
    opcaity: 1,
    scale: 1,
    rotateY: 0,
  };
  const inactive = {
    opacity: 0.5,
    scale: 0.7,
    rotateY: -30,
  };
  let index = -1;

  return tickets !== null && tickets !== undefined ? (
    <div className={style.container}>
      <Swiper
        ref={swiper}
        centeredSlides={true}
        initialSlide={activeSlide}
        onSlideChange={(e) => setActiveSlide(e.realIndex)}
        spaceBetween={30}
        slidesPerView={3}
        className="w-full"
      >
        {tickets.map((ticket) => {
          if (ticket.ticket.status.toLowerCase() === "active") {
            index += 1;
            return (
              <SwiperSlide key={index} className={style.swiperSlider}>
                <div className={style.slideContainer}>
                  <motion.div
                    animate={activeSlide == index ? active : inactive}
                    transition={{ duration: 0.5 }}
                    className={style.slide}
                  >
                    <MyTicket id={index} ticket={ticket} onRefund={onRefund} />
                  </motion.div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  ) : (
    <Loader />
  );
};
