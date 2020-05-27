import express from "express";
import { getTopics, postTopic } from "./topicDAL";
import allowPrivileged from "../../middleware/authorize";

const router = express.Router();

router.get('', getTopics);
router.post('', allowPrivileged("admin"), postTopic);

export default router;