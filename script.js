const produtos = [
    {
        id: 1,
        nome: "Tênis Adidas Adizero Adios Pro 4 Feminino - Branco e Preto",
        categoria: "Corrida",
        preco: "R$1.999,99",
        imagem: "assets/Tênis Adidas Adizero Adios Pro 4 Feminino - Branco+Preto.png",
        descricao: "Este tênis de corrida oferece o melhor em tecnologia e conforto para seus treinos e competições. Com amortecimento responsivo e um design leve, ele te impulsiona para frente a cada passada."
    },
    {
        id: 2,
        nome: "Tênis Asics Gel Nimbus 27 Masculino - Preto",
        categoria: "Corrida",
        preco: "R$1.079,99",
        imagem: "assets/Tênis Asics Gel Nimbus 27 Masculino - Preto.png",
        descricao: "O Asics Gel Nimbus 27 é sinônimo de conforto máximo. Ideal para longas distâncias, sua tecnologia de amortecimento em GEL absorve o impacto com maestria."
    },
    {
        id: 3,
        nome: "Tênis Fila Float Maxxi 2 Pro Masculino - Laranja e Azul",
        categoria: "Corrida",
        preco: "R$854,99",
        imagem: "assets/Tênis Fila Float Maxxi 2 Pro Masculino - Laranja+Azul.png",
        descricao: "Com a tecnologia Float, este tênis da Fila proporciona uma sensação de leveza e responsividade incríveis, otimizando sua performance na corrida."
    },
    {
        id: 4,
        nome: "Tênis Hoka Torrent 3 Masculino - Azul",
        categoria: "Trilha",
        preco: "R$749,99",
        imagem: "assets/Tênis Hoka Torrent 3 Masculino - Azul.png",
        descricao: "Perfeito para trilhas desafiadoras, o Hoka Torrent 3 oferece aderência excepcional e amortecimento leve para uma corrida ágil e segura em qualquer terreno."
    },
    {
        id: 5,
        nome: "Tênis New Balance Fresh Foam X 1080 V14 Masculino - Cinza e Azul",
        categoria: "Casual",
        preco: "R$1.299,99",
        imagem: "assets/Tênis New Balance Fresh Foam X 1080 V14 Masculino - Cinza+Azul.png",
        descricao: "O Fresh Foam X 1080 V14 é o auge do conforto para corredores. Sua espuma macia e responsiva garante uma passada suave, ideal para treinos diários e longas distâncias."
    },
    {
        id: 6,
        nome: "Tênis Olympikus Corre Supra Unissex - Verde Limão",
        categoria: "Performance",
        preco: "R$949,99",
        imagem: "assets/Tênis Olympikus Corre Supra Unissex - Verde Limão.png",
        descricao: "Desenvolvido com tecnologia de ponta, o Olympikus Corre Supra foi feito para velocidade. Sua placa de propulsão oferece o máximo de retorno de energia para quebrar seus recordes."
    }
];

document.addEventListener('DOMContentLoaded', () => {

    class Carrinho {
        constructor() {
            this.carrinho = JSON.parse(localStorage.getItem('carrinhoFastShoes')) || [];
            this.elementos = {
                abrirBtn: document.getElementById('abrir-carrinho-btn'),
                fecharBtn: document.getElementById('fechar-carrinho-btn'),
                sidebar: document.getElementById('carrinho-sidebar'),
                overlay: document.getElementById('overlay'),
                corpo: document.getElementById('carrinho-corpo'),
                totalEl: document.getElementById('total-carrinho-sidebar'),
                contagemEl: document.getElementById('contagem-carrinho'),
            };
        }

        init() {
            this.configurarEventListeners();
            this.renderizar();
        }

        configurarEventListeners() {
            if (this.elementos.abrirBtn) {
                this.elementos.abrirBtn.addEventListener('click', () => this.abrir());
            }
            if (this.elementos.fecharBtn) {
                this.elementos.fecharBtn.addEventListener('click', () => this.fechar());
            }
            if (this.elementos.overlay) {
                this.elementos.overlay.addEventListener('click', () => this.fechar());
            }
            if (this.elementos.corpo) {
                this.elementos.corpo.addEventListener('click', (e) => {
                    if (e.target.classList.contains('aumentar-qtd')) this.atualizarQuantidade(e.target.dataset.id, 1);
                    if (e.target.classList.contains('diminuir-qtd')) this.atualizarQuantidade(e.target.dataset.id, -1);
                    if (e.target.classList.contains('remover-item-sidebar')) this.removerItem(e.target.dataset.id);
                });
            }
        }

        abrir() {
            if (this.elementos.sidebar) this.elementos.sidebar.classList.add('is-open');
            if (this.elementos.overlay) this.elementos.overlay.classList.add('is-open');
        }

        fechar() {
            if (this.elementos.sidebar) this.elementos.sidebar.classList.remove('is-open');
            if (this.elementos.overlay) this.elementos.overlay.classList.remove('is-open');
        }

        adicionarItem(id) {
            const idNumerico = parseInt(id);
            const itemExistente = this.carrinho.find(item => item.id === idNumerico);
            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                this.carrinho.push({ id: idNumerico, quantidade: 1 });
            }
            this.salvarErenderizar();
            this.abrir();
        }

        atualizarQuantidade(id, mudanca) {
            const idNumerico = parseInt(id);
            const item = this.carrinho.find(item => item.id === idNumerico);
            if (item) {
                item.quantidade += mudanca;
                if (item.quantidade <= 0) this.removerItem(id);
                else this.salvarErenderizar();
            }
        }

        removerItem(id) {
            const idNumerico = parseInt(id);
            this.carrinho = this.carrinho.filter(item => item.id !== idNumerico);
            this.salvarErenderizar();
        }

        salvarErenderizar() {
            localStorage.setItem('carrinhoFastShoes', JSON.stringify(this.carrinho));
            this.renderizar();
        }

        renderizar() {
            const corpo = this.elementos.corpo;
            if (!corpo) return;
            corpo.innerHTML = '';
            let total = 0;

            if (this.carrinho.length === 0) {
                corpo.innerHTML = '<p class="carrinho-vazio-msg">Seu carrinho está vazio.</p>';
            } else {
                this.carrinho.forEach(item => {
                    const produto = produtos.find(p => p.id === item.id);
                    if (!produto) return;

                    const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.'));
                    total += item.quantidade * precoNumerico;

                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'carrinho-item-sidebar';
                    itemDiv.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <div class="carrinho-item-info-sidebar">
                        <h4>${produto.nome}</h4>
                        <p>${produto.preco}</p>
                        <div class="carrinho-quantidade-sidebar">
                            <button class="diminuir-qtd" data-id="${item.id}">-</button>
                            <span>${item.quantidade}</span>
                            <button class="aumentar-qtd" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remover-item-sidebar" data-id="${item.id}">Remover</button>
                `;
                    corpo.appendChild(itemDiv);
                });
            }

            const formatadorMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
            if (this.elementos.totalEl) this.elementos.totalEl.textContent = formatadorMoeda.format(total);

            const totalItens = this.carrinho.reduce((acc, item) => acc + item.quantidade, 0);
            if (this.elementos.contagemEl) this.elementos.contagemEl.textContent = totalItens;
        }
    }

    // Instância global do carrinho
    const sistemaCarrinho = new Carrinho();
    document.addEventListener('DOMContentLoaded', () => sistemaCarrinho.init());

    sistemaCarrinho.init();

    const secaoDetalhes = document.querySelector('.produto__detalhes');

    if (secaoDetalhes) {
        console.log("✅ OK: Bloco da página de detalhes encontrado.");

        const params = new URLSearchParams(window.location.search);
        const produtoId = parseInt(params.get('id'));
        const produto = produtos.find(p => p.id === produtoId);

        if (produto) {
            console.log("✅ OK: Produto encontrado:", produto);


            document.getElementById('imagem-produto').src = produto.imagem;
            document.getElementById('nome-produto').innerText = produto.nome;

            document.getElementById('descricao-produto').innerText = produto.descricao;
            const btnAdicionar = secaoDetalhes.querySelector('.botao button');

            if (btnAdicionar) {
                console.log("✅ OK: Botão 'Adicionar ao carrinho' encontrado.");
                btnAdicionar.addEventListener('click', () => {
                    console.log("➡️ CLIQUE: Adicionando produto com ID:", produtoId);
                    sistemaCarrinho.adicionarItem(produtoId);
                    alert('Produto adicionado! (Teste)');
                });
            } else {
                console.error("❌ ERRO: O botão 'Adicionar ao carrinho' não foi encontrado! Verifique se a estrutura HTML tem a div com class='botao' envolvendo o button.");
            }
        } else {
            console.error("❌ ERRO: Produto não encontrado! Verifique se a URL tem o '?id=' correto (ex: ?id=1).");
        }
    }

    // === API de CEP ===
    const cepInput = document.getElementById('cep');
    const buscarCepBtn = document.querySelector('.frete button');
    const ruaInput = document.getElementById('rua');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const enderecoResultado = document.getElementById('endereco-resultado');
    const messageEl = document.getElementById('message');
    const numeroInput = document.getElementById('numero');


    cepInput.addEventListener('input', () => {
        let valor = cepInput.value.replace(/\D/g, ""); // remove tudo que não é número
        if (valor.length > 5) {
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
        }
        cepInput.value = valor;
    });

    cepInput.addEventListener('keyup', () => {
        const cep = cepInput.value.replace(/\D/g, "");
        if (cep.length === 8) {
            buscarCepBtn.click(); // dispara a busca automaticamente
        }
    });

    if (buscarCepBtn) {
        buscarCepBtn.addEventListener('click', async () => {
            const cep = cepInput.value.replace(/\D/g, "");
            if (cep.length !== 8) {
                messageEl.textContent = "❌ CEP inválido!";
                enderecoResultado.style.display = "none";
                return;
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    messageEl.textContent = "❌ CEP não encontrado!";
                    enderecoResultado.style.display = "none";
                    return;
                }

                // Preenche os campos
                ruaInput.value = data.logradouro;
                bairroInput.value = data.bairro;
                cidadeInput.value = data.localidade;
                estadoInput.value = data.uf;

                enderecoResultado.style.display = "block";
                messageEl.textContent = "✅ Endereço encontrado!";

                if (numeroInput) numeroInput.focus(); // acessibilidade
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                messageEl.textContent = "❌ Erro ao consultar o CEP!";
                enderecoResultado.style.display = "none";
            }
        });
    }
});