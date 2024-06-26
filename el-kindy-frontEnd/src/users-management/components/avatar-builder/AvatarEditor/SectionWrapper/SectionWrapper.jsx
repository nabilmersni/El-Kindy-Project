import React from "react";
import "./SectionWrapper.css";

const SectionWrapper = ({
  className = "",
  children,
  switchConfig,
  tip,
  small,
}) => {
  return (
    <div
      className={
        `${small ? "SectionWrapper2 " : ""} SectionWrapper ` + className
      }
      data-tip={tip}
      onClick={switchConfig}
    >
      <div className="relative w-full h-full">
        <div className="childrenWrapper absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper;
