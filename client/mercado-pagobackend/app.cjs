// app.cjs
const express = require('express');
const cors = require('cors');
const loginAdminRoutes = require('./loginAdmin.cjs');
const adminDashboardRoutes = require('./adminDashboardRoutes.cjs');
const minhaApiRoutes = require('./minharouterAPi.cjs'); // ✅ Importando com o nome de arquivo CORRETO
// const { verificarAdminToken } = require('./auth.cjs'); // Se estiver usando

const router = express.Router(); // Cria um router Express

// Configuração CORS (você pode manter aqui SE precisar de configurações específicas para essas rotas)
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? ['https://cliente-c9lqgiw84-gabriels-projects-a95fe2cc.vercel.app'] // Substitua pelo seu domínio real
        : ['http://localhost:8080'], // Porta do seu frontend Vue
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Se estiver usando cookies/sessões
};

router.use(cors(corsOptions)); // Aplica as configurações ao router
router.use(express.json()); // Aplica o middleware json ao router

// Rotas
router.use('/admin', loginAdminRoutes);
router.use('/admin', adminDashboardRoutes);
router.use('/minhaapi', minhaApiRoutes); // Monta as rotas da "minha API"
router.get('/test-app', (req, res) => {
    res.send('Rota de teste do app.cjs dentro da API central!');
});

module.exports = router; // Exporta o router