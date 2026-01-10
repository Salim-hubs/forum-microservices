// Create and config the Express server.
const express = require('express');

const app = express();
const host = "127.0.0.1";
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    // Use frontend address here.
    origin: "http://127.0.0.1:4200",
    credentials: true,
};
app.use(cors(corsOptions));

// All server addresses, allowing to use the methods defined in this backend.
// Each script file needs its own address.
// const getSectors = require("./scripts/getSectors").getSectors;
// app.post("/getSectors", (request, result) => {getSectors(request, result);});

// Start server and display its address in the backend console.
app.listen(port, host, () => {console.log (`Listening to http://${host}:${port}`);});