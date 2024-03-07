import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { genConfig } from "react-nice-avatar";
import ReactNiceAvatar from "react-nice-avatar";
import "./AvatarList.css";

const AvatarList = ({ selectConfig }) => {
  const displayCount = 10;
  const [current, setCurrent] = useState(0);
  const [avatarConfigList, setAvatarConfigList] = useState(
    genConfigList(displayCount)
  );
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

    if (newCurrent * displayCount > avatarConfigList.length - 1) {
      const newConfigList = genConfigList(displayCount);
      setAvatarConfigList((prevList) => [...prevList, ...newConfigList]);
    }
  }

  const displayMax = (current + 2) * displayCount;
  const displayMin = (current - 1) * displayCount;

  return (
    <div className="flex items-center justify-center mb-4">
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
