import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";

import { Spinner as Spinner2 } from "@material-tailwind/react";
import InputAdornment from "@mui/material/InputAdornment";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SongCard from "./SongCard";
import karaokeService from "../../../features/karaoke/KaraokeService";
import debounce from "debounce";

function SearchSong({ setOpenModal, setSelectedSong }) {
  const formInputSize = "1.1rem";
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const debouncedSearchRef = useRef(
    debounce(async (searchTerm) => {
      setIsLoadingSearch(true);
      try {
        const songs = await karaokeService.getSearchedSongs(searchTerm);
        setSongs(songs);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingSearch(false);
    }, 1500)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    debouncedSearchRef.current(event.target.value);
  };

  return (
    <div className="flex flex-col items-center w-full h-full  ">
      <div className="flex flex-col xl:flex-row justify-between items-center w-full">
        <h1 className="text-[1.5rem] text-blackk font-semibold  ">
          Search for your song
        </h1>
        <div className="w-full xl:w-1/2">
          <TextField
            margin="normal"
            fullWidth
            type="text"
            id="search"
            label="Search"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon className="text-gray-400 w-5 h-5" />{" "}
                  {/* Adjust size and color as needed */}
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  fontSize: `${formInputSize}`,
                  borderColor: "#DBDFEA",
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: "#7586FF",
                },
                "&.Mui-focused fieldset": {
                  fontSize: `${formInputSize}`,
                  borderColor: "#6678ff",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: `${formInputSize}`,
                "&.Mui-focused": {
                  color: "#6678ff",
                },
              },
              "& .MuiInputBase-input": {
                fontSize: `${formInputSize}`,
              },
              "& .MuiFormHelperText-root": {
                fontSize: "1.6rem",
              },
            }}
          />
        </div>
      </div>
      <div className="dividerr self-center w-[80%] h-[.15rem] bg-[#006cbe1e]  my-[1rem] rounded-full "></div>

      {isLoadingSearch ? (
        <div className="w-full mt-[4rem] flex justify-center items-center">
          <Spinner2 width={"2.5rem"} height={"2.5rem"} color="blue-gray" />
        </div>
      ) : songs && songs?.hits?.length ? (
        <div className="flex flex-wrap justify-center gap-[1.5rem] mt-[2rem] ">
          {songs &&
            songs?.hits.map((song) => (
              <button
                onClick={() => {
                  setOpenModal(true);
                  setSelectedSong(song.track);
                }}
                key={song.track.key}
                className="text-left"
              >
                <SongCard song={song.track} />
              </button>
            ))}
        </div>
      ) : (
        <div className="text-[1.2rem] text-blackk flex justify-center items-center mt-[4rem] ">
          Search for any music you want by title, artist name or both.
        </div>
      )}
    </div>
  );
}

export default SearchSong;
