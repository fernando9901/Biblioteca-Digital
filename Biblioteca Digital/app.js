require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

// Importar rotas
const livroRoutes = require('./routes/livroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');

// Configurar app
const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
require('./config/db');

// Configurar Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/emprestimos', emprestimoRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.render('pages/dashboard');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});