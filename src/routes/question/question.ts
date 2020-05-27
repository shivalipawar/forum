import express from "express";
import { postQuestion } from "./questionDAL";
import allowPrivileged from "../../middleware/authorize";

let router = express.Router();

router.post('', allowPrivileged("user"), postQuestion);

export default router