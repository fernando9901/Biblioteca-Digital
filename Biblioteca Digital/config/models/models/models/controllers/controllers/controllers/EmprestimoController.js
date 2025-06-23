const Emprestimo = require('../models/Emprestimo');
const Livro = require('../models/Livro');
const Usuario = require('../models/Usuario');

module.exports = {
  // Registrar empréstimo
  async registrarEmprestimo(req, res) {
    try {
      const { livroId, usuarioId } = req.body;
      
      // Verificar se o livro está disponível
      const livro = await Livro.findById(livroId);
      if (!livro.disponivel) {
        throw new Error('Livro não disponível para empréstimo');
      }

      // Calcular data de devolução (7 dias a partir de hoje)
      const dataDevolucaoPrevista = new Date();
      dataDevolucaoPrevista.setDate(dataDevolucaoPrevista.getDate() + 7);

      // Criar empréstimo
      const emprestimo = new Emprestimo({
        livro: livroId,
        usuario: usuarioId,
        dataDevolucaoPrevista
      });

      // Atualizar status do livro
      livro.disponivel = false;
      await livro.save();
      await emprestimo.save();

      res.redirect('/emprestimos');
    } catch (err) {
      res.status(400).render('pages/emprestimos/registrar', {
        error: err.message
      });
    }
  },

  // Finalizar empréstimo
  async finalizarEmprestimo(req, res) {
    try {
      const emprestimo = await Emprestimo.findById(req.params.id);
      
      // Atualizar empréstimo
      emprestimo.dataDevolucaoReal = new Date();
      emprestimo.status = 'finalizado';
      await emprestimo.save();

      // Liberar livro
      await Livro.findByIdAndUpdate(emprestimo.livro, { disponivel: true });

      res.redirect('/emprestimos');
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao finalizar empréstimo' });
    }
  },

  // Listar empréstimos ativos
  async listarEmprestimos(req, res) {
    try {
      const emprestimos = await Emprestimo.find({ status: 'ativo' })
        .populate('livro')
        .populate('usuario')
        .lean();

      res.render('pages/emprestimos/listar', { emprestimos });
    } catch (err) {
      res.status(500).render('error', { message: 'Erro ao buscar empréstimos' });
    }
  }
};