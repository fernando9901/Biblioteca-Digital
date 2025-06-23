const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true
  },
  autor: {
    type: String,
    required: [true, 'O autor é obrigatório']
  },
  isbn: {
    type: String,
    required: [true, 'O ISBN é obrigatório'],
    unique: true
  },
  categoria: {
    type: String,
    enum: ['Ficção', 'Técnico', 'Biografia', 'Outros'],
    default: 'Outros'
  },
  ano: {
    type: Number,
    min: [1000, 'Ano inválido'],
    max: [new Date().getFullYear(), 'Ano não pode ser no futuro']
  },
  disponivel: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Livro', livroSchema);