import path from 'path';
import { Router } from 'express';

const __dirname = path.resolve(); // or use a more specific path if needed
const router = Router();

router.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;

