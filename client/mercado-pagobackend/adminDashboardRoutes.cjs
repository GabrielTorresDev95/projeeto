// adminDashboardRoutes.cjs
const express = require('express');
const router = express.Router();

// Rota GET /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  res.json({
    userCount: 42,      // Exemplo (substitua por dados reais do banco)
    reportCount: 13,    // Exemplo
    settingCount: 5     // Exemplo
  });
});

module.exports = router;