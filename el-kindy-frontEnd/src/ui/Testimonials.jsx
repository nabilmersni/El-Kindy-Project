import Lottie from "react-lottie";

import testimonialsQuoteAnimation from "../../public/lottieAnimations/testimonialsQuote.json";
import TestimonialsSwipper from "./TestimonialsSwipper";
import Title2 from "./Title2";

function Testimonials() {
  return (
    <div className="container mx-auto w-auto mt-[8rem] px-8 ">
      <div className="relative">
        <div className="relative flex justify-center items-center">
          <img
            src="img/testimonials-icon.svg"
            alt=""
            className="w-[1rem] mb-[2rem] "
          />
          <h1 className="font-extrabold text-primary text-center text-[3.5rem] mx-4">
            Testimonials
          </h1>
          <img
            src="img/testimonials-icon.svg"
            alt=""
            className="-scale-x-100 w-[1rem] mt-[2rem]"
          />
        </div>

        <div className="mt-[4rem] ">
          <TestimonialsSwipper />
        </div>

        <div>
          <div className="w-[7rem] absolute top-[2rem] left-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: testimonialsQuoteAnimation }}
            />
          </div>

          <div className="w-[4rem] absolute bottom-[2rem] right-[-3rem] ">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: testimonialsQuoteAnimation }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row-reverse justify-between items-center mt-[6rem]">
        <div className="flex flex-col justify-center items-center gap-4">
          <Title2>الجزء لأول : شنوه رايك في الكندي ؟</Title2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/2bR0Bn4rPQA?si=8lcq67lQ_gFpgp5B"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mt-[3rem] lg:mt-0 ">
          <Title2>الجزء الثاني : شنوه رايك في الكندي ؟</Title2>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/PBQLsaRiN3o?si=MtsPdnd_bffJNMqL"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
