import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";

function TestimonialsSwipper() {
  const [testimonialsSwipper, set_testimonialsSwipper] = useState({});

  return (
    <div className="flex justify-center items-center gap-8">
      <button onClick={() => testimonialsSwipper.slidePrev()}>
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
        // spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        onInit={(ev) => {
          set_testimonialsSwipper(ev);
        }}
      >
        <SwiperSlide>
          <div className="grid grid-cols-1 relative w-auto lg:w-[45rem] mx-auto">
            <img
              className="row-start-1 col-start-1 w-full"
              src="img/tape-body.svg"
              alt=""
            />
            <div className="row-start-1 col-start-1 w-[90%] h-[75%] mt-[5%] mx-auto bg-bodyBg rounded-[2rem] p-[1rem]">
              <div className="flex flex-col justify-evenly items-center h-full gap-4">
                <div className="flex justify-between items-center bg-lightBlue p-[1rem] rounded-full gap-4">
                  <img
                    className="w-[1.5rem] md:w-[3rem] lg:w-auto "
                    src="img/testimonial-icon.svg"
                    alt=""
                  />
                  <div className="w-[5rem] h-[2rem] md:w-[8rem] md:h-[4rem] lg:w-[15rem] lg:h-[7rem] rounded-full">
                    <img
                      src="img/testimonials-1.jpg"
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <img
                    className="w-[1.5rem] md:w-[3rem] lg:w-auto "
                    src="img/testimonial-icon.svg"
                    alt=""
                  />
                </div>

                <p className="text-[.7rem] md:text-[1rem] lg:text-[1.1rem] max-w-[90%] text-center text-black">
                  "Conservatoire El Kindy démontre un sérieux irréprochable, et
                  impose un discipline d'apprentissage satisfaisante"
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="grid grid-cols-1 relative w-auto lg:w-[45rem] mx-auto">
            <img
              className="row-start-1 col-start-1 w-full"
              src="img/tape-body.svg"
              alt=""
            />
            <div className="row-start-1 col-start-1 w-[90%] h-[75%] mt-[5%] mx-auto bg-bodyBg rounded-[2rem] p-[1rem]">
              <div className="flex flex-col justify-evenly items-center h-full gap-4">
                <div className="flex justify-between items-center bg-lightBlue p-[1rem] rounded-full gap-4">
                  <img
                    className="w-[1.5rem] md:w-[3rem] lg:w-auto "
                    src="img/testimonial-icon.svg"
                    alt=""
                  />
                  <div className="w-[5rem] h-[2rem] md:w-[8rem] md:h-[4rem] lg:w-[15rem] lg:h-[7rem] rounded-full">
                    <img
                      src="img/testimonials-1.jpg"
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <img
                    className="w-[1.5rem] md:w-[3rem] lg:w-auto "
                    src="img/testimonial-icon.svg"
                    alt=""
                  />
                </div>

                <p className="text-[.7rem] md:text-[1rem] lg:text-[1.1rem] max-w-[90%] text-center text-black">
                  "Conservatoire El Kindy démontre un sérieux irréprochable, et
                  impose un discipline d'apprentissage satisfaisante"
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button onClick={() => testimonialsSwipper.slideNext()}>
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

export default TestimonialsSwipper;
