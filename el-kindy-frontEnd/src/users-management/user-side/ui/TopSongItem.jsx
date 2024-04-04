function TopSongItem({ song }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center gap-[2rem] p-[.6rem] px-[1rem] rounded-[2rem] cursor-pointer hover:bg-[#006cbe1e] transition-all duration-100 ease-in">
        <div className="w-[6rem] h-[6rem] rounded-[2rem]  ">
          <img
            className="w-full h-full object-cover rounded-[2rem] "
            src={song?.images.coverart}
            alt=""
          />
        </div>

        <div className="flex flex-col w-[10rem]">
          <p className="text-[1.2rem] font-bold flex items-center gap-[1rem] ">
            {song?.title}
          </p>
          <span className="text-[1rem] font-normal ">
            {`${song?.subtitle}`}
          </span>
        </div>
        <div className="">
          <svg
            id="swipper-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 37.737 37.737"
            className="fill-primary hover:fill-secondaryDark transition-all duration-75 -scale-x-100"
          >
            <path
              id="Path_520"
              data-name="Path 520"
              d="M20.868,2A18.868,18.868,0,1,1,2,20.868,18.89,18.89,0,0,1,20.868,2ZM12.274,22.438l11.321,7.547a1.886,1.886,0,0,0,2.934-1.57V13.321a1.887,1.887,0,0,0-2.932-1.57L12.276,19.3a1.887,1.887,0,0,0,0,3.14Z"
              transform="translate(-2 -2)"
            />
          </svg>
        </div>
      </div>

      <div className="dividerr self-center w-[70%] h-[.2rem] bg-[#006cbe1e]  my-[1rem] rounded-full "></div>
    </div>
  );
}

export default TopSongItem;
