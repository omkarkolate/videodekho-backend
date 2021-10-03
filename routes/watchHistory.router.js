const express = require("express");
const router = express.Router();
const { findVideo, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("videoId", findVideo);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { watchHistory } = await user.populate('watchHistory');
            res.status(200).json({ success: true, watchHistory });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving watch History Videos.", error: error.message })
        }
    })

router.route("/:userId/:videoId")
    .post(async (req, res) => {
        try {
            const { user, video } = req;
            const { videoId } = req.params;

            const inWatchHistory = await user.watchHistory.find(video => video._id.toString() === videoId);
            
            if(inWatchHistory) {
                await user.watchHistory.remove(video._id);
            }
            
            await user.watchHistory.unshift(video._id);
            await user.save();
            
            const { watchHistory } = await user.populate('watchHistory');
            res.status(200).json({ success: true, video: watchHistory[0] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding video into watch History Videos.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, video } = req;
            user.watchHistory.remove(video._id);
            await user.save();
            res.status(200).json({ success: true, video: video._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing video from watch History Videos.", error: error.message })
        }
    })

module.exports = router;