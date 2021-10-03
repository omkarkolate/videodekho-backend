const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initDatabaseConnection = require('./database/database.connect.js');
const port = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: ['https://videodekho.netlify.app' ,'https://0l80y.csb.app'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions))
app.use(bodyParser.json());

initDatabaseConnection();

//Middlewares
const { routeNotFound, errorHandler, findUserByEmailId  } = require("./middleware/index.js");

//Routes
const { login, signup, user, video, likedVideo, watchLater, playlist, watchHistory } = require("./routes/index.js");


app.get('/', (req, res) => {
    res.status(200).send('Namaste _/\\_  Welcome to video dekho server')
});

app.post("/login", findUserByEmailId, login);
app.post("/signup", findUserByEmailId, signup);
app.use("/users", user);
app.use("/videos", video);
app.use("/likedVideos", likedVideo);
app.use("/watchLater", watchLater);
app.use("/playlist", playlist);
app.use("/watchHistory", watchHistory);

/*
 * Note: Keep at end to handle errors and 404s
 */
app.use(routeNotFound);
app.use(errorHandler)

app.listen(port, () => {
    console.log('server started');
});

//https://img.youtube.com/vi/5qVrFsfebbU/0.jpg