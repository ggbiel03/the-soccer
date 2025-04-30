const LOGIN = document.querySelector("#login");
const CADASTRO = document.querySelector("#cadastro");
const SENHA = document.querySelector("#senha-form");
let cadastreSe = document.querySelector("#cadastrese");
let voltarLogin = document.querySelectorAll(".voltar-login");
let esqueciSenha = document.querySelector("#esqueci");

function showForm(e) {
    e.classList.add("login_form--active");
    e.classList.remove("login_form--inactive");
};

function hideForm(e) {
    e.classList.remove("login_form--active");
    e.classList.add("login_form--inactive");
}

cadastreSe.addEventListener("click", () => {
    hideForm(LOGIN);
    showForm(CADASTRO);
});

esqueciSenha.addEventListener("click", () => {
    hideForm(LOGIN);
    showForm(SENHA);
});

voltarLogin.forEach(e => e.addEventListener("click", () => {    
    showForm(LOGIN);
    hideForm(e.closest(".login_form"));
}));
