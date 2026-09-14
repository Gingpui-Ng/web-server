import { Router } from 'express';

const router = Router();

router.get('/info', (req, res) => {
  res.json({ version: '1.0', status: 'ok' });
});

router.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime()
  });
});

router.get('/user/:id', (req, res) => {
  if (req.params.id !== '1') {
    res.status(404).send('User not found.');
    return;
  }
  res.json({ id: '1', name: 'Alice' });
});

router.get('/info', (req, res) => {
  const info = {name: 'Tom', role: 'student'};
  res.json(info);
});

router.get('/error', (req, res) => {
  res.status(400).send('Bad request');
});

export default router;
