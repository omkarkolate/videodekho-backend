const { Video } = require("../models/index.js");

async function findVideo(req, res, next, videoId){
    try{
        const video = await Video.findById(videoId);

        if(video) {
            req.video = video;
            next();
        } else {
            throw 'Video not exist with this video id.';
        }
    } catch (error) {
        res.status(400).json({ success: false, messsage: "Error in retriving video.", error })
    }
} 

module.exports = findVideo;