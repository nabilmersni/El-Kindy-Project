import axios from "axios";

const API_URL = "https://shazam.p.rapidapi.com";
const API_URL2 = "https://shazam-api7.p.rapidapi.com";

const instance = axios.create({
  baseURL: API_URL,
});

const instance2 = axios.create({
  baseURL: API_URL,
});

// instance.defaults.headers.common["X-RapidAPI-Key"] =
//   "e1b57eb444msh122062d4b31f4b3p123cefjsn0c6f0c90dbb5";
instance.defaults.headers.common["X-RapidAPI-Key"] =
  "4b066acb03msh7deea4abd1a5280p1a9200jsn271842d73317";
instance.defaults.headers.common["X-RapidAPI-Host"] = "shazam.p.rapidapi.com";

instance2.defaults.headers.common["X-RapidAPI-Key"] =
  "4b066acb03msh7deea4abd1a5280p1a9200jsn271842d73317";
instance2.defaults.headers.common["X-RapidAPI-Host"] =
  "shazam-api7.p.rapidapi.com";

// const getTopSongs = async () => {
//   const params = {
//     locale: "en-US",
//     pageSize: "20",
//     startFrom: "0",
//   };
//   const response = await instance.get(`${API_URL}/charts/list`, { params });
//   return response.data.tracks;
// };

const getTopSongs = async () => {
  const params = {
    country_code: "US",
    genre: "POP",
    limit: "10",
  };
  const response = await instance2.get(
    `${API_URL}/charts/get-top-songs-in_country_by_genre`,
    { params }
  );
  return response.data.tracks;
};

const getSearchedSongs = async (searchedTerm) => {
  const params = {
    term: searchedTerm,
    // locale: "en-US",
    // limit: "5",
  };
  const response = await instance.get(`${API_URL}/search`, { params });
  return response.data.tracks;
};

const karaokeService = {
  getTopSongs,
  getSearchedSongs,
};

export default karaokeService;
