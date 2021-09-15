const express = require("express");
const router = express.Router();
const { findVideo, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("videoId", findVideo);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { watchLater } = await user.populate('watchLater');
            res.status(200).json({ success: true, watchLater });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving watch Later Videos.", error: error.message })
        }
    })

router.route("/:userId/:videoId")
    .post(async (req, res) => {
        try {
            const { user, video } = req;
            user.watchLater.push(video._id);
            await user.save();
            const { watchLater } = await user.populate('watchLater');
            res.status(200).json({ success: true, video: watchLater[watchLater.length-1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding video into watch Later Videos.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, video } = req;
            user.watchLater.remove(video._id);
            await user.save();
            res.status(200).json({ success: true, video: video._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing video from watch Later Videos.", error: error.message })
        }
    })

module.exports = router;