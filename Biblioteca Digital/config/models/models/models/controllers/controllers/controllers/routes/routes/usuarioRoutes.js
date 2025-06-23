const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// Rotas para usuários
router.get('/', UsuarioController.listarUsuarios);
router.get('/cadastrar', UsuarioController.mostrarFormCadastro);
router.post('/cadastrar', UsuarioController.cadastrarUsuario);
router.post('/:id/desativar', UsuarioController.desativarUsuario);

module.exports = router;