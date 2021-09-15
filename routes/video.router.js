const express = require("express");
const router = express.Router();
const { Video } = require("../models/index.js");
const { findVideo } = require("../middleware/index.js");

router.param("videoId", findVideo);

router.route("/")
    .get(async (req, res) => {
        try {
            const videos = await Video.find({});
            res.status(200).json({ success: true, videos })
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving videos.", error: error.message })
        }
    })

    .post(async (req, res) => {
        try {
            const video = req.body;
            const NewVideo = new Video(video);
            const savedVideo = await NewVideo.save();
            res.status(200).json({ success: true, video: savedVideo });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while saving the video.", error: error.message })
        }
    })

router.route('/:videoId')
    .get((req, res) => {
        const video = req.video;
        res.status(200).json({ success: true, video });
    })

    .put(async (req, res) => {
        try {
            const video = req.video;
            const updateVideo = req.body;

            lodash.extend(video, updateVideo);
            const savedVideo = await video.save();
            savedVideo.password = undefined;
            res.status(200).json({ success: true, video: savedVideo });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while updating the video.", error: error.message })
        }
    })


module.exports = router;