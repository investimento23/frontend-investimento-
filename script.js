const API_URL = "https://bony-boiled-pigeon.glitch.me";

function investir() {
  const telefone = document.getElementById("telefone").value.trim();
  const valor = parseFloat(document.getElementById("valor").value.trim());
  const mensagem = document.getElementById("mensagem");

  if (!telefone || isNaN(valor) || valor < 100) {
    mensagem.textContent = "Por favor, preencha todos os campos corretamente. Valor mínimo é 100 MZN.";
    mensagem.style.color = "red";
    return;
  }

  fetch(`${API_URL}/investir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telefone, valor })
  })
    .then(res => res.json())
    .then(data => {
      if (data.sucesso) {
        mensagem.innerHTML = `Código de referência enviado por SMS. Use este código: <strong>${data.referencia}</strong>`;
        mensagem.style.color = "green";
        gerarBotaoPayPal(valor);
      } else {
        mensagem.textContent = "Erro ao processar investimento.";
        mensagem.style.color = "red";
      }
    })
    .catch(() => {
      mensagem.textContent = "Erro de conexão com o servidor.";
      mensagem.style.color = "red";
    });
}

function gerarBotaoPayPal(valor) {
  const container = document.getElementById("paypal-button-container");
  container.innerHTML = ""; // Limpa botões anteriores

  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: (valor / 63).toFixed(2) // conversão aproximada para USD
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function () {
        alert("Pagamento PayPal efetuado com sucesso!");
      });
    }
  }).render("#paypal-button-container");
}

// Botão Txuna
document.querySelector(".especial").addEventListener("click", () => {
  alert("Txuna ativado! Continue investindo para ganhar mais.");
});
