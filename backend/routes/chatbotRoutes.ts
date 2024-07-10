import { Router } from 'express';
import { getAllPlugins, createPlugin } from '../controllers/chatbotController';

const router = Router();

router.get('/', getAllPlugins);
router.post('/', createPlugin);

export default router;
