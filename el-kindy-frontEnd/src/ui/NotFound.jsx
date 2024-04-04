import Lottie from "react-lottie";
import notFoundAnimation from "../../public/lottieAnimations/notFound.json";

function NotFound() {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <div className="w-[40%] ">
        <Lottie
          isClickToPauseDisabled={true}
          options={{ animationData: notFoundAnimation }}
        />
      </div>
    </div>
  );
}

export default NotFound;
