// Helpers para Handlebars
const hbs = exphbs.create({
  helpers: {
    formatDate: function(date) {
      return new Date(date).toLocaleDateString('pt-BR');
    },
    add: function(a, b) { return a + b; },
    subtract: function(a, b) { return a - b; }
  }
});

app.engine('hbs', hbs.engine);