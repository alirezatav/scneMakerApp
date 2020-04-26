var remote = require("electron").remote;
const fs = require("fs");
const path = require("path");
const sqlite = require("./../db/sqlite");
const videosDirectory = "resources/videos";
module.exports = {
  getVideo: (name) => {
    // var video = fs.readdirSync(`${videosDirectory}/${name}`);
    return `file:///D:/Projects/sceneMakerDashboard/resources/videos/v1/v1.mp4`;
  },
  getVideoWordScenes: (video,word) => {
    var videos = fs.readdirSync(`src/${videosDirectory}/${video}/scenes/${word}`);
    return videos.map(a=>({name:video,word,video:a}));
  },
  getVideoWords: (video) => {
    var videos = fs.readdirSync(`src/${videosDirectory}/${video}/scenes`);
    return videos.map(a=>({name:video,word:a}));
  },
  getVideos: () => {
    var videos = fs.readdirSync('src/'+videosDirectory);
    return videos.map(a=>({name:a}));
  },
};
