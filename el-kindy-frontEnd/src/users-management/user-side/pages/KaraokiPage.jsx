import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import UserSideLayout from "../../../dashboard-layout/UserSideLayout";
import karaokiAnimation from "../../../../public/lottieAnimations/karaoki.json";
import TopArtistSwipper from "../ui/TopArtistSwipper";
import Spinner from "../../../ui/Spinner";
import karaokeService from "../../../features/karaoke/KaraokeService";
import TopSongItem from "../ui/TopSongItem";
import SearchSong from "../ui/SearchSong";
import MusicLyricsPlayer from "../components/MusicLyricsPlayer";
import SingTheSong from "../components/SingTheSong";
import { Button } from "@material-tailwind/react";
import ButtonPrimary from "../../../ui/ButtonPrimary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#070F2B",
  boxShadow: 10,
};

const KaraokiPage = () => {
  const [isLoadingGetSongs, setIsLoadingGetSongs] = useState(false);
  const [topSongs, setTopSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [listenOrSing, setListenOrSing] = useState("");

  useEffect(() => {
    const getTopArtists = async () => {
      setIsLoadingGetSongs(true);
      try {
        const topArtists = await karaokeService.getTopSongs();
        setTopSongs(topArtists);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingGetSongs(false);
    };

    getTopArtists();
  }, []);

  const closeAddChatModal = () => {
    setOpenModal(false);
    setListenOrSing("");
  };

  //

  //

  return (
    <UserSideLayout>
      {isLoadingGetSongs ? <Spinner /> : ""}
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row justify-between items-center rounded-[2rem] bg-[#d8e8ff] py-[1rem] px-[3rem] ">
          <div className="flex flex-col">
            <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[2.7rem] mb-[.35rem] text-primary font-bold">
              Welcome to EL Kindy karaoke
            </h1>
            <p className="text-[.8rem] md:text-[1.1rem] lg:text-[1.2rem] ">
              Unleash Your Artistic Talents Here
            </p>
          </div>
          <div className="w-[7rem] lg:w-[10rem] mt-4 md:mt-0">
            <Lottie
              isClickToPauseDisabled={true}
              options={{ animationData: karaokiAnimation }}
            />
          </div>
        </div>

        {/* <div className="flex flex-col mt-[3rem] ">
          <h1 className="text-[1.6rem] lg:text-[2rem] font-bold mb-[2rem] text-blackk ">
            Top Artist
          </h1>
          <TopArtistSwipper topSongs={topSongs} />
        </div> */}

        <div className="flex justify-between items-stretch w-full my-[3rem] gap-[3rem] ">
          <div className="flex-[2] rounded-[1.5rem] border-[.2rem] border-[#006cbe1e] p-[2rem] shadow-custom2">
            <SearchSong
              setSelectedSong={setSelectedSong}
              setOpenModal={setOpenModal}
            />
          </div>
          {/*  */}
          {/* <div className="hidden lg:flex flex-col items-center flex-[1] rounded-[1.5rem] bg-blue-50 p-[2rem] px-[1rem] shadow-custom2 border-[.2rem] border-[#006cbe0e]">
            <h1 className="text-[1.6rem] font-bold mb-[1.5rem] text-blackk ">
              Top Songs
            </h1>
            <div className="dividerr self-center w-[40%] h-[.2rem] bg-[#006cbe1e]  mb-[2.5rem] rounded-full "></div>
            <div className="h-[80vh] pr-4 overflow-y-auto">
              {topSongs.slice(0, 5).map((song) => (
                <button
                  onClick={() => {
                    setOpenModal(true);
                    setSelectedSong(song);
                  }}
                  key={song.key}
                  className="text-left"
                >
                  <TopSongItem song={song} />
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <Modal
          open={openModal}
          onClose={closeAddChatModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="w-[90vw] h-[90vh] lg:w-[50vw] lg:h-[92vh] rounded-[2rem] p-[2rem]"
            sx={{
              ...style,
            }}
          >
            <div className="relative h-full">
              {/* <button className="absolute top-[1rem] left-[1rem] ">
                <img className="w-[2rem] " src="/img/back-icon.svg" alt="" />
              </button> */}
              <div className="flex gap-[2rem] items-center ">
                {listenOrSing === "listen" ? (
                  <button
                    onClick={() => setListenOrSing("")}
                    className="rounded-full bg-[#5774e8] hover:bg-[#3B58CB] p-[.7rem] transition-all duration-100"
                  >
                    <img
                      className="w-[1.4rem] "
                      src="/img/back-icon.svg"
                      alt=""
                    />
                  </button>
                ) : (
                  ""
                )}

                <h1 className="text-[1.4rem] text-white ">
                  {selectedSong?.title} - {selectedSong?.subtitle}
                </h1>
              </div>
              {!listenOrSing ? (
                <div className="h-full text-white">
                  <div className="flex flex-col justify-center items-center gap-[2rem] h-full">
                    <Button
                      onClick={() => setListenOrSing("listen")}
                      variant="text"
                      size="md"
                      className={`bg-[#3b58cb] hover:bg-[#2644bd] text-white text-[0.9rem] font-bold font-nunito rounded-[.8rem] capitalize`}
                    >
                      <div className="flex justify-center items-center gap-[1rem] ">
                        <img
                          className="w-[2rem] "
                          src="/img/music.png"
                          alt=""
                        />
                        <h1>Listening to Your song</h1>
                      </div>
                    </Button>

                    <Button
                      onClick={() => setListenOrSing("sing")}
                      variant="text"
                      size="md"
                      className={`bg-[#3b58cb] hover:bg-[#2644bd] text-white text-[0.9rem] font-bold font-nunito rounded-[.8rem] capitalize`}
                    >
                      <div className="flex justify-center items-center gap-[1rem] ">
                        <img
                          className="w-[1.8rem] "
                          src="/img/karaoke.png"
                          alt=""
                        />
                        <h1>Sing your song</h1>
                      </div>
                    </Button>
                  </div>
                </div>
              ) : listenOrSing === "listen" ? (
                <MusicLyricsPlayer selectedSong={selectedSong} />
              ) : (
                <SingTheSong
                  selectedSong={selectedSong}
                  setOpenModal={setOpenModal}
                  setListenOrSing={setListenOrSing}
                />
              )}
            </div>

            {/* <MusicLyricsPlayer selectedSong={selectedSong} /> */}
            {/* <SingTheSong selectedSong={selectedSong} /> */}
          </Box>
        </Modal>
      </div>
    </UserSideLayout>
  );
};

export default KaraokiPage;
