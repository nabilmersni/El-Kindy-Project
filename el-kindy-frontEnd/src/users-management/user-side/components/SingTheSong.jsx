import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import SingMusicLyricsPlayer from "./SingMusicLyricsPlayer";
import mineKaraokeService from "../../../features/karaoke/MineKaraokeService";
import { Spinner as Spinner2 } from "@material-tailwind/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Button } from "@material-tailwind/react";

function SingTheSong({ selectedSong, setOpenModal, setListenOrSing }) {
  const { user } = useSelector((state) => state.auth);

  const [audioUrl, setAudioUrl] = useState(undefined);
  const [blob, setBlob] = useState(undefined);
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingStart, setIsRecordingStart] = useState(false);
  const [isRecordingCancel, setIsRecordingCancel] = useState(false);
  const [isLoadingAudio, setIsisLoadingAudio] = useState(false);
  const [musicAudioUrl, setMusicAudioUrl] = useState(undefined);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingFinish, setIsProcessingFinish] = useState(false);

  const recordingControls = useAudioRecorder({
    noiseSuppression: false,
    echoCancellation: false,
    autoGainControl: false,
    sampleRate: 44100,
  });

  const addAudioElement = async (blob) => {
    setBlob(undefined);
    if (!isRecordingCancel) {
      const file = new File([blob], `${new Date().getTime()}.webm`, {
        type: "audio/webm",
      });
      setIsProcessing(true);
      try {
        const response = await mineKaraokeService.mixVocalMusic(
          file,
          musicAudioUrl
        );
        console.log(response);

        // convert to blob
        const base64String = response.data.mixedAudioBlob;
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.log(error);
        setIsProcessing(false);
        setIsProcessingFinish(false);
        // setOpenModal(false);
        // setListenOrSing("");
        setBlob(blob);
        toast.error(error?.response?.data?.message || "An error occurred");
      }
      setIsProcessing(false);
      setIsProcessingFinish(true);
    }
  };

  const downloadCover = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = `${selectedSong?.subtitle} - ${selectedSong?.title} (cover) by ${user.fullname}`;
      link.click();
    }
  };

  const audioRecordHandler = (e) => {
    const type = e.target.dataset.testid;

    if (type === "ar_mic" && !isRecordingStart) {
      console.log(isRecordingStart);
      console.log("play");
      setIsRecording(!isRecording);
      setIsRecordingStart(true);
      setIsRecordingCancel(false);
    } else if (type === "ar_mic") {
      console.log("save");
      setIsRecordingStart(false);
      setIsRecording(false);
    } else if (type === "ar_cancel") {
      console.log("exit");
      setIsRecordingStart(false);
      setIsRecording(false);
      setIsRecordingCancel(true);
      setListenOrSing("");
    } else if (type === "ar_pause") {
      setIsRecording(!isRecording);
      console.log("play/pause");
    }
    // console.log(e.target.dataset.testid);
  };

  const startRecording = () => {
    if (recordingControls) {
      recordingControls.startRecording();
      setIsRecording(true);
    }
  };

  const cancelRecording = () => {
    if (recordingControls) {
      recordingControls.stopRecording();
      setIsRecording(false);
      if (isRecordingCancel) {
        console.log("cancell");
        setAudioUrl(undefined);
      } else {
        console.log("savee");
      }
    }
  };

  const retryProcessing = async () => {
    if (!blob) return;
    await addAudioElement(blob);
  };

  return (
    <div className="flex flex-col h-full">
      {blob ? (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="mt-[2rem] ">
            <Button
              onClick={retryProcessing}
              variant="text"
              size="md"
              className={`bg-[#3b58cb] hover:bg-[#2644bd] text-white text-[0.9rem] font-bold font-nunito rounded-[.8rem] capitalize`}
            >
              <div className="flex justify-center items-center gap-[1rem] ">
                <img
                  className="w-[1.5rem] "
                  src="/img/refresh-arrow.png"
                  alt=""
                />
                <h1>Retry</h1>
              </div>
            </Button>
          </div>
        </div>
      ) : isProcessing ? (
        <div className="w-full h-full  flex flex-col justify-center items-center">
          <Spinner2 width={"3rem"} height={"3rem"} color="blue-gray" />
          <p className="text-[1.2rem] text-white text-center max-w-[80%] mt-[1rem] ">
            Your cover is currently being processed. Thank you for your
            patience!
          </p>
        </div>
      ) : isProcessingFinish ? (
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-white text-[3rem] text-center ">Preview</h1>
          <div className="w-full my-[1.5rem]">
            <AudioPlayer
              src={audioUrl}
              onPlay={(e) => console.log("onPlay")}
              className="rounded-[1.5rem] px-[2rem] py-[1rem] "
            />
          </div>
          <div className="mt-[2rem] ">
            <Button
              onClick={downloadCover}
              variant="text"
              size="md"
              className={`bg-[#3b58cb] hover:bg-[#2644bd] text-white text-[0.9rem] font-bold font-nunito rounded-[.8rem] capitalize`}
            >
              <div className="flex justify-center items-center gap-[1rem] ">
                <img className="w-[1.8rem] " src="/img/karaoke.png" alt="" />
                <h1>Download Your cover</h1>
              </div>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center h-full">
          <SingMusicLyricsPlayer
            selectedSong={selectedSong}
            isRecording={isRecording}
            cancelRecording={cancelRecording}
            isLoadingAudio={isLoadingAudio}
            setIsisLoadingAudio={setIsisLoadingAudio}
            setMusicAudioUrl={setMusicAudioUrl}
          />

          <div className="h-full flex justify-center items-center">
            {isLoadingAudio ? (
              ""
            ) : (
              <button onClick={audioRecordHandler}>
                <AudioRecorder
                  //   key={isRecordingCancel}
                  onRecordingComplete={addAudioElement}
                  onNotAllowedOrFound={(err) => console.table(err)}
                  // downloadOnSavePress={!isRecordingCancel}
                  downloadFileExtension="webm"
                  // mediaRecorderOptions={{
                  //   audioBitsPerSecond: 128000,
                  //   mimeType: "audio/webm",
                  // }}
                  showVisualizer={true}
                  recorderControls={recordingControls}
                />
              </button>
            )}
          </div>
        </div>
      )}

      {/* {audioUrl ? <audio src={audioUrl} controls></audio> : ""} */}
    </div>
  );
}

export default SingTheSong;
