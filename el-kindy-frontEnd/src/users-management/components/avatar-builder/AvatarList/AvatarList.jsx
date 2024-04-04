import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { genConfig } from "react-nice-avatar";
import ReactNiceAvatar from "react-nice-avatar";
import "./AvatarList.css";

const AvatarList = ({ selectConfig, small }) => {
  // const displayCount = 10;

  const getDisplayCount = () => {
    if (window.innerWidth < 450) {
      return 2;
    } else if (window.innerWidth < 700) {
      return 3;
    } else if (window.innerWidth < 1100) {
      return 6;
    } else {
      return 10;
    }
  };

  const [displayCount, setDisplayCount] = useState(getDisplayCount());
  const [avatarConfigList, setAvatarConfigList] = useState(
    genConfigList(getDisplayCount())
  );

  useEffect(() => {
    const handleResize = () => {
      setDisplayCount(getDisplayCount());
      fetchListWidth();
      setAvatarConfigList((prevList) => [
        ...prevList,
        ...genConfigList(getDisplayCount()),
      ]);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [current, setCurrent] = useState(0);
  const listId = "avatarList";
  const listWidthRef = useRef(0);

  useEffect(() => {
    fetchListWidth();
  }, []);

  function genConfigList(count) {
    return new Array(count).fill(null).map(() => ({
      ...genConfig({ isGradient: Boolean(Math.round(Math.random())) }),
      id: "n_" + nanoid(),
    }));
  }

  function fetchListWidth(count = 0) {
    if (count > 20) return;

    const listElem = document.getElementById(listId);

    if (!listElem) {
      setTimeout(() => {
        fetchListWidth(count + 1);
      }, 500);
      return;
    }

    listWidthRef.current = listElem.offsetWidth;
  }

  function changeCurrent(deg) {
    const newCurrent = Math.max(current + deg, 0);
    setCurrent(newCurrent);
    setAvatarConfigList((prevList) => [
      ...prevList,
      ...genConfigList(displayCount),
    ]);
  }

  const displayMax = (current + 2) * displayCount;
  const displayMin = (current - 1) * displayCount;

  const avatarWidth = small ? "5rem" : "8rem";

  const inlineStyle = {
    "--avatarWidth": avatarWidth,
    "--laptopWidth": `calc(${avatarWidth} - 0.8rem)`,
    "--displayCount": `${displayCount}`,
    "--sectionWidth": `calc(${avatarWidth} * var(--displayCount))`,
    ".AvatarList": {
      width: `calc(var(--laptopWidth) * var(--displayCount))`,
    },
    "@media (minWidth: 1280px)": {
      ".AvatarList": {
        width: `calc(var(--avatarWidth) * var(--displayCount))`,
      },
      ".AvatarList .AvatarItemWrapper": {
        flex: `0 0 ${avatarWidth}`,
        height: avatarWidth,
      },
      ".AvatarList .AvatarItemWrapper:hover > .AvatarItem": {
        transform: "scale(1.3)",
      },
      ".AvatarList .AvatarItemWrapper > .AvatarItem": {
        "--avatarLaptopInnerWidth": `calc(${avatarWidth} - 1.2rem)`,
        "--avatarInnerWidth": `calc(${avatarWidth} - 1.5rem)`,
        width: "var(--avatarLaptopInnerWidth)",
        height: "var(--avatarLaptopInnerWidth)",
        transition: "all 0.25s ease-out",
        cursor: "pointer",
      },
    },
  };

  return (
    <div style={inlineStyle} className="flex items-center justify-center mb-4">
      {/* Arrow left */}
      {current !== 0 && (
        <i
          className="iconfont icon-arrow-right-filling-center transform rotate-180 mr-1 text-[2rem] text-gray-500 transition hover:text-white cursor-pointer"
          onClick={() => changeCurrent(-1)}
        />
      )}

      {/* List */}
      <div id={listId} className="AvatarList overflow-x-hidden">
        <div
          className="listWrapper flex items-center py-3"
          style={{
            transform: `translateX(-${current * listWidthRef.current}px)`,
          }}
        >
          {avatarConfigList.map((item, idx) => (
            <div
              key={item.id}
              className="AvatarItemWrapper"
              onClick={() => selectConfig(item)}
            >
              {idx >= displayMin && idx < displayMax && (
                <ReactNiceAvatar className="AvatarItem" {...item} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow right */}
      <i
        className="iconfont icon-arrow-right-filling-center ml-1 text-[2rem] text-gray-500 transition hover:text-white cursor-pointer"
        onClick={() => changeCurrent(1)}
      />
    </div>
  );
};

AvatarList.propTypes = {
  selectConfig: PropTypes.func.isRequired,
};

export default AvatarList;
