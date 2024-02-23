import Lottie from "react-lottie";

import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../public/lottieAnimations/speaker.json";
import ButtonPrimary from "./ButtonPrimary";
import Title1 from "./Title1";

function Event() {
  return (
    <div className="container mx-auto w-auto mt-[8rem] px-8">
      <div className="relative">
        <Title1>Event</Title1>
        <div className="flex justify-center items-center mt-5 mb-8">
          <p className="text-black font-normal text-center max-w-[40rem] ">
            <span className="text-primary font-extrabold">El Kindy Band</span>{" "}
            is a competition open to amateur ensembles comprising 2 to 10
            musicians capable of playing any style of music. Free program
            lasting 10 to 20 minutes, consisting of one to three pieces.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-[2rem] ">
          <div className="flex flex-col justify-between items-center p-[1rem] border-primary border-[.3rem] rounded-[2rem] h-full">
            <div className="rounded-[2rem]  ">
              <img
                src="img/slider1.jpg"
                alt=""
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </div>
            <h1 className="text-[1.5rem] text-primary font-extrabold my-[1.4rem]">
              Stage - Mars
            </h1>
            <div className="flex justify-evenly items-center w-full">
              <div className="flex justify-between items-center">
                <img
                  src="img/location-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>Tunisia, Tunis</p>
              </div>

              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>

              <div className="flex justify-between items-center">
                <img
                  src="img/calendar-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>1 Fev - 5 Fev</p>
              </div>
            </div>

            <div className="flex justify-evenly items-center w-full -mb-[2rem]">
              <ButtonPrimary size={"1rem"}>more info</ButtonPrimary>
              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
              <img src="img/pepole-icon.svg" alt="" className="max-w-[4rem] " />
              <ButtonPrimary size={"1rem"}>Join</ButtonPrimary>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center p-[1rem] border-primary border-[.3rem] rounded-[2rem] h-full">
            <div className="rounded-[2rem]  ">
              <img
                src="img/slider1.jpg"
                alt=""
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </div>
            <h1 className="text-[1.5rem] text-primary font-extrabold my-[1.4rem]">
              Stage - Mars
            </h1>
            <div className="flex justify-evenly items-center w-full">
              <div className="flex justify-between items-center">
                <img
                  src="img/location-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>Tunisia, Tunis</p>
              </div>

              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>

              <div className="flex justify-between items-center">
                <img
                  src="img/calendar-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>1 Fev - 5 Fev</p>
              </div>
            </div>

            <div className="flex justify-evenly items-center w-full -mb-[2rem]">
              <ButtonPrimary size={"1rem"}>more info</ButtonPrimary>
              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
              <img src="img/pepole-icon.svg" alt="" className="max-w-[4rem]" />
              <ButtonPrimary size={"1rem"}>Join</ButtonPrimary>
            </div>
          </div>

          <div className="flex flex-col justify-between items-center p-[1rem] border-primary border-[.3rem] rounded-[2rem] h-full">
            <div className="rounded-[2rem]  ">
              <img
                src="img/slider1.jpg"
                alt=""
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </div>
            <h1 className="text-[1.5rem] text-primary font-extrabold my-[1.4rem]">
              Stage - Mars
            </h1>
            <div className="flex justify-evenly items-center w-full">
              <div className="flex justify-between items-center">
                <img
                  src="img/location-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>Tunisia, Tunis</p>
              </div>

              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>

              <div className="flex justify-between items-center">
                <img
                  src="img/calendar-icon.svg"
                  alt=""
                  className="w-[1.3rem] mr-[.5rem] "
                />
                <p>1 Fev - 5 Fev</p>
              </div>
            </div>

            <div className="flex justify-evenly items-center w-full -mb-[2rem]">
              <ButtonPrimary size={"1rem"}>more info</ButtonPrimary>
              <span className="w-[.5rem] h-[.5rem] bg-primary rounded-full"></span>
              <img src="img/pepole-icon.svg" alt="" className="max-w-[4rem]" />
              <ButtonPrimary size={"1rem"}>Join</ButtonPrimary>
            </div>
          </div>
        </div>

        <div className=" flex justify-center">
          <ButtonPrimary size={"1rem"}>
            <p className="text-[1.2rem] ">View all events</p>
          </ButtonPrimary>
        </div>

        <div className="hidden lg:block">
          <div className="max-w-[11rem] absolute top-[-3rem] left-0">
            <Lottie options={{ animationData: guitarAnimation }} />
          </div>

          <div className="max-w-[11rem] absolute top-[3rem] right-0">
            <Lottie options={{ animationData: speakerAnimation }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
