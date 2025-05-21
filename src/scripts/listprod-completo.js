// === listprod-integrado.js ===
document.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.pathname.includes("listprod.html")) return;

  const modal = document.getElementById("modalForm");
  const btnOpen = document.getElementById("btnOpenModal");
  const btnClose = document.querySelectorAll("#btnCloseModal");
  const form = document.getElementById("camisetaForm");

  let editIndex = null;
  window.camisetas = window.camisetas || [];

  // Mapeamento das variáveis para caminhos de imagem
  const mapaImagens = {
    corinthians1: "/src/images/produto/corinthians.jpg",
    corinthians2: "/src/images/produto/corinthians2.jpg",
    corinthians3: "/src/images/produto/corinthians3.jpg",
    palmeiras1: "/src/images/produto/palmeiras.jpg",
    palmeiras2: "/src/images/produto/palmeiras2.jpg",
    santos1: "/src/images/produto/santos.jpg",
    santos2: "/src/images/produto/santos2.jpg",
    saopaulo1: "/src/images/produto/saopaulo.jpg",
    saopaulo2: "/src/images/produto/saopaulo2.jpg",
  };

  // Atualiza a URL para o endpoint correto para listar camisetas
  const API_LIST_URL = "http://localhost:5000/listarCamisetas";

  // Buscar camisetas do backend ao carregar a página
  try {
    const resp = await fetch(API_LIST_URL);
    if (resp.ok) {
      const camisetasBackend = await resp.json();
      if (Array.isArray(camisetasBackend) && camisetasBackend.length > 0) {
        window.camisetas = camisetasBackend;
      }
    }
  } catch (e) {
    console.error("Erro ao buscar camisetas: ", e);
    // Se der erro, mantém os dados locais
  }

  function preencherFormulario(camiseta) {
    form["camisetaNome"].value = camiseta.nome;
    form["camisetaTime"].value = camiseta.time;
    form["camisetaPreco"].value = camiseta.preco;
    form["camisetaEstoque"].value = camiseta.estoque;
    if (form["camisetaImagemVar"]) {
      form["camisetaImagemVar"].value = camiseta.imagemVar || "";
      // Atualiza a prévia ao editar
      if (mapaImagens[camiseta.imagemVar]) {
        previewImagem.src = mapaImagens[camiseta.imagemVar];
        previewImagem.style.display = "block";
      } else {
        previewImagem.src = "";
        previewImagem.style.display = "none";
      }
    }
    form["camisetaDestaque"].checked = camiseta.destaque;
  }

  window.editarCamiseta = function (index) {
    const camiseta = camisetas[index];
    if (!camiseta) return;
    preencherFormulario(camiseta);
    editIndex = index;
    modal.style.display = "flex";
  };

  window.excluirCamiseta = function (index) {
    if (confirm("Deseja excluir esta camiseta?")) {
      camisetas.splice(index, 1);
      if (typeof render === "function") render();
    }
  };

  btnOpen?.addEventListener("click", () => {
    form.reset();
    editIndex = null;
    modal.style.display = "flex";
  });

  btnClose.forEach((btn) => {
    btn.addEventListener("click", () => (modal.style.display = "none"));
  });

  // Adiciona pré-visualização da imagem ao selecionar a variável
  const selectImagemVar = document.getElementById("camisetaImagemVar");
  const previewImagem = document.getElementById("previewImagem");
  if (selectImagemVar && previewImagem) {
    selectImagemVar.addEventListener("change", function () {
      const valor = selectImagemVar.value;
      if (mapaImagens[valor]) {
        previewImagem.src = mapaImagens[valor];
        previewImagem.style.display = "block";
      } else {
        previewImagem.src = "";
        previewImagem.style.display = "none";
      }
    });
  }

  // Atualiza a URL para o endpoint correto
  const API_URL = "http://localhost:5000/cadastrarCamiseta";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nova = {
      nome: form["camisetaNome"].value,
      time: form["camisetaTime"].value,
      preco: parseFloat(form["camisetaPreco"].value),
      estoque: parseInt(form["camisetaEstoque"].value),
      imagemVar: form["camisetaImagemVar"].value, // variável da camisa
      imagem: mapaImagens[form["camisetaImagemVar"].value] || "", // caminho real
      destaque: form["camisetaDestaque"].checked,
      descricao: form["descricao"].value, // Adiciona a descrição
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nova),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao cadastrar");
      }
    } catch (err) {
      alert("Erro ao cadastrar: " + err.message);
    }

    if (editIndex !== null) {
      camisetas[editIndex] = nova;
    } else {
      camisetas.push(nova);
    }

    modal.style.display = "none";
    if (typeof render === "function") render();

    if (nova.destaque) {
      window.location.href = "/index.html";
    }
  });
});

// Adiciona função para abrir o modal de adicionar camiseta
function abrirModalAdicionarCamiseta() {
  const form = document.getElementById("camisetaForm");
  const modal = document.getElementById("modalForm");

  if (form && modal) {
    form.reset(); // Reseta o formulário
    modal.style.display = "flex"; // Exibe o modal
  }
}

// === listprod-tabela.js ===
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("listprod.html")) return;

  const tableBody = document.getElementById("camisetaTableBody");
  const countSpan = document.getElementById("camisetaCount");
  const filterSelect = document.getElementById("filterSelect");
  const filterTime = document.getElementById("filterTime");
  const searchInput = document.getElementById("searchInput");

  window.render = function () {
    const tipoFiltro = filterSelect?.value || "";
    const timeFiltro = filterTime?.value || "";
    const busca = searchInput?.value.toLowerCase() || "";

    tableBody.innerHTML = "";
    let count = 0;

    camisetas.forEach((c, i) => {
      const tipoClass =
        "lp-tipo-" + (c.tipo ? c.tipo.replace(/\s+/g, "-") : "indefinido");

      const correspondeTipo = !tipoFiltro || c.tipo === tipoFiltro;
      const correspondeTime = !timeFiltro || c.time === timeFiltro;
      const correspondeBusca = !busca || c.nome.toLowerCase().includes(busca);

      if (correspondeTipo && correspondeTime && correspondeBusca) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${
            c.imagem || "/src/images/produto/placeholder.jpg"
          }" alt="${
          c.nome
        }" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"></td>
          <td>${c.nome}</td>
          <td>${c.time}</td>
          <td><span class="lp-tag ${tipoClass}">${c.tipo}</span></td>
          <td><strong>R$ ${c.preco.toFixed(2)}</strong></td>
          <td>${c.estoque}</td>
          <td style="color:${c.destaque ? "green" : "red"}">${
          c.destaque ? "✓" : "✕"
        }</td>
          <td>
            <button class="lp-btn lp-btn-edit" onclick="editarCamiseta(${i})">✏️</button>
            <button class="lp-btn lp-btn-del" onclick="excluirCamiseta(${i})">🗑️</button>
          </td>
        `;
        tableBody.appendChild(row);
        count++;
      }
    });

    countSpan.textContent = count;
  };

  filterSelect?.addEventListener("change", () => render());
  filterTime?.addEventListener("change", () => render());
  searchInput?.addEventListener("input", () => render());

  render();
});
