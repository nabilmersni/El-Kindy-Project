import { useState } from "react";

function SongCard({ song }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center p-[1rem] rounded-[1.5rem] bg-[#eef4ff] hover:bg-[#ddeaff] shadow-custom2 border-[.2rem] border-[#006cbe1e] cursor-pointer transition-all duration-100 ease-in  ">
      <div className="w-[11rem] h-[11rem] rounded-[.5rem] ">
        <img
          className="w-full h-full object-cover rounded-[.5rem]"
          src={song.images.coverart}
          alt=""
        />
      </div>
      <div className="relative flex flex-col w-[10rem] mt-[.8rem] min-w-[10rem]">
        <h1
          className="text-[1.2rem] font-bold"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          {song.title}
        </h1>
        <span
          className="text-[.9rem] font-normal"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          onMouseEnter={() => setShowPopup2(true)}
          onMouseLeave={() => setShowPopup2(false)}
        >
          {song.subtitle}
        </span>

        {showPopup && (
          <div className="absolute top-[4rem] left-0 bg-white p-[1rem] shadow-md border border-gray-200 rounded-[1rem] transition-all duration-100 ease-in">
            {song.title}
          </div>
        )}

        {showPopup2 && (
          <div className="absolute top-[4rem] left-0 bg-white p-[1rem] shadow-md border border-gray-200 rounded-[1rem] transition-all duration-100 ease-in">
            {song.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongCard;
