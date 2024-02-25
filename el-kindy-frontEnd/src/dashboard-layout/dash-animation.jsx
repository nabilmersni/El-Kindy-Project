import "../../public/assets/css/style.css";
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const DashAnimation = (props) => {
  const animationRef = useRef(null);

  useEffect(() => {
    const loadAnimation = () => {
      return lottie.loadAnimation({
        container: animationRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationRef.current.dataset.animPath,
      });
    };

    const notesFly = loadAnimation();

    return () => {
      notesFly.destroy();
    };
  }, []);

  return (
    <div
      className={props.className}
      data-anim-path={props.path}
      ref={animationRef}
    ></div>
  );
};

export default DashAnimation;
