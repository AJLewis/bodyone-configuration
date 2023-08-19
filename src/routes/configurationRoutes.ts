import express from 'express';
import verifyTokenMiddleware from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyTokenMiddleware);  // Protect all routes in this router with JWT verification

router.get('/initial', (req, res) => {
  // Handle your configuration data fetching here
  res.json({ data: 'Some configuration data' });
});

export default router;