import Lottie from "react-lottie";

import chatAnimation from "../../../../public/lottieAnimations/chat.json";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";
import Chat from "../../components/chat/Chat";

const ChatPage = () => {
  return (
    <UserSideLayout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[2rem] bg-[#d8e8ff] py-[1rem] px-[3rem] w-full ">
          <div className="flex flex-col">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.7rem] mb-[.35rem] text-primary font-bold">
              Welcome to EL Kindy Chat
            </h1>
            <p className="text-[.8rem] md:text-[1.1rem] lg:text-[1.2rem] ">
              Let's Connect and Communicate!
            </p>
          </div>
          <div className="w-[7rem] lg:w-[10rem] mt-4 md:mt-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: chatAnimation }}
            />
          </div>
        </div>

        <div className="mt-[3rem] h-[88vh] mb-[-4rem] w-full">
          <Chat small={true} />
        </div>
      </div>
    </UserSideLayout>
  );
};

export default ChatPage;
