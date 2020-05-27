
import express from "express";
import bodyParser from "body-parser";
import { connection } from "./config/db";
import checkAuth from "./middleware/check-auth";
import topicRoutes from "./routes/topic/topic";
import questionRoutes from "./routes/question/question";
import answerRoutes from "./routes/answer/answer";

export const server = express();

server.use(bodyParser.urlencoded({ extended: true }))

server.use(bodyParser.json())

connection.then(() => {
    console.log("Successfully connected to the database");
}).catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

server.get('/health', (req, res) => {
    res.status(200).json({ "message": "Welcome to Discussion Forum service." });
});

server.use(checkAuth);

server.use('/topic', topicRoutes);
server.use('/question', questionRoutes);
server.use('/answer', answerRoutes);