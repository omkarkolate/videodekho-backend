const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    watchLater: [{ type: Schema.Types.ObjectId, ref: 'video' }],
    likedVideos: [{ type: Schema.Types.ObjectId, ref: 'video' }],
    playlist: [{ type: Schema.Types.ObjectId, ref: 'video' }],
    watchHistory: [{ type: Schema.Types.ObjectId, ref: 'video' }],
}, { timestamps: true });

const User = model('user', userSchema);

module.exports = User;