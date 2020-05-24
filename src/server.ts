
import express from "express";
import bodyParser from "body-parser";

export const server = express();

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))

// parse requests of c=ontent-type - application/json
server.use(bodyParser.json())

server.get('/health', (req, res,next) => {
    res.status(200).json({ "message": "Welcome to Discussion Forum service." });
});