const Usuario = require('../models/Usuario');

module.exports = {
  // Listar usuários
  async listarUsuarios(req, res) {
    try {
      const usuarios = await Usuario.find().lean();
      res.render('pages/usuarios/listar', { usuarios });
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao buscar usuários' });
    }
  },

  // Cadastrar usuário
  async cadastrarUsuario(req, res) {
    try {
      const usuario = new Usuario(req.body);
      await usuario.save();
      res.redirect('/usuarios');
    } catch (err) {
      res.status(400).render('pages/usuarios/cadastrar', {
        errors: Object.values(err.errors).map(e => e.message),
        formData: req.body
      });
    }
  },

  // Desativar usuário
  async desativarUsuario(req, res) {
    try {
      await Usuario.findByIdAndUpdate(req.params.id, { ativo: false });
      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao desativar usuário' });
    }
  }
};