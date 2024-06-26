import Lottie from "react-lottie";

import headerAnimation from "../../public/lottieAnimations/headerAnimation.json";
import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../public/lottieAnimations/speaker.json";
import notesFlyAnimation from "../../public/lottieAnimations/notesFly.json";
import { Button } from "@material-tailwind/react";

function TestEmail() {
  return (
    <section className="min-h-screen bg-headerBG pt-[6rem] px-[1rem] lg:pl-28 pl-[1rem] pb-[5rem] lg:pb-0 relative">
      <div className="container mx-auto w-auto ">
        <div className="flex flex-col lg:flex-row items-center relative z-30">
          <div className="w-full flex justify-center">
            <div className="flex flex-col justify-start items-center lg:items-start">
              <h1 className="text-[3rem] md:text-[4rem] lg:text-[5rem] text-darkBlue font-extrabold">
                EL Kindy
              </h1>
              <p className="font-bold text-black max-w-[30rem] text-center lg:text-left">
                Welcome to EL Kindy family
              </p>
              <div className="flex justify-center lg:justify-start items-center">
                <Button
                  variant="text"
                  size="md"
                  className={`bg-lightBlue text-nav text-[1.3rem] font-extrabold font-nunito rounded-[.8rem] hover:bg-secondaryLight capitalize my-[2rem]`}
                >
                  Activate my account
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="max-w-[30rem] lg:h-[70vh]">
              <Lottie
                isClickToPauseDisabled={true}
                options={{ animationData: headerAnimation }}
              />
            </div>
          </div>
        </div>

        <div className="absolute h-fit left-5 top-0 bottom-0 my-auto hidden lg:flex flex-col justify-center items-center z-30">
          <span className="w-[.25rem] h-[6rem] bg-lightBlue rounded-full"></span>
          <div className="flex flex-col my-[1rem] gap-3">
            <a href="#">
              <img src="img/fb.svg" alt="" />
            </a>
            <a href="#">
              <img src="img/youtube.svg" alt="" />
            </a>
            <a href="#">
              <img src="img/insta.svg" alt="" />
            </a>
          </div>
          <span className="w-[.3rem] h-[6rem] bg-lightBlue rounded-full"></span>
        </div>

        <div className="hidden lg:block">
          <div className="w-[9rem] absolute left-3 top-[5rem] z-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: guitarAnimation }}
            />
          </div>

          <div className="w-[11rem] absolute left-2 bottom-1 z-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: speakerAnimation }}
            />
          </div>

          <div className="w-[8rem] absolute right-2 bottom-1 z-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: speakerAnimation }}
            />
          </div>

          <div className="w-[23rem] absolute right-0 left-0 mx-auto bottom-1 z-10">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: notesFlyAnimation }}
            />
          </div>

          <div className="max-w-screen absolute right-0  top-[8rem] z-20">
            <img className="w-[90%]" src="img/header-pattern.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestEmail;
