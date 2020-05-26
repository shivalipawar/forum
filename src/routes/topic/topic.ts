import express from "express";
import { getTopics, postTopic } from "./topicDAL";
import isAdmin from "../../middleware/admin-check";

const router = express.Router();

router.get('',getTopics);
router.post('',isAdmin,postTopic);

export default router;