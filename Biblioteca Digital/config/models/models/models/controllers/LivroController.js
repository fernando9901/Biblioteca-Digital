const Livro = require('../models/Livro');

module.exports = {
  // Listar todos os livros com paginação
  async listarLivros(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const livros = await Livro.find()
        .skip(skip)
        .limit(limit)
        .lean();

      const count = await Livro.countDocuments();

      res.render('pages/livros/listar', {
        livros,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        hasNextPage: page * limit < count,
        hasPreviousPage: page > 1
      });
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao buscar livros' });
    }
  },

  // Mostrar formulário de cadastro
  mostrarFormCadastro(req, res) {
    res.render('pages/livros/cadastrar');
  },

  // Cadastrar novo livro
  async cadastrarLivro(req, res) {
    try {
      const { titulo, autor, isbn, categoria, ano } = req.body;
      const livro = new Livro({ titulo, autor, isbn, categoria, ano });
      await livro.save();
      res.redirect('/livros');
    } catch (err) {
      res.status(400).render('pages/livros/cadastrar', {
        errors: Object.values(err.errors).map(e => e.message),
        formData: req.body
      });
    }
  },

  // Mostrar formulário de edição
  async mostrarFormEdicao(req, res) {
    try {
      const livro = await Livro.findById(req.params.id).lean();
      res.render('pages/livros/editar', { livro });
    } catch (err) {
      res.status(404).render('error', { message: 'Livro não encontrado' });
    }
  },

  // Atualizar livro
  async atualizarLivro(req, res) {
    try {
      const { id } = req.params;
      await Livro.findByIdAndUpdate(id, req.body);
      res.redirect('/livros');
    } catch (err) {
      res.status(400).render('pages/livros/editar', {
        errors: Object.values(err.errors).map(e => e.message),
        livro: req.body
      });
    }
  },

  // Deletar livro
  async deletarLivro(req, res) {
    try {
      await Livro.findByIdAndDelete(req.params.id);
      res.redirect('/livros');
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao deletar livro' });
    }
  }
};