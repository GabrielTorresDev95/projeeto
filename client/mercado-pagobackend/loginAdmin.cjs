// loginAdmin.cjs

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || 'SEU_SEGREDO_SEGURO';

// ✅ Criação correta do pool de conexão
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password', // substitua pela sua senha do MySQL
  database: 'databasePF' // substitua pelo nome do seu banco
});

// 🔐 Rota de Login de Administrador
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Busca o administrador pelo nome (ajuste conforme a coluna real)
    const [admins] = await pool.execute('SELECT * FROM admins WHERE nome = ?', [username]);
    const admin = admins[0];

    if (!admin) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha enviada com a armazenada (já hash)
    const passwordMatch = await bcrypt.compare(password, admin.senha);

    if (passwordMatch) {
      const token = jwt.sign(
        { adminId: admin.id, username: admin.nome },
        jwtSecret,
        { expiresIn: '1h' }
      );
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;
