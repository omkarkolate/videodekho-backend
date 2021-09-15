const express = require("express");
const router = express.Router();
const { findVideo, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("videoId", findVideo);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { likedVideos } = await user.populate('likedVideos');
            res.status(200).json({ success: true, likedVideos });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving liked Videos.", error: error.message })
        }
    })

router.route("/:userId/:videoId")
    .post(async (req, res) => {
        try {
            const { user, video } = req;
            user.likedVideos.push(video._id);
            await user.save();
            const { likedVideos } = await user.populate('likedVideos');
            res.status(200).json({ success: true, video: likedVideos[likedVideos.length-1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding video into liked Videos.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, video } = req;
            user.likedVideos.remove(video._id);
            await user.save();
            res.status(200).json({ success: true, video: video._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing video from liked Videos.", error: error.message })
        }
    })

module.exports = router;