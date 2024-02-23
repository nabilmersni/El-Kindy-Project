import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function InstrumentsSwipper() {
  const [my_swiper, set_my_swiper] = useState({});
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <div className="flex justify-center items-center gap-8">
      <button onClick={() => my_swiper.slidePrev()}>
        <svg
          id="swipper-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="37.737"
          height="37.737"
          viewBox="0 0 37.737 37.737"
          className="fill-primary hover:fill-secondaryDark transition-all duration-75"
        >
          <path
            id="Path_520"
            data-name="Path 520"
            d="M20.868,2A18.868,18.868,0,1,1,2,20.868,18.89,18.89,0,0,1,20.868,2ZM12.274,22.438l11.321,7.547a1.886,1.886,0,0,0,2.934-1.57V13.321a1.887,1.887,0,0,0-2.932-1.57L12.276,19.3a1.887,1.887,0,0,0,0,3.14Z"
            transform="translate(-2 -2)"
          />
        </svg>
      </button>
      <Swiper
        spaceBetween={50}
        slidesPerView={isMobile ? 1 : 4}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/piano-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Piano</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/guitar-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Guitar</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/vocal-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Vocalise</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/drum-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Battery</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/violin-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Violin</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center">
            <img src="img/guitar-icon.svg" alt="" />
            <p className="text-primary font-extrabold mt-4">Guitar</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <button onClick={() => my_swiper.slideNext()}>
        <svg
          id="swipper-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="37.737"
          height="37.737"
          viewBox="0 0 37.737 37.737"
          className="fill-primary hover:fill-secondaryDark transition-all duration-75 -scale-x-100"
        >
          <path
            id="Path_520"
            data-name="Path 520"
            d="M20.868,2A18.868,18.868,0,1,1,2,20.868,18.89,18.89,0,0,1,20.868,2ZM12.274,22.438l11.321,7.547a1.886,1.886,0,0,0,2.934-1.57V13.321a1.887,1.887,0,0,0-2.932-1.57L12.276,19.3a1.887,1.887,0,0,0,0,3.14Z"
            transform="translate(-2 -2)"
          />
        </svg>
      </button>
    </div>
  );
}

export default InstrumentsSwipper;
