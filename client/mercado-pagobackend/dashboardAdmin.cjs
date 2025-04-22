//dashboardAdmin.cjs

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.cjs');

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Simule os dados ou puxe do banco
    const dashboardData = {
      userCount: 23,
      reportCount: 12,
      settingCount: 5,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
