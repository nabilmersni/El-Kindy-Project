import { Nav } from "../ui/Nav";
import Lottie from "react-lottie";

import guitarAnimation from "../../public/lottieAnimations/guitar.json";
import speakerAnimation from "../../public/lottieAnimations/speaker.json";

function SignUp() {
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center mt-[10rem]  relative">
        <div className="flex flex-col justify-center items-center w-[50%] p-[1rem] bg-white rounded-[1rem] shadow-sm">
          <h1 className="text-[1.3rem] text-primary font-bold">Sign up</h1>
          <p className="text-black font-light my-[.8rem] ">
            Adventure starts here
          </p>

          <form className="mt-[1rem] "></form>
        </div>

        <div>
          <div className="max-w-[13rem] absolute top-[3rem] right-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: speakerAnimation }}
            />
          </div>

          <div className="max-w-[12rem] absolute top-[50vh] left-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: guitarAnimation }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
