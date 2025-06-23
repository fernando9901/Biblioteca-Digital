const express = require('express');
const router = express.Router();
const EmprestimoController = require('../controllers/EmprestimoController');

// Rotas para empréstimos
router.get('/', EmprestimoController.listarEmprestimos);
router.post('/registrar', EmprestimoController.registrarEmprestimo);
router.post('/:id/finalizar', EmprestimoController.finalizarEmprestimo);

module.exports = router;