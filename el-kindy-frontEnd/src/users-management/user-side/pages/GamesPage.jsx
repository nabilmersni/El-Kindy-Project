import { useState } from "react";
import Lottie from "react-lottie";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import gamesAnimation from "../../../../public/lottieAnimations/games.json";
import UserSideLayout from "../../../dashboard-layout/UserSideLayout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   bgcolor: "#120521",
  bgcolor: "#111111",
  width: "100%",
  height: "100vh",
  boxShadow: 10,
};

const GamesPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeGamesModal = () => {
    setOpenModal(false);
  };
  return (
    <UserSideLayout>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[2rem] bg-[#d8e8ff] py-[1rem] px-[3rem] w-full ">
          <div className="flex flex-col">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.7rem] mb-[.35rem] text-primary font-bold">
              Welcome to EL Kindy games
            </h1>
            <p className="text-[.8rem] md:text-[1.1rem] lg:text-[1.2rem] ">
              Explore, Engage, and Enjoy the Fun!
            </p>
          </div>
          <div className="w-[7rem] lg:w-[10rem] mt-4 md:mt-0  ">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: gamesAnimation }}
              speed={0.2}
            />
          </div>
        </div>

        <div className="mt-[3rem] w-full h-full">
          {/* <Chat small={true} /> */}
          <div className="flex flex-col justify-start items-start rounded-[2rem] shadow-custom4 px-[2rem] py-[1rem] border-[.2rem] border-[#006cbe20]">
            <h1 className="text-[2rem] font-semibold mb-[4rem] ">Game List</h1>

            <div className="flex flex-wrap w-full gap-[2rem] ">
              {/* <div className="flex flex-col justify-center items-center p-[1rem] rounded-[1rem] border-[.2rem] border-[#b6dfff] hover:bg-[#d8e8ff] transition-all duration-100">
                <div className="w-[15rem] h-[12rem] rounded-[1rem]">
                  <img
                    className="w-full h-full object-cover rounded-[1rem] "
                    src="/img/incrediboxCover.jpg"
                    alt=""
                  />
                </div>
                <h1 className="text-[1.4rem] font-semibold mb-[4rem] ">
                  incredibox
                </h1>
              </div> */}

              <div
                onClick={() => setOpenModal(true)}
                className="flex flex-col w-[20rem] justify-center items-start p-[.5rem] rounded-[2rem] border-[.2rem] shadow-custom2 border-[#d4ecff] bg-[#eaf3ff] hover:bg-[#fffff8]  transition-all duration-100 cursor-pointer"
              >
                <div className="w-full h-[12rem] rounded-[2rem]">
                  <img
                    className="w-full h-full object-cover rounded-[2rem] "
                    src="/img/incrediboxCover.jpg"
                    alt=""
                  />
                </div>
                <div className="p-[1rem] pt-0">
                  <h1 className="text-[1.4rem] font-semibold text-[#35353C] mt-[1.2rem] mb-[.8rem] ">
                    Incredibox
                  </h1>
                  <p className="text-[#4a4a4a] fognt-light ">
                    Incredibox is a music app that lets you create your own
                    music with the help of a merry crew of beatboxers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Modal
            open={openModal}
            onClose={closeGamesModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-[90vw] md:w-[80vw] lg:w-[75vw] mx-auto"
          >
            <Box
              sx={{
                ...style,
                borderRadius: "2rem",
                outline: "none",
                overflowY: "auto",
                // padding: "4rem",
              }}
            >
              <iframe
                title="gameFrame"
                className="w-full h-full rounded-[2rem] scale-[.9] "
                src="https://incredibox-elkendy.netlify.app/"
              ></iframe>
            </Box>
          </Modal>
        </div>
      </div>
    </UserSideLayout>
  );
};

export default GamesPage;
