// minhaapi.cjs
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Importe os outros routers
const loginAdminRoutes = require('./loginAdmin.cjs');
const adminDashboardRoutes = require('./adminDashboardRoutes.cjs');
const cardsRouter = require('./controller/cardControllers.cjs');
const usersRouter = require('./controller/userControllers.cjs');
const appRoutes = require('./app.cjs');
const indexRoutes = require('./index.cjs');
const serverRoutes = require('./server.cjs');

console.log('Tentando usar /api/admin com:', loginAdminRoutes);
app.use('/api/admin', loginAdminRoutes);

console.log('Tentando usar /api/dashboard com:', adminDashboardRoutes);
// app.use('/api/dashboard', adminDashboardRoutes); // Você já montou isso dentro de indexRoutes

console.log('Tentando usar /api/cards com:', cardsRouter);
app.use('/api/cards', cardsRouter);

console.log('Tentando usar /api/users com:', usersRouter);
app.use('/api/users', usersRouter);

console.log('Tentando usar /api/app com:', appRoutes);
app.use('/api/app', appRoutes);

console.log('Tentando usar /api com:', indexRoutes);
app.use('/api', indexRoutes);

console.log('Tentando usar /api/mercadopago com:', serverRoutes);
app.use('/api/mercadopago', serverRoutes);

app.get('/', (req, res) => {
    res.send('API Central (minhaapi.cjs) rodando!');
});

app.listen(PORT, () => {
    console.log(`API Central rodando na porta ${PORT}`);
});

