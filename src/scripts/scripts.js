//HEADER_____________________________________________
const HEADER = document.querySelector("#header");

let headerContent = `
        <nav class="header_nav">
            <!-- Add/remover classe header_usuario--active conforme usuário logado -->
            <div class="header_usuario header_usuario--active">
                <div class="header_user">
                    <a href="/src/pages/login.cadastro/login.html" class="header_login">Entrar / Cadastro</a>
                    <div class="header_user-menu">
                        <label for="user_menu"><img src="/src/images/icon/user.png" class="header_user-icon"
                                alt="Menu Usuário"></label>
                        <input type="checkbox" name="user_menu" id="user_menu">
                        <ul class="header_show-menu">
                            <a href="/src/pages/produto/pedidos.html">
                                <li>MEUS PEDIDOS</li>
                            </a>
                            <a href="/src/pages/perfil/meu-perfil.html">
                                <li>MINHAS INFORMAÇÕES</li>
                            </a>
                            <a href="/src/pages/produto/listprod.html">
                                <li>PRODUTOS</li>
                            </a>
                            <a href="/index.html">
                                <li>SAIR</li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="/src/pages/shop/shop.html" class="header_carrinho">
                <img src="/src/images/icon/bag.png" alt="Carrinho de Compras">
                <span>Shop</span>
            </a>
        </nav>
        <div class="header_logo">
            <a href="/index.html" class="header_logo-link">
                <img src="/src/images/soccer_store_logo_c.png" alt="The Soccer Store">
            </a>
        </div>
        `;

HEADER.innerHTML = headerContent;

//FOOTER_____________________________________________
let footerContent = `
<div class="newsletter">
<div class="newsletter_holder container">
    <form action="" method="get" class="newsletter_form form">
        <h2 class="newsletter_title">Cadastre-se e receba <strong>novidades</strong> e
            <strong>ofertas</strong>!
        </h2>
        <input type="email" name="email_news" id="email_news" placeholder="seuemail@exemplo.com" required />

        <select name="select" required>
            <option value="" disabled selected>Escolha seu time</option>
            <option value="corinthians">Corinthians</option>
            <option value="palmeiras">Palmeiras</option>
            <option value="santos">Santos</option>
            <option value="saopaulo">São Paulo</option>
        </select>

        <input type="submit" value="Receber Novidades" />

    </form>
</div>
</div>
<!-- Fim Newsletter -->

<!-- Inicio Footer -->
<footer class="footer" id="footer">
<div class="footer_info">
    <ul>
        <h2>Área do Cliente</h2>
        <li><a href="/src/pages/login.cadastro/login.html">Login / Cadastro</a></li>
        <li><a href="/src/pages/pedidos/pedidos.html">Meus Pedidos</a></li>
        <li><a href="/src/pages/perfil/meu-perfil.html">Minhas Informações</a></li>
    </ul>
    <ul class="footer_contato">
        <h2>Contato</h2>
        <li class="footer_email"><a
                href="mailto:atendimento@thesoccerstore.com">atendimento@thesoccerstore.com</a>
        </li>
        <li class="footer_fone"><a href="tel:11999999999">(11) 99999 9999</a></li>
        <li class="footer_endereco">Rua Agostinho Gomes, 1326<br>
            Ipiranga - São Paulo/SP</li>
    </ul>
</div>

<div class="footer_direitos">
    Copyright © 2025 <strong>The Soccers Store Ltda.</strong> Todos os direitos reservados.
</div>
</footer>
<!-- Fim Footer -->
`;
const FOOTER = document.querySelector("#footer");
FOOTER.innerHTML = footerContent;
