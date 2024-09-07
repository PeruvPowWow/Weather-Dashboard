import { Router } from 'express';

const router = Router();

// Example route
router.get('/api/weather', (req, res) => {
  res.json({ message: 'Weather data will be here.' });
});

export default router;