// server.cjs

const express = require('express');
const router = express.Router(); // ✅ Declarando o router no início

const cors = require('cors');
const path = require('path');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago'); // Importando Payment também

const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-2613751912510386-041010-aef3d4509c7244829653a00d4b906879-2384603750'
});

// Cache para idempotência (opcional)
const preferenciasCache = new Map();

router.use(cors()); // ✅ Usando router.use em vez de app.use
router.use(express.json()); // ✅ Usando router.use em vez de app.use
// app.use(express.static(path.join(__dirname, 'public'))); // Servir estáticos na API central

router.post('/criar-preferencia-marketplace', async (req, res) => {
  try {
    console.log('📦 Body recebido:', req.body);
    const { items, sellerAccessToken, marketplaceFee, payer, idempotencyKey } = req.body;

    if (idempotencyKey && preferenciasCache.has(idempotencyKey)) {
      const cachedPref = preferenciasCache.get(idempotencyKey);
      console.log('♻️ Preferência já existe no cache:', cachedPref.id);
      return res.json({ id: cachedPref.id, reused: true, init_point: cachedPref.init_point, sandbox_init_point: cachedPref.sandbox_init_point });
    }

    const preferencePayload = {
      items: items.map(item => ({ title: item.title, quantity: Number(item.quantity), currency_id: 'BRL', unit_price: Number(item.unit_price) })),
      marketplace: '7353630849226387', // ⚠️ Substitua pelo seu Client ID do Marketplace
      marketplace_fee: marketplaceFee || 0.10,
      payer: payer || { email: "gabrielprofessor802@gmail.com" }, // EMAIL DE COMPRADOR DE TESTE
      back_urls: { success: 'http://localhost:5173/sucesso', failure: 'http://localhost:5173/erro', pending: 'http://localhost:5173/pendente' },
      auto_return: 'approved',
      notification_url: '/api/mercado-pago/notificacoes', // Ajuste o caminho para sua API central
    };

    const sellerClient = new MercadoPagoConfig({ accessToken: sellerAccessToken });
    const preference = new Preference(sellerClient);
    const options = idempotencyKey ? { headers: { 'X-Idempotency-Key': idempotencyKey } } : {};
    const response = await preference.create({ body: preferencePayload, ...options });

    console.log('✅ Preferência criada:', response.id);
    console.log('🔗 Init Point:', response.init_point);
    console.log('🔗 Sandbox Init Point:', response.sandbox_init_point);

    if (idempotencyKey) {
      preferenciasCache.set(idempotencyKey, { id: response.id, init_point: response.init_point, sandbox_init_point: response.sandbox_init_point });
    }

    res.json({ id: response.id, init_point: response.init_point, sandbox_init_point: response.sandbox_init_point });
  } catch (error) {
    console.error('❌ Erro detalhado:', error);
    if (error?.cause) {
      return res.status(400).json({ error: error.message, details: error.cause });
    }
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

router.post('/notificacoes', async (req, res) => {
  try {
    const { id, topic } = req.query;

    if (topic === 'payment') {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id });
      console.log('🔔 Notificação de pagamento recebida:', { id: paymentInfo.id, status: paymentInfo.status, amount: paymentInfo.transaction_amount, fee: paymentInfo.fee_details.find(f => f.type === 'marketplace_fee')?.amount || 0, seller_amount: paymentInfo.transaction_details.net_received_amount });
      // Aqui você processaria a notificação
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Erro ao processar notificação:', error);
    res.status(500).send('Erro ao processar notificação');
  }
});

// REMOVENDO a parte que inicia o servidor aqui
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
// });

module.exports = router; // ✅ Exportando o router NO FINAL