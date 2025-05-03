const backendURL = "https://bony-boiled-pigeon.glitch.me";

document.getElementById("form-investir").addEventListener("submit", async (e) => {
  e.preventDefault();

  const telefone = document.getElementById("telefone").value.trim();
  const valor = document.getElementById("valor").value.trim();

  if (!telefone || !valor || Number(valor) < 100) {
    alert("Digite um número válido e valor mínimo de 100 MZN.");
    return;
  }

  const res = await fetch(`${backendURL}/investir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telefone, valor })
  });

  const data = await res.json();

  if (data.sucesso) {
    alert(`Investimento criado. Referência: ${data.referencia}`);
    document.getElementById("paypal-button-container").style.display = "block";
  } else {
    alert("Erro ao criar investimento.");
  }
});

// PayPal
paypal.Buttons({
  createOrder: function(data, actions) {
    const valor = document.getElementById("valor").value.trim();
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: (valor / 63).toFixed(2) // Conversão estimada MZN para USD
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert("Pagamento feito com sucesso por " + details.payer.name.given_name);
    });
  }
}).render("#paypal-button-container");
