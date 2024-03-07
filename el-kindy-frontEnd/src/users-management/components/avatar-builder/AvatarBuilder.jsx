import React, { useState, useCallback } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import ReactNiceAvatar, { genConfig } from "react-nice-avatar";
import AvatarEditor from "./AvatarEditor/AvatarEditor";
import AvatarList from "./AvatarList/AvatarList";
import "./AvatarBuilder.css";

const AvatarBuilder = ({ setAvatarBlop, handleClose }) => {
  const [config, setConfig] = useState(
    genConfig({
      isGradient: Boolean(Math.round(Math.random())),
    })
  );
  const [shape, setShape] = useState("circle");
  const avatarId = "myAvatar";

  const selectConfig = useCallback((newConfig) => {
    setConfig(newConfig);
  }, []);

  const updateConfig = useCallback((key, value) => {
    setConfig((prevConfig) => ({ ...prevConfig, [key]: value }));
  }, []);

  const updateShape = useCallback((newShape) => {
    setShape(newShape);
  }, []);

  const download = async () => {
    const scale = 2;
    const node = document.getElementById(avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${
            node.offsetWidth / 2 / scale
          }px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0,
        },
        width: node.offsetWidth * scale,
      });

      const file = new File([blob], "avatar.png", { type: blob.type });

      setAvatarBlop(file);
      handleClose();
      // saveAs(blob, "avatar.png");
    }
  };

  return (
    <div id="test" className="flex flex-col justify-center items-center h-full">
      <main className="flex-1 flex flex-col items-center justify-center ">
        <div id={avatarId} className="mb-16">
          <ReactNiceAvatar
            // className="w-64 h-64 highres:w-80 highres:h-80"
            className="w-[19rem] h-[19rem] highres:w-80 highres:h-80"
            hairColorRandom
            shape={shape}
            {...config}
          />
        </div>
        <AvatarEditor
          config={config}
          shape={shape}
          updateConfig={updateConfig}
          updateShape={updateShape}
          download={download}
        />
        {/* Avatar list */}
        <div className="mt-[5rem] ">
          <AvatarList selectConfig={selectConfig} />
        </div>
      </main>

      <div className="flex justify-center items-center mt-[6rem] mb-[2rem] gap-[2rem] ">
        <button
          onClick={download}
          type="button"
          className="w-fit text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:bg-blue-gray-500  font-bold rounded-lg text-[2rem] px-5 py-2.5 me-2 mb-2 transition-all duration-75"
        >
          Apply
        </button>
        <div className="divider bg-[#ffffff26] w-[0.3rem] h-[4rem] rounded mx-2" />
        <button
          onClick={handleClose}
          type="button"
          className="w-fit text-white bg-[#ff734c] hover:bg-[#fe4a19] focus:outline-none focus:bg-[#ff5d30]  font-bold rounded-lg text-[2rem] px-5 py-2.5 me-2 mb-2 transition-all duration-75"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default AvatarBuilder;
