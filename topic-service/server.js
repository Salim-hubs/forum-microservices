// TOPIC-SERVICE - Microservice de gestion des topics et messages
// Port 3002
const express = require('express');

const app = express();
const host = "127.0.0.1";
const port = 3002;

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

// Routes du microservice topics/messages
const getTopics = require("./scripts/getTopics").getTopics;
app.post("/getTopics", (req, res) => getTopics(req, res));

const createTopic = require("./scripts/createTopic").createTopic;
app.post("/createTopic", (req, res) => createTopic(req, res));

const getMessages = require("./scripts/getMessages").getMessages;
app.post("/getMessages", (req, res) => getMessages(req, res));

const postMessage = require("./scripts/postMessage").postMessage;
app.post("/postMessage", (req, res) => postMessage(req, res));

// Endpoint de health check pour vérifier que le service fonctionne
app.get("/health", (req, res) => res.json({ status: "ok", service: "topic-service" }));

app.listen(port, host, () => {
    console.log(`[TOPIC-SERVICE] Listening on http://${host}:${port}`);
});
