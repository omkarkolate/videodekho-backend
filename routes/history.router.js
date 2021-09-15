const express = require("express");
const router = express.Router();
const { findVideo, findUser } = require("../middleware/index.js");

router.param("userId", findUser);
router.param("videoId", findVideo);

router.route("/:userId")
    .get(async (req, res) => {
        try {
            const { user } = req;
            const { history } = await user.populate('history');
            res.status(200).json({ success: true, history });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while retriving history Videos.", error: error.message })
        }
    })

router.route("/:userId/:videoId")
    .post(async (req, res) => {
        try {
            const { user, video } = req;
            user.history.push(video._id);
            await user.save();
            const { history } = await user.populate('history');
            res.status(200).json({ success: true, video: history[history.length-1] });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while adding video into history Videos.", error: error.message })
        }
    })

    .delete(async (req, res) => {
        try {
            const { user, video } = req;
            user.history.remove(video._id);
            await user.save();
            res.status(200).json({ success: true, video: video._id });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error while removing video from history Videos.", error: error.message })
        }
    })

module.exports = router;