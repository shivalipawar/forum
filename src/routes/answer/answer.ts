import express from 'express';
import allowPrivileged from '../../middleware/authorize';
import { postAnswer } from './answerDAL';

const router = express.Router();

router.post('',allowPrivileged('user'),postAnswer);

export default router