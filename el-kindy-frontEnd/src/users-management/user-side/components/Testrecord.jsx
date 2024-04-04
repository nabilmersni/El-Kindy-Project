import React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

const TestRecord = () => {
  const recordingControls = useAudioRecorder({
    noiseSuppression: false,
    echoCancellation: false,
    autoGainControl: false,
    sampleRate: 44100,
  });

  return (
    <div className="absolute top-9 left-28">
      <AudioRecorder
        //   key={isRecordingCancel}
        onRecordingComplete={() => {}}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
        // mediaRecorderOptions={{
        //   audioBitsPerSecond: 128000,
        //   mimeType: "audio/webm",
        // }}
        showVisualizer={true}
        recorderControls={recordingControls}
      />
    </div>
  );
};

export default TestRecord;
