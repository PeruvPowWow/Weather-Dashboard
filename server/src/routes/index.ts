import { Router } from 'express';

const router = Router();

// Ensure the imports point to TypeScript files
import apiRoutes from './api/index';   // Assuming this is index.ts
import htmlRoutes from './htmlRoutes'; // Assuming this is htmlRoutes.ts

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;
