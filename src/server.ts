
import express from "express";
import bodyParser from "body-parser";
import { connection } from "./config/db";
import checkAuth from "./middleware/check-auth";
import topicRoutes from "./routes/topic/topic";

export const server = express();

// parse requests of content-type - application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }))

// parse requests of c=ontent-type - application/json
server.use(bodyParser.json())

connection.then(()=>{
    console.log("Successfully connected to the database");
}).catch((err)=>{
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

server.get('/health', (req, res) => {
    res.status(200).json({ "message": "Welcome to Discussion Forum service." });
});

server.use(checkAuth);

server.use('/topic',topicRoutes);