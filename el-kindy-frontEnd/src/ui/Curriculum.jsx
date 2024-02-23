import Lottie from "react-lottie";

import playCordesAnimation from "../../public/lottieAnimations/playCordes.json";
import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import Title1 from "./Title1";
import ButtonPrimary from "./ButtonPrimary";
import Title2 from "./Title2";
import InstrumentsSwipper from "./InstrumentsSwipper";

function Curriculum() {
  return (
    <div className="container mx-auto w-auto mt-[8rem] px-8">
      <div className="relative mb-[3rem] ">
        <Title1>Curriculums</Title1>
        <div className="flex justify-center items-center mt-5 mb-8">
          <p className="text-black font-normal text-center max-w-[42rem] ">
            We guide children in essential teachings to acquire the foundations
            and pursue a qualitative and demanding learning process. We welcome
            all age groups and nationalities. Whether you are a child or an
            adult, a student or integrated into the working world, you are
            welcome in our conservatory, which will tailor a customized schedule
            to fit into your daily life. The curriculum is structured over 7
            years, including an initiation class that forms a common core and
            concludes with the Arabic music diploma.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-3 mt-[4rem] "> */}
        <div className="flex flex-col justify-center items-center lg:flex-row mt-[4rem] ">
          <div className="flex flex-col justify-around items-center p-[1rem] h-full">
            <div className="w-[10rem] h-[10rem] rounded-full">
              <img
                src="img/children.jpg"
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-[1.3rem] text-primary font-extrabold my-[1.4rem]">
              The Initiation Class
            </h1>
            <p className="text-black">
              The Initiation Class is a year where students explore basic music
              concepts and experiment with instruments based on their
              preferences. Group music theory classes, led by specialists in
              music and artistic education, aim to ease integration into the art
              world, enhance understanding, foster creativity, and enrich
              knowledge.
            </p>
          </div>

          <div className="hidden lg:block w-[.8rem] mx-[1rem] self-end ">
            <img src="img/Line-divider.svg" alt="" />
          </div>

          <div className="flex flex-col justify-around items-center p-[1rem] h-full">
            <div className="w-[10rem] h-[10rem] rounded-full">
              <img
                src="img/Teenager.jpg"
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-[1.3rem] text-primary font-extrabold my-[1.4rem]">
              Over the next 5 years
            </h1>
            <p className="text-black">
              The Initiation Class is a year where students explore basic music
              concepts and experiment with instruments based on their
              preferences. Group music theory classes, led by specialists in
              music and artistic education, aim to ease integration into the art
              world, enhance understanding, foster creativity, and enrich
              knowledge.
            </p>
          </div>

          <div className="hidden lg:block w-[.8rem] mx-[1rem] self-end ">
            <img src="img/Line-divider.svg" alt="" />
          </div>

          <div className="flex flex-col justify-around items-center p-[1rem] h-full">
            <div className="w-[10rem] h-[10rem] rounded-full">
              <img
                src="img/Adulte.jpg"
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-[1.3rem] text-primary font-extrabold my-[1.4rem]">
              The 7th year is a diploma class
            </h1>
            <p className="text-black">
              The Initiation Class is a year where students explore basic music
              concepts and experiment with instruments based on their
              preferences. Group music theory classes, led by specialists in
              music and artistic education, aim to ease integration into the art
              world, enhance understanding, foster creativity, and enrich
              knowledge.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <ButtonPrimary size={"1.1rem"}>Join</ButtonPrimary>
        </div>

        <div className="hidden md:block">
          <div className="max-w-[11rem] absolute top-0 right-[-8rem]">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: playCordesAnimation }}
            />
          </div>

          <div className="max-w-[7rem] absolute top-[10rem] left-[-8rem] -scale-100">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: playCordesAnimation }}
            />
          </div>

          <img
            className="absolute top-0 left-0 w-[3rem] "
            src="img/oud.svg"
            alt=""
          />

          <img
            className="absolute top-[14rem] right-0 w-[2.5rem] "
            src="img/note1.svg"
            alt=""
          />
        </div>
      </div>

      <div className="relative">
        <Title2>The taught instruments</Title2>
        <div className="mt-[4rem] mb-[8rem]">
          <InstrumentsSwipper />
        </div>

        <div className="hidden lg:block max-w-[11rem] absolute -top-[2rem] left-[-6rem]">
          <Lottie options={{ animationData: guitarAnimation }} />
        </div>
      </div>
    </div>
  );
}

export default Curriculum;
