const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    youtubeId: String,
    title: String,
}, { timestamps: true });

const Video = mongoose.model('video', videoSchema);

module.exports = Video;