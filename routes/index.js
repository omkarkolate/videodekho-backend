const likedVideo = require("./likedVideo.router.js");
const login = require("./login.router.js");
const signup = require("./signup.router.js");
const video = require("./video.router.js");
const user = require("./user.router.js");
const playlist = require("./playlist.router.js");
const watchLater = require("./watchLater.router.js");
const watchHistory = require("./watchHistory.router.js");


module.exports = { login, signup, user, video, likedVideo, playlist, watchLater, watchHistory };