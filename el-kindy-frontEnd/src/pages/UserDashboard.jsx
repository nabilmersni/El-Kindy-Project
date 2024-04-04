import { useSelector } from "react-redux";
import Lottie from "react-lottie";

import UserSideLayout from "../dashboard-layout/UserSideLayout";
import headerAnimation from "../../public/lottieAnimations/headerAnimation.json";
import balanceAnimation from "../../public/lottieAnimations/balance.json";
import eventAnimation from "../../public/lottieAnimations/event.json";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <UserSideLayout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[2rem] bg-[#d8e8ff] py-[1rem] px-[3rem] w-full ">
          <div className="flex flex-col">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.7rem] mb-[.35rem] text-primary font-bold">
              Welcome to EL Kindy
            </h1>
            <p className="text-[.8rem] md:text-[1.1rem] lg:text-[1.2rem] ">
              Unleash Your Artistic Talents Here
            </p>
          </div>
          <div className="w-[7rem] lg:w-[10rem] mt-4 md:mt-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: headerAnimation }}
            />
          </div>
        </div>

        <div className="mt-[3rem] w-full">
          <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-[2rem] h-auto">
            {/* left side */}
            <div className="flex-[2.5] flex-col gap-[1rem] w-full h-[50rem] bg-white rounded-[2rem] border-[.2rem] border-[#006cbe27] px-[1.5rem] py-[2rem]">
              <div className="flex flex-col lg:flex-row justify-between gap-[3rem] ">
                {/*  */}
                <div className="flex-1 rounded-[1rem]  bg-[#e4efff] p-[1rem] ">
                  <div className="flex flex-col">
                    <p className="text-[1.4rem] font-semibold ">
                      {/* {user.role === "user"
                        ? "The amount you have to pay this month"
                        : "Your salary this month"} */}
                      This month's payment
                    </p>
                    <div className="flex justify-center items-center mt-[1rem] gap-[2rem] ">
                      <div className="w-[5rem] lg:w-[7rem]">
                        <Lottie
                          isClickToPauseDisabled={true}
                          options={{ animationData: balanceAnimation }}
                        />
                      </div>

                      <p className="text-primary text-[1.7rem] font-semibold ">
                        1500 DNT
                      </p>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="flex-1 rounded-[1rem]  bg-[#e4efff] p-[1rem] ">
                  <div className="flex flex-col">
                    <p className="text-[1.4rem] font-semibold ">
                      Next event coming soon
                    </p>
                    <div className="flex justify-center items-center mt-[1rem] gap-[2rem] ">
                      <div className="w-[5rem] lg:w-[5rem]">
                        <Lottie
                          isClickToPauseDisabled={true}
                          options={{ animationData: eventAnimation }}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-primary text-[1.6rem] font-semibold ">
                          Guitar Workshop
                        </p>
                        <p className="text-[1rem] ">12/04</p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            {/* right side */}
            <div
              // style={{ height: "calc(100vh - 9rem)" }}
              className="lg:sticky lg:top-[8rem] w-full flex-[1] flex flex-col items-center lg:h-[calc(100vh - 8rem)] bg-white rounded-[2rem] border-[.2rem] border-[#006cbe27] px-[1.5rem] py-[1rem] "
            >
              <div className="flex items-center gap-[1.5rem] rounded-[2rem] bg-[#006cbe0d] p-[1rem] w-full">
                <div className="w-[5.2rem] h-[5.2rem] rounded-full ">
                  <img
                    className="w-full h-full rounded-full border-[.14rem] border-[#8d89fe] p-[.15rem] "
                    src={user.photo_url}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <p
                    className={`text-[1.2rem] gap-[.4rem] font-bold flex items-center  `}
                  >
                    {user.fullname}
                    {/* <span className={`text-[.9rem] font-normal`}>
                      {`(${user.role})`}
                    </span> */}
                  </p>
                  <div className="flex items-center gap-[.7rem] ">
                    <p className={`text-[.9rem]`}>Verified account</p>
                    <span
                      className={`w-[.5rem] h-[.5rem] bg-green-300 rounded-full inline-block`}
                    ></span>
                  </div>
                </div>
              </div>
              <div className="dividerr self-center w-[40%] h-[.2rem] bg-[#006cbe1e] mt-[1rem] rounded-full "></div>
              <div className="flex flex-col w-full mt-[2rem] ">
                <div className="flex justify-between items-center">
                  <p className=" text-[1.2rem]  ">Your Cards</p>
                  <button className="p-[.8rem] rounded-full bg-[#006cbe0c] hover:bg-[#DEEDF7] transition-all duration-100 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      className="w-[.9rem] fill-primary"
                    >
                      <g>
                        <path
                          d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                          opacity="1"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="flex justify-between items-center bg-[#006cbe0c] rounded-[1rem] mt-[1.5rem] p-[1rem] ">
                  <img className="w-[3rem] " src="/img/visa-icon.svg" alt="" />
                  <p className="text-[1.05rem] font-semibold text-primary ">
                    ****5765
                  </p>
                  <div className="w-[3rem] flex justify-end ">
                    <img
                      className="w-[1rem] "
                      src="/img/arrow-icon.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="dividerr self-center w-[10%] h-[.2rem] bg-[#006cbe1e] mt-[1rem] rounded-full "></div>
              {/* <div className=" flex flex-col items-center mt-[1rem] ">
                hello
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </UserSideLayout>
  );
};

export default UserDashboard;
