// Validação de formulário
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form[needs-validation]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });
});

// Confirmação para deletar
document.querySelectorAll('.btn-delete').forEach(button => {
  button.addEventListener('click', function(e) {
    if (!confirm('Tem certeza que deseja excluir?')) {
      e.preventDefault();
    }
  });
});