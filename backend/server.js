// Create and config the Express server.
const express = require('express');

const app = express();
const host = "127.0.0.1";
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
const corsOptions = {
    // Use frontend address here.
    origin: "http://127.0.0.1:4200",
    credentials: true,
};
app.use(cors(corsOptions));

// All server addresses, allowing to use the methods defined in this backend.
// Each script file needs its own address.
const tryLogin = require("./scripts/tryLogin").tryLogin;
app.post("/tryLogin", (request, result) => {tryLogin(request, result);});

const register = require("./scripts/register").register;
app.post("/register", (request, result) => { register(request, result);});

const getProfile = require("./scripts/getProfile").getProfile;
app.post("/getProfile", (req, res) => { getProfile(req, res);});

const changePassword = require("./scripts/changePassword").changePassword;
app.post("/changePassword", (req, res) => { changePassword(req, res);});

const logout = require("./scripts/logout").logout;
app.post("/logout", (req, res) => { logout(req, res);});

const getTopics = require("./scripts/getTopics").getTopics;
app.post("/getTopics", (req, res) => {getTopics(req, res)});

const createTopic = require("./scripts/createTopic").createTopic;
app.post("/createTopic", (req, res) => {createTopic(req, res)});

const getMessages = require("./scripts/getMessages").getMessages;
app.post("/getMessages", (req, res) => {getMessages(req, res)});

const postMessage = require("./scripts/postMessage").postMessage;
app.post("/postMessage", (req, res) => {postMessage(req, res)});

const getOnlineUsers = require("./scripts/getOnlineUsers").getOnlineUsers;
app.post("/getOnlineUsers", (req, res) => getOnlineUsers(req, res));

// Start server and display its address in the backend console.
app.listen(port, host, () => {console.log (`Listening to http://${host}:${port}`);});