import express from 'express';
import lor from './authitication/route';
const router = express.Router();
router.use(lor);
export default router;