// Lista de camisas (pode ser expandida conforme necessário)
const listaCamisas = [
  {
    id: 'corinthians1',
    nome: 'Camisa Corinthians I 24/25 s/n° Torcedor Nike Masculina',
    descricao: 'A nova camisa do Corinthians para a temporada 24/25, modelo torcedor, feita pela Nike. Conforto, tradição e tecnologia para os apaixonados pelo Timão.',
    preco: '344,99',
    precoParcelado: '369,99',
    parcelas: '7',
    imagem: '/src/images/produto/corinthians.jpg'    
  },
  {
    id: 'corinthians2',
    nome: 'Camisa Corinthians Pré-Jogo 25/25 s/n° Nike Masculina',
    descricao: 'Camisa pré-jogo do Corinthians para 25/25, perfeita para os momentos de aquecimento. Design moderno e tecido leve.',
    preco: '354,99',
    precoParcelado: '379,99',
    parcelas: '7',
    imagem: '/src/images/produto/corinthians2.jpg'
  },
  {
    id: 'palmeiras1',
    nome: 'Camisa Palmeiras Torcedora HOME 25/25 s/n° Puma Masculina',
    descricao: 'A camisa oficial do Verdão para a temporada 25/25, modelo torcedora, feita pela Puma. Mostre sua paixão pelo Palmeiras!',
    preco: '314,99',
    precoParcelado: '349,99',
    parcelas: '7',
    imagem: '/src/images/produto/palmeiras.jpg'
  },
  {
    id: 'palmeiras2',
    nome: 'Camisa Palmeiras Torcedor HOME 25/25 s/n° Puma Masculina',
    descricao: 'Camisa HOME do Palmeiras, modelo torcedor, para a temporada 25/25. Conforto e tradição em cada detalhe.',
    preco: '314,99',
    precoParcelado: '349,99',
    parcelas: '7',
    imagem: '/src/images/produto/palmeiras2.jpg'
  },
  {
    id: 'santos1',
    nome: 'Camisa Santos Jogador 23/23 s/n° Umbro Masculina',
    descricao: 'Camisa oficial do Santos, modelo jogador, para a temporada 23/23. Feita pela Umbro, ideal para os torcedores do Peixe.',
    preco: '319,99',
    precoParcelado: '349,99',
    parcelas: '8',
    imagem: '/src/images/produto/santos.jpg'
  },
  {
    id: 'santos2',
    nome: 'Camisa Santos Torcedor 25/25 s/n° Umbro Masculina',
    descricao: 'Camisa torcedor do Santos para 25/25, feita pela Umbro. Perfeita para mostrar seu amor pelo Peixe.',
    preco: '339,99',
    precoParcelado: '369,99',
    parcelas: '7',
    imagem: '/src/images/produto/santos2.jpg'
  },
  {
    id: 'saopaulo1',
    nome: 'Camisa Torcedor SPFC 24/24 s/n° Masculina New Balance',
    descricao: 'Camisa oficial do São Paulo FC, modelo torcedor, para a temporada 24/24. Produzida pela New Balance.',
    preco: '299,99',
    precoParcelado: '319,99',
    parcelas: '7',
    imagem: '/src/images/produto/saopaulo.jpg'
  },
  {
    id: 'saopaulo2',
    nome: 'Camisa Jogador Home SPFC 25/25 s/n° Masculina New Balance',
    descricao: 'Camisa jogador Home do São Paulo FC para 25/25, feita pela New Balance. Qualidade e tradição para o torcedor.',
    preco: '399,99',
    precoParcelado: '499,99',
    parcelas: '7',
    imagem: '/src/images/produto/saopaulo2.jpg'
  }
];

// Salva a lista de camisas no localStorage apenas se ainda não existir
if (!localStorage.getItem('todasCamisas')) {
  localStorage.setItem('todasCamisas', JSON.stringify(listaCamisas));
}

const camisetas = document.querySelectorAll('.camiseta-item');

camisetas.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const camisa = {
            id: this.getAttribute('data-id'),
            nome: this.querySelector('.produtos_nome').textContent.trim(),
            preco: this.querySelector('.valor-produto').textContent.trim(),
            precoParcelado: this.querySelector('.valor-parcelado').textContent.trim(),
            parcelas: this.querySelector('.parcelas').textContent.trim(),
            imagem: this.querySelector('.produtos_imagem').getAttribute('src'),
            descricao: this.querySelector('.produtos_nome').textContent.trim()
        };
        localStorage.setItem('camisaSelecionada', JSON.stringify(camisa));
        window.location.href = '/src/pages/produto/produto.html';
    });
});