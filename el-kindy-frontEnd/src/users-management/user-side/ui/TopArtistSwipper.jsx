import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMediaQuery } from "react-responsive";
import "swiper/css";

function TopArtistSwipper({ topSongs }) {
  const [my_swiper, set_my_swiper] = useState({});
  const [topArtists, setTopArtists] = useState(topSongs);
  const isTablette = useMediaQuery({ query: `(max-width: 1150px)` });
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    setTopArtists(topSongs);
  }, [topSongs]);
  return (
    <div className="flex justify-center items-center gap-8">
      <button onClick={() => my_swiper.slidePrev()}>
        <svg
          id="swipper-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 37.737 37.737"
          className="w-[2rem] lg:w-[2.3rem]  fill-primary hover:fill-secondaryDark transition-all duration-75"
        >
          <path
            id="Path_520"
            data-name="Path 520"
            d="M20.868,2A18.868,18.868,0,1,1,2,20.868,18.89,18.89,0,0,1,20.868,2ZM12.274,22.438l11.321,7.547a1.886,1.886,0,0,0,2.934-1.57V13.321a1.887,1.887,0,0,0-2.932-1.57L12.276,19.3a1.887,1.887,0,0,0,0,3.14Z"
            transform="translate(-2 -2)"
          />
        </svg>
      </button>
      <Swiper
        spaceBetween={50}
        slidesPerView={isMobile ? 1 : isTablette ? 3 : 4}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
      >
        {topArtists.map((topArtist) => (
          <SwiperSlide key={topArtist.key}>
            <div className="flex flex-col justify-center items-center cursor-grab">
              <div className="rounded-[2rem] w-[9rem] h-[9rem] md:w-[11rem] md:h-[11rem] shadow-sm">
                <img
                  className="w-full h-full object-cover rounded-[2rem]"
                  src={topArtist?.images?.background}
                  alt=""
                />
              </div>
              <p className="text-[1.1rem] text-primary font-bold mt-4 text-center">
                {topArtist.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => my_swiper.slideNext()}>
        <svg
          id="swipper-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 37.737 37.737"
          className="w-[2rem] lg:w-[2.3rem] fill-primary hover:fill-secondaryDark transition-all duration-75 -scale-x-100"
        >
          <path
            id="Path_520"
            data-name="Path 520"
            d="M20.868,2A18.868,18.868,0,1,1,2,20.868,18.89,18.89,0,0,1,20.868,2ZM12.274,22.438l11.321,7.547a1.886,1.886,0,0,0,2.934-1.57V13.321a1.887,1.887,0,0,0-2.932-1.57L12.276,19.3a1.887,1.887,0,0,0,0,3.14Z"
            transform="translate(-2 -2)"
          />
        </svg>
      </button>
    </div>
  );
}

export default TopArtistSwipper;
