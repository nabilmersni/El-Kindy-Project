import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/karaoke";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const getAudioFromYtUrl = async (url) => {
  const queryString = url ? `?url=${url}` : "";
  const response = await instance.get(`${API_URL}/audioYt${queryString}`);
  return response.data.data.audioUrl;
};

const getYoutubeVideo = async (songTitle, singerName) => {
  // const apiKey = "AIzaSyDpbCTim5MbOviJre5ybN3VS5q9yb6BzBY";
  const apiKey = "AIzaSyBb1rbUulcAb8V-WOKhf0Blr_1Y1q29cJQ";
  const searchQuery = `${songTitle} ${singerName} lyrics`;
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        key: apiKey,
        q: searchQuery,
        type: "video",
        part: "snippet",
        maxResults: 1, // Limit to 1 result
      },
    }
  );

  const videoId = response.data.items[0].id.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return videoUrl;
};

const getLyrics = async (songTitle, singerName) => {
  const response = await axios.get(`https://lrclib.net/api/search`, {
    params: {
      track_name: songTitle,
      artist_name: singerName,
    },
  });

  return response?.data[0]?.syncedLyrics.split("\n");
};

const mixVocalMusic = async (file, musicAudioUrl) => {
  const formData = new FormData();
  formData.append("audioFile", file);
  formData.append("musicAudioUrl", musicAudioUrl);

  const response = await instance.post(`${API_URL}/mixAudio`, formData);
  return response.data;
};

const mineKaraokeService = {
  getAudioFromYtUrl,
  getYoutubeVideo,
  getLyrics,
  mixVocalMusic,
};

export default mineKaraokeService;
