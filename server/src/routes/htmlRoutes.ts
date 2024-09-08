import path from 'path';
import { Router } from 'express';

const router = Router();

// Define route to serve index.html
router.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../client/dist/index.html'));  // Ensure this path is correct
});

export default router;
