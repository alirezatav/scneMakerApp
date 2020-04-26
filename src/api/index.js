import axios from "axios";
const base_url = "http://185.120.221.230:4000/api";
const api = {
  getVideos: () => {
    return axios.get(`${base_url}/get-videos`);
  },
  getVideoWords: (id) => {
    return axios.get(`${base_url}/get-video-words?id=${id}`);
  },
  getVideoWordScenes: (id, word) => {
    return axios.get(`${base_url}/get-video-word-scenes?id=${id}&word=${word}`);
  },
  makeScene: (data) => {
    return axios.post(`${base_url}/make-scene`, data);
  },
  importFromDir: () => {
    return axios.post(`${base_url}/import-video`);
  },
  getVideoDetail: (id) => {
    return axios.get(`${base_url}/get-video-details?id=${id}`);
  },
  uploadVideo: (body) => {
    return axios.post(`${base_url}/upload-video`,body);
  },
};

export default api;
export { base_url };
