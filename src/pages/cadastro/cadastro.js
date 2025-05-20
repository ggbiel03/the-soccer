document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form-cadastro");
  if (form) {
    form.addEventListener("submit", handleCadastroSubmit); // Adiciona o evento de envio no JavaScript
  }

  // Verifica se existe um usuário admin ao carregar a página
  fetch("http://127.0.0.1:5000/checkAdmin", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      console.log("Resposta do back-end:", data); // Log para depuração
      if (data.exists) {
        // Remove a opção admin se já existir um usuário admin
        var adminOption = document.querySelector(
          "select[name='estado'] option[value='admin']"
        );
        if (adminOption) {
          adminOption.remove();
          console.log("Opção 'Admin' removida do select.");
        } else {
          console.warn("Opção 'Admin' não encontrada no select.");
        }
      }
    })
    .catch(function (error) {
      console.error("Erro ao verificar usuário admin:", error);
    });
});

function handleCadastroSubmit(event) {
  event.preventDefault(); // Impede o recarregamento da página
  var form = event.target;
  var formData = new FormData(form);
  var data = {
    email: formData.get("email-cadastro"),
    senha: formData.get("senha-cadastro"),
    nome: formData.get("nome"),
    perfil: formData.get("estado"), // Obtém o valor do campo 'estado'
  };

  // Chamada à API para criar usuário
  fetch("http://127.0.0.1:5000/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "cors",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      // Exibe mensagem na tela ao criar usuário
      exibirMensagem("Usuário criado");
      console.log("Usuário criado:", result);
      setTimeout(function () {
        window.location.href = "../login/login.html";
      }, 2000); // Aguarda 2s antes de redirecionar
    })
    .catch(function (error) {
      exibirMensagem("Erro ao criar usuário");
      console.error("Erro ao criar usuário:", error);
    });
}

function exibirMensagem(msg) {
  var div = document.createElement("div");
  div.textContent = msg;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.background = "#4caf50";
  div.style.color = "#fff";
  div.style.padding = "12px 24px";
  div.style.borderRadius = "8px";
  div.style.zIndex = "9999";
  document.body.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 3000);
}
