import express from "express";
import { getAllFeeds } from "./feedDAL";

let router = express.Router();

router.get('', getAllFeeds);

export default router