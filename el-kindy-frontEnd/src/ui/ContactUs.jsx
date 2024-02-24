import Lottie from "react-lottie";

import contactUsAnimation from "../../public/lottieAnimations/contactUs.json";
import Title1 from "./Title1";
import ContactUsForm from "./ContactUsForm";

function ContactUs() {
  return (
    <div className="container mx-auto w-auto mt-[8rem] px-8 ">
      <div className="flex flex-col justify-center items-center">
        <Title1>Contact us</Title1>
        <div className="flex justify-center items-center mt-5 mb-8">
          <p className="text-black font-normal text-center max-w-[35rem] ">
            Got a question? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[1rem] ">
          <div className="w-full lg:w-[80%] ">
            <ContactUsForm />
          </div>
          <div className="w-full mt-[-8rem] ">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: contactUsAnimation }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
