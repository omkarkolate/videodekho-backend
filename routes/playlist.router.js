const express = require("express");
const router = express.Router();
const { findVideo, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("videoId", findVideo);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { playlist } = await user.populate('playlist');
            res.status(200).json({ success: true, playlist });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving playlist Videos.", error: error.message })
        }
    })

router.route("/:userId/:videoId")
    .post(async (req, res) => {
        try {
            const { user, video } = req;
            user.playlist.push(video._id);
            await user.save();
            const { playlist } = await user.populate('playlist');
            res.status(200).json({ success: true, video: playlist[playlist.length-1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding video into playlist Videos.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, video } = req;
            user.playlist.remove(video._id);
            await user.save();
            res.status(200).json({ success: true, video: video._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing video from playlist Videos.", error: error.message })
        }
    })

module.exports = router;