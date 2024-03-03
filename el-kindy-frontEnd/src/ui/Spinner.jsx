import Lottie from "react-lottie";
import loaderAnimation from "../../public/lottieAnimations/loader2.json";

function Spinner() {
  return (
    <div className="loadingSpinnerContainer">
      {/* <div className="loadingSpinner"></div> */}
      <div className="w-[8rem] ">
        <Lottie
          isClickToPauseDisabled={true}
          options={{ animationData: loaderAnimation }}
        />
      </div>
    </div>
  );
}

export default Spinner;
