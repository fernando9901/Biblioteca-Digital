const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  telefone: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(\d{10,11})$/.test(v);
      },
      message: 'Telefone inválido'
    }
  },
  tipo: {
    type: String,
    enum: ['estudante', 'professor', 'administrador'],
    default: 'estudante'
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);