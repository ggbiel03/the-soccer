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

  const API_BASE_URL = "http://localhost:5000";

  // Atualiza a URL para o endpoint correto para listar camisetas
  const API_LIST_URL = `${API_BASE_URL}/listarCamisetas`;

  // Buscar camisetas do backend ao carregar a página
  async function carregarCamisetas() {
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
    if (typeof render === "function") render();
  }

  // Chama a função ao carregar a página
  carregarCamisetas();

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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = form["camisetaNome"].value.trim();
    const time = form["camisetaTime"].value;
    const preco = parseFloat(form["camisetaPreco"].value);
    const estoque = parseInt(form["camisetaEstoque"].value, 10);
    const imagemVar = form["camisetaImagemVar"].value;
    const destaque = form["camisetaDestaque"].checked;

    if (!nome || !time || isNaN(preco) || isNaN(estoque) || !imagemVar) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const tamanhosDisponiveis = Array.from(
      document.querySelectorAll('input[name="tamanho"]:checked')
    ).map((input) => input.value);

    const data = { nome, time, preco, estoque, imagemVar, destaque, tamanhosDisponiveis };

    try {
      const response = await fetch(`${API_BASE_URL}/cadastrarCamiseta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar a camiseta. Tente novamente mais tarde.");
      }

      const result = await response.json();

      if (result.success) {
        alert("Camiseta adicionada com sucesso!");
        if (destaque) {
          // Atualiza a página inicial e a página shop
          await fetch(`${API_BASE_URL}/atualizarDestaques`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, time, preco, estoque, imagemVar, tamanhosDisponiveis: data.tamanhosDisponiveis }),
          });
        }
        modal.style.display = "none";
        form.reset();
        if (typeof render === "function") render();
      } else {
        alert(result.message || "Erro ao adicionar a camiseta.");
      }
    } catch (error) {
      console.error("Erro ao adicionar a camiseta:", error);
      alert("Erro ao adicionar a camiseta. Tente novamente mais tarde.");
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

// Função para abrir o modal de edição
function abrirModalEditarCamiseta(index) {
  const camiseta = window.camisetas[index];
  if (!camiseta) return;

  // Preenche os campos do modal de edição com os dados da camiseta
  document.getElementById("editCamisetaNome").value = camiseta.nome;
  document.getElementById("editCamisetaTime").value = camiseta.time;
  document.getElementById("editCamisetaPreco").value = camiseta.preco;
  document.getElementById("editCamisetaEstoque").value = camiseta.estoque;
  document.getElementById("editCamisetaImagemVar").value = camiseta.imagemVar;
  document.getElementById("editDescricao").value = camiseta.descricao;
  document.getElementById("editCamisetaDestaque").checked = camiseta.destaque;

  // Exibe o modal de edição
  const modalEdit = document.getElementById("modalEdit");
  modalEdit.style.display = "flex";

  // Fecha o modal ao clicar no botão de cancelar
  document.getElementById("btnCloseEditModal").addEventListener("click", () => {
    modalEdit.style.display = "none";
  });

  // Salva as alterações ao enviar o formulário
  document.getElementById("camisetaEditForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      nome: document.getElementById("editCamisetaNome").value,
      time: document.getElementById("editCamisetaTime").value,
      preco: parseFloat(document.getElementById("editCamisetaPreco").value),
      estoque: parseInt(document.getElementById("editCamisetaEstoque").value, 10),
      imagemVar: document.getElementById("editCamisetaImagemVar").value,
      descricao: document.getElementById("editDescricao").value,
      destaque: document.getElementById("editCamisetaDestaque").checked,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/editarCamiseta/${camiseta.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar a camiseta. Tente novamente mais tarde.");
      }

      alert("Camiseta editada com sucesso!");
      modalEdit.style.display = "none";
      if (typeof render === "function") render();
    } catch (error) {
      console.error("Erro ao editar a camiseta:", error);
      alert("Erro ao editar a camiseta. Tente novamente mais tarde.");
    }
  });
}

// Função para excluir camiseta
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-excluir")) {
    const index = event.target.getAttribute("data-index");
    const camiseta = window.camisetas[index];

    if (confirm(`Deseja realmente excluir a camiseta ${camiseta.nome}?`)) {
      try {
        const response = await fetch(`${API_BASE_URL}/excluirCamiseta/${camiseta.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao excluir a camiseta. Tente novamente mais tarde.");
        }

        alert("Camiseta excluída com sucesso!");
        if (typeof render === "function") render();
      } catch (error) {
        console.error("Erro ao excluir a camiseta:", error);
        alert("Erro ao excluir a camiseta. Tente novamente mais tarde.");
      }
    }
  }
});