// === listprod-integrado.js ===
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('listprod.html')) return;

  const modal = document.getElementById('modalForm');
  const btnOpen = document.getElementById('btnOpenModal');
  const btnClose = document.querySelectorAll('#btnCloseModal');
  const form = document.getElementById('camisetaForm');

  let editIndex = null;
  window.camisetas = window.camisetas || [];

  function preencherFormulario(camiseta) {
    form['camisetaNome'].value = camiseta.nome;
    form['camisetaTime'].value = camiseta.time;
    form['camisetaTipo'].value = camiseta.tipo;
    form['camisetaPreco'].value = camiseta.preco;
    form['camisetaEstoque'].value = camiseta.estoque;
    form['camisetaImagem'].value = camiseta.imagem;
    form['camisetaDestaque'].checked = camiseta.destaque;
  }

  window.editarCamiseta = function(index) {
    const camiseta = camisetas[index];
    if (!camiseta) return;
    preencherFormulario(camiseta);
    editIndex = index;
    modal.style.display = 'flex';
  };

  window.excluirCamiseta = function(index) {
    if (confirm('Deseja excluir esta camiseta?')) {
      camisetas.splice(index, 1);
      if (typeof render === 'function') render();
    }
  };

  btnOpen?.addEventListener('click', () => {
    form.reset();
    editIndex = null;
    modal.style.display = 'flex';
  });

  btnClose.forEach(btn => {
    btn.addEventListener('click', () => modal.style.display = 'none');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nova = {
      nome: form['camisetaNome'].value,
      time: form['camisetaTime'].value,
      tipo: form['camisetaTipo'].value,
      preco: parseFloat(form['camisetaPreco'].value),
      estoque: parseInt(form['camisetaEstoque'].value),
      imagem: form['camisetaImagem'].value || '',
      destaque: form['camisetaDestaque'].checked
    };

    if (editIndex !== null) {
      camisetas[editIndex] = nova;
    } else {
      camisetas.push(nova);
    }

    modal.style.display = 'none';
    if (typeof render === 'function') render();
  });
});

// === listprod-tabela.js ===
document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('listprod.html')) return;

  window.camisetas = [
    {
      nome: 'Camisa Corinthians I 2023',
      time: 'Corinthians',
      tipo: 'Titular',
      preco: 289.90,
      estoque: 30,
      destaque: true,
      imagem: '/src/images/produto/corinthians.jpg',
    },
    {
      nome: 'Camisa Corinthians II 2023',
      time: 'Corinthians',
      tipo: 'Reserva',
      preco: 279.90,
      estoque: 28,
      destaque: false,
      imagem: '/src/images/produto//corinthians2.jpg',
    },
    {
      nome: 'Camisa Palmeiras I 2023',
      time: 'Palmeiras',
      tipo: 'Titular',
      preco: 289.90,
      estoque: 35,
      destaque: true,
      imagem: '/src/images/produto/palmeiras.jpg',
    },
    {
      nome: 'Camisa Palmeiras II 2023',
      time: 'Palmeiras',
      tipo: 'Reserva',
      preco: 279.90,
      estoque: 29,
      destaque: false,
      imagem: '/src/images/produto/palmeiras2.jpg',
    },
    {
      nome: 'Camisa Santos I 2023',
      time: 'Santos',
      tipo: 'Titular',
      preco: 269.90,
      estoque: 20,
      destaque: true,
      imagem: '/src/images/produto/santos.jpg',
    },
    {
      nome: 'Camisa Santos II 2023',
      time: 'Santos',
      tipo: 'Reserva',
      preco: 259.90,
      estoque: 18,
      destaque: false,
      imagem: '/src/images/produto/santos2.jpg',
    },
    {
      nome: 'Camisa São Paulo I 2023',
      time: 'São Paulo',
      tipo: 'Titular',
      preco: 289.90,
      estoque: 33,
      destaque: true,
      imagem: '/src/images/produto/saopaulo.jpg',
    },
    {
      nome: 'Camisa São Paulo II 2023',
      time: 'São Paulo',
      tipo: 'Reserva',
      preco: 279.90,
      estoque: 26,
      destaque: false,
      imagem: '/src/images/produto/saopaulo2.jpg',
    }
  ];

  const tableBody = document.getElementById('camisetaTableBody');
  const countSpan = document.getElementById('camisetaCount');
  const filterSelect = document.getElementById('filterSelect');
  const filterTime = document.getElementById('filterTime');
  const searchInput = document.getElementById('searchInput');

  window.render = function () {
    const tipoFiltro = filterSelect?.value || '';
    const timeFiltro = filterTime?.value || '';
    const busca = searchInput?.value.toLowerCase() || '';

    tableBody.innerHTML = '';
    let count = 0;

    camisetas.forEach((c, i) => {
      const tipoClass = 'lp-tipo-' + c.tipo.replace(/\s+/g, '-');

      const correspondeTipo = !tipoFiltro || c.tipo === tipoFiltro;
      const correspondeTime = !timeFiltro || c.time === timeFiltro;
      const correspondeBusca = !busca || c.nome.toLowerCase().includes(busca);

      if (correspondeTipo && correspondeTime && correspondeBusca) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${c.imagem || '/src/images/produto/placeholder.jpg'}" alt="${c.nome}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;"></td>
          <td>${c.nome}</td>
          <td>${c.time}</td>
          <td><span class="lp-tag ${tipoClass}">${c.tipo}</span></td>
          <td><strong>R$ ${c.preco.toFixed(2)}</strong></td>
          <td>${c.estoque}</td>
          <td style="color:${c.destaque ? 'green' : 'red'}">${c.destaque ? '✓' : '✕'}</td>
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

  filterSelect?.addEventListener('change', () => render());
  filterTime?.addEventListener('change', () => render());
  searchInput?.addEventListener('input', () => render());

  render();
});