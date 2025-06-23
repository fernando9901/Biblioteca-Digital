const mongoose = require('mongoose');

const emprestimoSchema = new mongoose.Schema({
  livro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livro',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  dataEmprestimo: {
    type: Date,
    default: Date.now
  },
  dataDevolucaoPrevista: {
    type: Date,
    required: true
  },
  dataDevolucaoReal: Date,
  status: {
    type: String,
    enum: ['ativo', 'finalizado', 'atrasado'],
    default: 'ativo'
  }
}, { timestamps: true });

// Atualizar status para atrasado se passar da data prevista
emprestimoSchema.pre('save', function(next) {
  if (this.status === 'ativo' && this.dataDevolucaoPrevista < new Date()) {
    this.status = 'atrasado';
  }
  next();
});

module.exports = mongoose.model('Emprestimo', emprestimoSchema);