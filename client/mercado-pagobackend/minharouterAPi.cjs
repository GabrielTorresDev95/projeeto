// minhaApiRoutes.cjs
const express = require('express');
const router = express.Router();

console.log('Router de minhaApiRoutes.cjs carregado!'); // Mensagem para diferenciar

// Defina suas rotas aqui usando 'router'
router.get('/listar', (req, res) => {
    res.json({ message: 'Rota de listagem da minha API!' });
});

router.post('/criar', (req, res) => {
    const data = req.body;
    res.json({ message: 'Dados recebidos com sucesso!', data });
});

// Adicione outras rotas conforme necessário

module.exports = router; // Exporta o router