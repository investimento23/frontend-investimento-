// Função para fazer o investimento
function investir() {
  const telefone = document.getElementById('telefone').value;
  const valor = document.getElementById('valor').value;

  // Verifica se o valor é maior que 100
  if (valor < 100) {
    document.getElementById('mensagem').innerText = "Valor mínimo para investir é 100 MZN.";
    return;
  }

  // Faz o envio de dados para o backend (substituir com seu link real)
  fetch('https://bony-boiled-pigeon.glitch.me/investir', {  // Substitua com o link correto do backend
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ telefone, valor }),  // Envia os dados de telefone e valor
  })
  .then(response => response.json())  // Quando o backend responder
  .then(data => {
    // Exibe a resposta do backend, no caso a referência de investimento
    if (data.sucesso) {
      document.getElementById('mensagem').innerText = `Investimento realizado com sucesso. Referência: ${data.referencia}`;
    } else {
      document.getElementById('mensagem').innerText = 'Erro ao realizar o investimento. Tente novamente.';
    }
  })
  .catch(error => {
    document.getElementById('mensagem').innerText = 'Erro ao realizar investimento.';
    console.error('Error:', error);  // Exibe o erro no console
  });
}

// Função para adicionar o botão do PayPal
function initPayPal() {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: document.getElementById('valor').value  // Valor a ser pago com PayPal
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Pagamento aprovado: ' + details.payer.name.given_name);
        // Enviar os detalhes do pagamento para o backend, se necessário
      });
    }
  }).render('#paypal-button-container');
}

// Inicia o botão PayPal ao carregar a página
window.onload = function() {
  initPayPal();
};
