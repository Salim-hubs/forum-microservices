// USER-SERVICE - Microservice de gestion des utilisateurs
// Port 3001
const express = require('express');

const app = express();
//config en local , passons en prod avec docker
// const host = "127.0.0.1";
// const port = 3001;
 const host = "0.0.0.0";
 const port = process.env.PORT || 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require('cors');
const corsOptions = {
    origin: ["http://127.0.0.1:4200", "http://localhost:4200"],
    credentials: true,
};
app.use(cors(corsOptions));

// Routes du microservice utilisateur
const tryLogin = require("./scripts/tryLogin").tryLogin;
app.post("/tryLogin", (req, res) => tryLogin(req, res));

const register = require("./scripts/register").register;
app.post("/register", (req, res) => register(req, res));

const getProfile = require("./scripts/getProfile").getProfile;
app.post("/getProfile", (req, res) => getProfile(req, res));

const changePassword = require("./scripts/changePassword").changePassword;
app.post("/changePassword", (req, res) => changePassword(req, res));

const logout = require("./scripts/logout").logout;
app.post("/logout", (req, res) => logout(req, res));

const getOnlineUsers = require("./scripts/getOnlineUsers").getOnlineUsers;
app.post("/getOnlineUsers", (req, res) => getOnlineUsers(req, res));

// Endpoint de health check pour vérifier que le service fonctionne
app.get("/health", (req, res) => res.json({ status: "ok", service: "user-service" }));

app.listen(port, host, () => {
    console.log(`[USER-SERVICE] Listening on http://${host}:${port}`);
});
