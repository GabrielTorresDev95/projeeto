// index.cjs
const express = require('express');
const router = express.Router(); // Cria um router Express
const adminDashboardRoutes = require('./adminDashboardRoutes.cjs'); // Importa o router de adminDashboardRoutes.cjs
console.log('adminDashboardRoutes importado:', adminDashboardRoutes); // ADICIONE ESTA LINHA

// Use a rota com o prefixo /admin
router.use('/admin', adminDashboardRoutes);

console.log('Router de index.cjs sendo exportado:', router); // Adicione esta linha

module.exports = router; // Exporta o router