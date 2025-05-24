document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector("form.form");
  if (form) {
    form.addEventListener("submit", loginUsuario);
  }
});

const API_BASE_URL = "http://127.0.0.1:5000";

function loginUsuario(event) {
  event.preventDefault();
  var btnEntrar = document.querySelector("input[type='submit']");
  btnEntrar.disabled = true;
  var originalText = btnEntrar.value;
  btnEntrar.value = "Carregando...";
  var email = document.getElementById("email-login").value.trim();
  var senha = document.getElementById("senha-login").value;
  if (!email || !senha) {
    exibirMensagem("Preencha todos os campos.");
    btnEntrar.disabled = false;
    btnEntrar.value = originalText;
    return;
  }
  var data = { email: email, senha: senha };
  fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (!response.ok) throw new Error("Usuário ou senha inválidos");
      return response.json();
    })
    .then(function (result) {
      if (result.success) {
        window.location.href = "../../../index.html";
      } else {
        exibirMensagem(result.error || "Usuário ou senha inválidos");
      }
    })
    .catch(function (err) {
      exibirMensagem(err.message || "Erro ao conectar com o servidor");
    })
    .finally(function () {
      btnEntrar.disabled = false;
      btnEntrar.value = originalText;
    });
}

function exibirMensagem(msg) {
  var div = document.createElement("div");
  div.textContent = msg;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.background = "#e53935";
  div.style.color = "#fff";
  div.style.padding = "12px 24px";
  div.style.borderRadius = "8px";
  div.style.zIndex = "9999";
  document.body.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 3000);
}
