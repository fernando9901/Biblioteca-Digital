const express = require('express');
const router = express.Router();
const LivroController = require('../controllers/LivroController');

// Rotas para livros
router.get('/', LivroController.listarLivros);
router.get('/cadastrar', LivroController.mostrarFormCadastro);
router.post('/cadastrar', LivroController.cadastrarLivro);
router.get('/:id/editar', LivroController.mostrarFormEdicao);
router.post('/:id/editar', LivroController.atualizarLivro);
router.post('/:id/deletar', LivroController.deletarLivro);

module.exports = router;