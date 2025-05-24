// === LISTAGEM ESTÁTICA DE CAMISAS ===
document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.pathname.includes("listprod.html")) return;

  const tableBody = document.getElementById("camisetaTableBody");
  const countSpan = document.getElementById("camisetaCount");

  // Lista estática de camisas conforme as páginas existentes
  const camisasEstaticas = [
    {
      nome: "Camisa Corinthians I 24/25",
      time: "Corinthians",
      preco: 314.99,
      estoque: 10,
      destaque: true,
      imagem: "/src/images/produto/corinthians.jpg",
    },
    {
      nome: "Camisa Corinthians II 24/25",
      time: "Corinthians",
      preco: 319.99,
      estoque: 10,
      destaque: false,
      imagem: "/src/images/produto/corinthians2.jpg",
    },
    {
      nome: "Camisa Corinthians III 24/25",
      time: "Corinthians",
      preco: 329.99,
      estoque: 10,
      destaque: false,
      imagem: "/src/images/produto/corinthians3.jpg",
    },
    {
      nome: "Camisa Palmeiras I 24/25",
      time: "Palmeiras",
      preco: 309.99,
      estoque: 10,
      destaque: true,
      imagem: "/src/images/produto/palmeiras.jpg",
    },
    {
      nome: "Camisa Palmeiras II 25/25",
      time: "Palmeiras",
      preco: 315.99,
      estoque: 10,
      destaque: false,
      imagem: "/src/images/produto/palmeiras2.jpg",
    },
    {
      nome: "Camisa Santos I 24/25",
      time: "Santos",
      preco: 304.99,
      estoque: 10,
      destaque: true,
      imagem: "/src/images/produto/santos.jpg",
    },
    {
      nome: "Camisa Santos II 25/25",
      time: "Santos",
      preco: 339.99,
      estoque: 10,
      destaque: false,
      imagem: "/src/images/produto/santos2.jpg",
    },
    {
      nome: "Camisa São Paulo I 24/24",
      time: "São Paulo",
      preco: 299.99,
      estoque: 10,
      destaque: true,
      imagem: "/src/images/produto/saopaulo.jpg",
    },
    {
      nome: "Camisa São Paulo II 25/25",
      time: "São Paulo",
      preco: 399.99,
      estoque: 10,
      destaque: false,
      imagem: "/src/images/produto/saopaulo2.jpg",
    },
  ];

// --- FILTRO POR TIME E BUSCA ---
  const filterTime = document.getElementById("filterTime");
  const searchInput = document.getElementById("searchInput");

  // Preencher opções do filtro de times dinamicamente
  if (filterTime) {
    // Adiciona a opção 'Todos' (vazia)
    filterTime.innerHTML = '<option value="">Todos</option>';
    // Coleta times únicos
    const timesUnicos = [...new Set(camisasEstaticas.map(c => c.time))];
    timesUnicos.forEach(time => {
      const opt = document.createElement('option');
      opt.value = time;
      opt.textContent = time;
      filterTime.appendChild(opt);
    });
  }

  function renderCamisas() {
    tableBody.innerHTML = "";
    let filtroTime = filterTime ? filterTime.value : "";
    let busca = searchInput ? searchInput.value.toLowerCase() : "";
    let count = 0;
    camisasEstaticas.forEach((c, idx) => {
      const correspondeTime = !filtroTime || c.time === filtroTime;
      const correspondeBusca = !busca || c.nome.toLowerCase().includes(busca);
      if (correspondeTime && correspondeBusca) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${c.imagem}" alt="${c.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"></td>
          <td>${c.nome}</td>
          <td>${c.time}</td>
          <td><strong>R$ ${c.preco.toFixed(2)}</strong></td>
          <td>${c.estoque}</td>
          <td style="color:${c.destaque ? "green" : "red"}">${c.destaque ? "✓" : "✕"}</td>
          <td>
            <button class="lp-btn lp-btn-del" data-index="${idx}">Excluir 🗑️</button>
          </td>
        `;
        tableBody.appendChild(row);
        count++;
      }
    });
    countSpan.textContent = count;
  }

  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("lp-btn-del")) {
      const idx = parseInt(e.target.getAttribute("data-index"), 10);
      if (!isNaN(idx)) {
        if (confirm(`Deseja realmente excluir a camisa "${camisasEstaticas[idx].nome}"?`)) {
          camisasEstaticas.splice(idx, 1);
          renderCamisas();
        }
      }
    }
  });

  if (filterTime) filterTime.addEventListener("change", renderCamisas);
  if (searchInput) searchInput.addEventListener("input", renderCamisas);

  renderCamisas();
});

// ================== CÓDIGO ORIGINAL (AGORA COMENTADO) ==================
/*
document.addEventListener("DOMContentLoaded", async () => {
  if (!window.location.pathname.includes("listprod.html")) return;

  const modal = document.getElementById("modalForm");
  const btnOpen = document.getElementById("btnOpenModal");
  const btnClose = document.querySelectorAll("#btnCloseModal");
  const form = document.getElementById("camisetaForm");

  let editIndex = null;
  window.camisetas = window.camisetas || [];

  // Atualiza o mapa de imagens para garantir os caminhos corretos
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
        } else {
          window.camisetas = []; // Garante que a lista seja limpa se não houver dados
        }
      } else {
        console.error("Erro ao buscar camisetas: ", resp.statusText);
        window.camisetas = [];
      }
    } catch (e) {
      console.error("Erro ao buscar camisetas: ", e);
      window.camisetas = [];
    }

    if (typeof render === "function") {
      render(); // Atualiza a interface com os dados carregados
    }
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
    if (!camiseta) {
      console.error("Camiseta não encontrada para edição.");
      return;
    }
    preencherFormulario(camiseta);
    editIndex = index;

    // Garante que o modal seja exibido
    const modal = document.getElementById("modalForm");
    if (modal) {
      modal.style.display = "flex";
    } else {
      console.error("Modal de edição não encontrado.");
    }
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

    const data = {
      nome,
      time,
      preco,
      estoque,
      imagemVar,
      destaque,
      tamanhosDisponiveis,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/cadastrarCamiseta`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Erro ao adicionar a camiseta. Tente novamente mais tarde."
        );
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
            body: JSON.stringify({
              nome,
              time,
              preco,
              estoque,
              imagemVar,
              tamanhosDisponiveis: data.tamanhosDisponiveis,
            }),
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
    const timeFiltro = filterTime?.value || "";
    const busca = searchInput?.value.toLowerCase() || "";

    tableBody.innerHTML = "";
    let count = 0;

    camisetas.forEach((c, i) => {
      const correspondeTime = !timeFiltro || c.time === timeFiltro;
      const correspondeBusca = !busca || c.nome.toLowerCase().includes(busca);

      if (correspondeTime && correspondeBusca) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${
            c.imagem || "/src/images/produto/placeholder.jpg"
          }" alt="${
          c.nome
        }" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"></td>
          <td>${c.nome}</td>
          <td>${c.time}</td>
          <td><strong>R$ ${c.preco.toFixed(2)}</strong></td>
          <td>${c.estoque}</td>
          <td style="color:${c.destaque ? "green" : "red"}">${
          c.destaque ? "✓" : "✕"
        }</td>
          <td>
            <button class="lp-btn lp-btn-edit" onclick="editarCamiseta(${i})">Editar ✏️</button>
            <button class="lp-btn lp-btn-del" onclick="excluirCamiseta(${i})">Excluir 🗑️</button>
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
  document
    .getElementById("camisetaEditForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = {
        nome: document.getElementById("editCamisetaNome").value,
        time: document.getElementById("editCamisetaTime").value,
        preco: parseFloat(document.getElementById("editCamisetaPreco").value),
        estoque: parseInt(
          document.getElementById("editCamisetaEstoque").value,
          10
        ),
        imagemVar: document.getElementById("editCamisetaImagemVar").value,
        descricao: document.getElementById("editDescricao").value,
        destaque: document.getElementById("editCamisetaDestaque").checked,
      };

      try {
        const response = await fetch(
          `${API_BASE_URL}/editarCamiseta/${camiseta.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erro ao editar a camiseta. Tente novamente mais tarde."
          );
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
        const response = await fetch(
          `${API_BASE_URL}/excluirCamiseta/${camiseta.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Erro ao excluir a camiseta. Tente novamente mais tarde."
          );
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
*/