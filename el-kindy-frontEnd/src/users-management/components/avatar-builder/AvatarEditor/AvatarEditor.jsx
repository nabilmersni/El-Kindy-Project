import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { defaultOptions } from "./AvatarEditorStuff/utils";
import Face from "./AvatarEditorStuff/face/index";
import Hair from "./AvatarEditorStuff/hair/index";
import Hat from "./AvatarEditorStuff/hat/index";
import Eyes from "./AvatarEditorStuff/eyes/index";
import Glasses from "./AvatarEditorStuff/glasses/index";
import Ear from "./AvatarEditorStuff/ear/index";
import Nose from "./AvatarEditorStuff/nose/index";
import Mouth from "./AvatarEditorStuff/mouth/index";
import Shirt from "./AvatarEditorStuff/shirt/index";
import SectionWrapper from "./SectionWrapper/SectionWrapper";
import "./AvatarEditor.css";

const AvatarEditor = ({
  config,
  shape,
  updateConfig,
  updateShape,
  download,
  small,
}) => {
  // const [isCodeShow, setIsCodeShow] = useState(false);
  const myDefaultOptions = genDefaultOptions(defaultOptions);
  // const shapes = ["circle", "rounded", "square"];

  function genDefaultOptions(opts) {
    const hairSet = new Set(opts.hairStyleMan.concat(opts.hairStyleWoman));
    return {
      ...opts,
      hairStyle: Array.from(hairSet),
    };
  }

  function switchConfig(type, currentOpt) {
    const opts = myDefaultOptions[type];
    const currentIdx = opts.findIndex((item) => item === currentOpt);
    const newIdx = (currentIdx + 1) % opts.length;
    updateConfig(type, opts[newIdx]);
  }

  // function toggleCodeShow() {
  //   setIsCodeShow(!isCodeShow);
  // }

  // function genCodeString(config) {
  //   const ignoreAttr = ["id"];
  //   const myConfig = Object.keys(config)
  //     .filter((key) => !ignoreAttr.includes(key))
  //     .reduce((acc, key) => ({ ...acc, [key]: config[key] }), {});
  //   return (
  //     "const config = " +
  //     JSON.stringify(myConfig, null, 2) +
  //     "\n" +
  //     "const myConfig = genConfig(config)\n" +
  //     "<NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />"
  //   );
  // }

  return (
    <div
      className={`AvatarEditor rounded-full flex items-center ${
        small
          ? "px-2 py-2 flex-wrap gap-2 lg:gap-0 rounded-[0.4rem] lg:rounded-full mx-4 lg:mx-0"
          : "px-6 py-4"
      }`}
    >
      {/* Face */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        small={small}
        tip="Face"
        switchConfig={switchConfig.bind(this, "faceColor", config.faceColor)}
      >
        <Face color={config.faceColor} />
      </SectionWrapper>
      {/* Hair style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        small={small}
        tip="Hair"
        switchConfig={switchConfig.bind(this, "hairStyle", config.hairStyle)}
      >
        <Hair style={config.hairStyle} color="#fff" colorRandom />
      </SectionWrapper>
      {/* Hat style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        small={small}
        tip="Hat"
        switchConfig={switchConfig.bind(this, "hatStyle", config.hatStyle)}
      >
        <Hat style={config.hatStyle} color="#fff" />
      </SectionWrapper>
      {/* Eyes style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        small={small}
        tip="Eyes"
        switchConfig={switchConfig.bind(this, "eyeStyle", config.eyeStyle)}
      >
        <Eyes style={config.eyeStyle} color="#fff" />
      </SectionWrapper>
      {/* Glasses style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        small={small}
        tip="Glasses"
        switchConfig={switchConfig.bind(
          this,
          "glassesStyle",
          config.glassesStyle
        )}
      >
        <Glasses style={config.glassesStyle} color="#fff" />
      </SectionWrapper>
      {/* Ear style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        // className="w-16 h-16 rounded-full p-4 mx-2"
        className={`${
          small
            ? "w-10 h-10 rounded-full p-[0.6rem] mx-2"
            : "w-16 h-16 rounded-full p-4 mx-2"
        }`}
        tip="Ear"
        switchConfig={switchConfig.bind(this, "earSize", config.earSize)}
        small={small}
      >
        <Ear size={config.earSize} color="#fff" />
      </SectionWrapper>
      {/* Nose style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        tip="Nose"
        switchConfig={switchConfig.bind(this, "noseStyle", config.noseStyle)}
        small={small}
      >
        <Nose style={config.noseStyle} color="#fff" />
      </SectionWrapper>
      {/* Mouth style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        tip="Mouth"
        switchConfig={switchConfig.bind(this, "mouthStyle", config.mouthStyle)}
        small={small}
      >
        <Mouth style={config.mouthStyle} color="#fff" />
      </SectionWrapper>
      {/* Shirt style */}
      <SectionWrapper
        // className="w-8 h-8 rounded-full p-2 mx-2"
        className={`${small ? "w-10 h-10" : "w-16 h-16"} rounded-full p-2 mx-2`}
        tip="Shirt"
        switchConfig={switchConfig.bind(this, "shirtStyle", config.shirtStyle)}
        small={small}
      >
        <Shirt style={config.shirtStyle} color="#fff" />
      </SectionWrapper>

      {/* Shape style */}
      {/* <SectionWrapper
          className="w-8 h-8 rounded-full p-2 mx-2"
          tip="Shape"
          switchConfig={this.switchShape.bind(this, shape)}>
          <div
            className={classnames("w-3 h-3 bg-white", {
              "rounded-full": shape === 'circle',
              "rounded": shape === 'rounded'
            })} />
        </SectionWrapper> */}

      {/* <div className="divider w-0.5 h-5 rounded mx-2" /> */}
      {/* <div className="mx-2 relative flex justify-center">
        <i
          className={classnames(
            "iconfont icon-code text-xl  cursor-pointer transition duration-300 hover:text-green-100",
            {
              banTip: isCodeShow,
            }
          )}
          data-tip="Config"
          onClick={toggleCodeShow.bind(this)}
        />
        <div
          className={classnames(
            "rounded-lg bg-white p-5 absolute bottom-full codeBlock mb-4",
            {
              active: isCodeShow,
            }
          )}
        >
          <pre className="text-xs highres:text-sm">{genCodeString(config)}</pre>
        </div>
      </div> */}

      {/* <div className="divider w-0.5 h-5 rounded mx-2" /> */}
      {/* <i
        className="iconfont icon-download text-[2rem] mx-2 cursor-pointer transition duration-300 hover:text-green-100"
        data-tip="Download"
        onClick={download}
      /> */}
    </div>
  );
};

AvatarEditor.propTypes = {
  config: PropTypes.object.isRequired,
  shape: PropTypes.string.isRequired,
  updateConfig: PropTypes.func.isRequired,
  updateShape: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
};

export default AvatarEditor;
