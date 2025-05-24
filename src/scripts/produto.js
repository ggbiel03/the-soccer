// Objeto com informações das camisetas
const camisas = {
  corinthians1: {
    nome: 'Camisa Corinthians I 24/25 s/n° Torcedor Nike Masculina',
    descricao: 'A nova camisa do Corinthians para a temporada 24/25, modelo torcedor, feita pela Nike. Conforto, tradição e tecnologia para os apaixonados pelo Timão.',
    preco: '344,99',
    precoParcelado: '369,99',
    parcelas: '7',
    imagem: '/src/images/produto/corinthians.jpg',
    banner: '/src/images/banner/corinthians.png',
    escudo: '/src/images/escudos/corinthians.svg',
    clube: 'Corinthians SP',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Nike'
  },
  corinthians2: {
    nome: 'Camisa Corinthians Pré-Jogo 25/25 s/n° Nike Masculina',
    descricao: 'Camisa pré-jogo do Corinthians para 25/25, perfeita para os momentos de aquecimento. Design moderno e tecido leve.',
    preco: '354,99',
    precoParcelado: '379,99',
    parcelas: '7',
    imagem: '/src/images/produto/corinthians2.jpg',
    banner: '/src/images/banner/corinthians.png',
    escudo: '/src/images/escudos/corinthians.svg',
    clube: 'Corinthians SP',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Nike'
  },
  palmeiras1: {
    nome: 'Camisa Palmeiras Torcedora HOME 25/25 s/n° Puma Masculina',
    descricao: 'A camisa oficial do Verdão para a temporada 25/25, modelo torcedora, feita pela Puma. Mostre sua paixão pelo Palmeiras!',
    preco: '314,99',
    precoParcelado: '349,99',
    parcelas: '7',
    imagem: '/src/images/produto/palmeiras.jpg',
    banner: '/src/images/banner/palmeiras.png',
    escudo: '/src/images/escudos/palmeiras.svg',
    clube: 'Palmeiras',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Puma'
  },
  palmeiras2: {
    nome: 'Camisa Palmeiras Torcedor HOME 25/25 s/n° Puma Masculina',
    descricao: 'Camisa HOME do Palmeiras, modelo torcedor, para a temporada 25/25. Conforto e tradição em cada detalhe.',
    preco: '314,99',
    precoParcelado: '349,99',
    parcelas: '7',
    imagem: '/src/images/produto/palmeiras2.jpg',
    banner: '/src/images/banner/palmeiras.png',
    escudo: '/src/images/escudos/palmeiras.svg',
    clube: 'Palmeiras',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Puma'
  },
  santos1: {
    nome: 'Camisa Santos Jogador 23/23 s/n° Umbro Masculina',
    descricao: 'Camisa oficial do Santos, modelo jogador, para a temporada 23/23. Feita pela Umbro, ideal para os torcedores do Peixe.',
    preco: '319,99',
    precoParcelado: '349,99',
    parcelas: '8',
    imagem: '/src/images/produto/santos.jpg',
    banner: '/src/images/banner/santos.png',
    escudo: '/src/images/escudos/santos.svg',
    clube: 'Santos',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Umbro'
  },
  santos2: {
    nome: 'Camisa Santos Torcedor 25/25 s/n° Umbro Masculina',
    descricao: 'Camisa torcedor do Santos para 25/25, feita pela Umbro. Perfeita para mostrar seu amor pelo Peixe.',
    preco: '339,99',
    precoParcelado: '369,99',
    parcelas: '7',
    imagem: '/src/images/produto/santos2.jpg',
    banner: '/src/images/banner/santos.png',
    escudo: '/src/images/escudos/santos.svg',
    clube: 'Santos',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'Umbro'
  },
  saopaulo1: {
    nome: 'Camisa Torcedor SPFC 24/24 s/n° Masculina New Balance',
    descricao: 'Camisa oficial do São Paulo FC, modelo torcedor, para a temporada 24/24. Produzida pela New Balance.',
    preco: '299,99',
    precoParcelado: '319,99',
    parcelas: '7',
    imagem: '/src/images/produto/saopaulo.jpg',
    banner: '/src/images/banner/sao_paulo.png',
    escudo: '/src/images/escudos/saopaulo.svg',
    clube: 'São Paulo',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'New Balance'
  },
  saopaulo2: {
    nome: 'Camisa Jogador Home SPFC 25/25 s/n° Masculina New Balance',
    descricao: 'Camisa jogador Home do São Paulo FC para 25/25, feita pela New Balance. Qualidade e tradição para o torcedor.',
    preco: '399,99',
    precoParcelado: '499,99',
    parcelas: '7',
    imagem: '/src/images/produto/saopaulo2.jpg',
    banner: '/src/images/banner/sao_paulo.png',
    escudo: '/src/images/escudos/saopaulo.svg',
    clube: 'São Paulo',
    genero: 'Masculino',
    gola: 'Gola Careca',
    material: 'Poliéster',
    manga: 'Manga Curta',
    marca: 'New Balance'
  }
};

// Busca a camisa selecionada do localStorage
const camisaSelecionada = JSON.parse(localStorage.getItem('camisaSelecionada'));

if (camisaSelecionada) {
    document.querySelectorAll('.produto_nome').forEach(el => el.textContent = camisaSelecionada.nome);
    document.querySelector('.produto_descricao').textContent = camisaSelecionada.descricao;
    document.querySelector('.produto_preco').textContent = 'R$ ' + camisaSelecionada.preco + ' no Pix';
    document.querySelector('.produto_parcelado').textContent = 'ou R$ ' + camisaSelecionada.precoParcelado + ' em até ' + camisaSelecionada.parcelas + 'x';
    const img = document.querySelector('.produto_imagem');
    if (img && camisaSelecionada.imagem) {
        img.setAttribute('src', '../../.' + camisaSelecionada.imagem);
        img.setAttribute('alt', camisaSelecionada.nome);
    }
    
    // Define as Características do Produto na página
    document.getElementById('spec-nome').textContent = camisas[camisaSelecionada.id].nome;
    document.getElementById('spec-clube').textContent = camisas[camisaSelecionada.id].clube;
    document.getElementById('spec-genero').textContent = camisas[camisaSelecionada.id].genero;
    document.getElementById('spec-gola').textContent = camisas[camisaSelecionada.id].gola;
    document.getElementById('spec-material').textContent = camisas[camisaSelecionada.id].material;
    document.getElementById('spec-manga').textContent = camisas[camisaSelecionada.id].manga;
    document.getElementById('spec-marca').textContent = camisas[camisaSelecionada.id].marca;
}

// Atualiza a div pedido_detalhe dinamicamente
const pedidoDetalhe = document.querySelector('.pedido_detalhe');
if (pedidoDetalhe && camisaSelecionada) {
    pedidoDetalhe.innerHTML = `
        <h3 class="pedido_produto">${camisaSelecionada.nome}</h3>
        <div class="pedido_quantidade">Quantidade: <span>${camisaSelecionada.quantidade}</span></div>
        <div class="pedido_valor">Valor Unitário: R$ <span>${camisaSelecionada.preco}</span></div>
    `;
}

// Adiciona a quantidade selecionada ao localStorage
const quantidadeInput = document.getElementById('quantidade');
const adicionarAoCarrinhoBtn = document.getElementById('adicionarAoCarrinho');

// Ensure the selected product's details are stored in localStorage
adicionarAoCarrinhoBtn.addEventListener('click', () => {
    const quantidade = parseInt(quantidadeInput.value, 10) || 1;
    const produtoId = adicionarAoCarrinhoBtn.dataset.produtoId; // Assuming a data attribute for product ID
    const produto = camisas[produtoId]; // Retrieve product details from the camisas object

    if (produto) {
        const camisaSelecionada = {
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidade
        };
        localStorage.setItem('camisaSelecionada', JSON.stringify(camisaSelecionada));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const camisaSelecionada = JSON.parse(localStorage.getItem('camisaSelecionada'));

    if (camisaSelecionada) {
        // Atualiza a div pedido_detalhe
        const pedidoDetalhe = document.querySelector('.pedido_detalhe');
        if (pedidoDetalhe) {
            pedidoDetalhe.innerHTML = `
                <h3 class="pedido_produto">${camisaSelecionada.nome}</h3>
                <div class="pedido_quantidade">Quantidade: <span>${camisaSelecionada.quantidade}</span></div>
                <div class="pedido_valor">Valor Unitário: R$ <span>${parseFloat(camisaSelecionada.preco.replace(',', '.')).toFixed(2)}</span></div>
            `;
        }

        // Atualiza o resumo do pedido
        const subtotal = camisaSelecionada.quantidade * parseFloat(camisaSelecionada.preco.replace(',', '.'));
        const frete = 50; // Valor fixo do frete
        const total = subtotal + frete;

        document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
        document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
    } else {
        // Caso não haja produto selecionado, exibe valores zerados
        document.getElementById('subtotal').textContent = 'R$ 0.00';
        document.getElementById('total').textContent = 'R$ 50.00'; // Apenas o frete

        const pedidoDetalhe = document.querySelector('.pedido_detalhe');
        if (pedidoDetalhe) {
            pedidoDetalhe.innerHTML = '<p>Nenhum produto selecionado.</p>';
        }
    }
});

// Reutiliza as variáveis já declaradas
if (adicionarAoCarrinhoBtn && quantidadeInput) {
    adicionarAoCarrinhoBtn.addEventListener('click', () => {
        const quantidade = parseInt(quantidadeInput.value, 10) || 1;
        const produtoId = adicionarAoCarrinhoBtn.dataset.produtoId; // ID do produto
        const produto = camisas[produtoId]; // Busca o produto no objeto camisas

        if (produto) {
            const camisaSelecionada = {
                nome: produto.nome,
                preco: produto.preco,
                quantidade: quantidade
            };
            localStorage.setItem('camisaSelecionada', JSON.stringify(camisaSelecionada));

            // Redireciona para a página de checkout
            window.location.href = '/src/pages/pedidos/checkout.html';
        }
    });
}