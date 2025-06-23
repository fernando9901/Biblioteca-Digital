const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro na conexão com MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;