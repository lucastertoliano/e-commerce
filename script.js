console.log('Jordan Shoes')

const formatCurrency = (number) => {
  return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
    })
}

const getProducts = async () => {
    const response = await fetch('js/products.json')
    const data = await response.json()
    return data
}

const generateCard = async () => {

    const products = await getProducts()

    products.map(product => {
        let card = document.createElement('div')
        card.classList.add('card__produto')
        
        card.innerHTML = `
        <figure>
            <img src="images/${product.image}" alt="${product.product_name}" />
        </figure>

        <div class="card__produto_detalhes">
            <h4>${product.product_name}</h4>
            <h5>${product.product_model}</h5>
        </div>

        <h6>R$ ${product.price}</h6>
        `

        const listaProdutos = document.querySelector('.lista__produtos')
        listaProdutos.appendChild(card)

    })
   
}
generateCard()

// .produto.js

const produtos = [
    {
        id: 1,
        nome: "Tênis Adidas Adizero Adios Pro 4 Feminino - Branco e Preto",
        categoria: "Tênis de corrida",
        preco: "R$1.999,99",
        imagem: "assets/Tênis Adidas Adizero Adios Pro 4 Feminino - Branco+Preto.png",
        descricao: "Este tênis de corrida oferece o melhor em tecnologia e conforto para seus treinos e competições. Com amortecimento responsivo e um design leve, ele te impulsiona para frente a cada passada."
    },
    {
        id: 2,
        nome: "Tênis Asics Gel Nimbus 27 Masculino - Preto",
        categoria: "Tênis de corrida",
        preco: "R$1.079,99",
        imagem: "assets/Tênis Asics Gel Nimbus 27 Masculino - Preto.png",
        descricao: "O Asics Gel Nimbus 27 é sinônimo de conforto máximo. Ideal para longas distâncias, sua tecnologia de amortecimento em GEL absorve o impacto com maestria."
    },
    {
        id: 3,
        nome: "Tênis Fila Float Maxxi 2 Pro Masculino - Laranja e Azul",
        categoria: "Tênis de corrida",
        preco: "R$854,99",
        imagem: "assets/Tênis Fila Float Maxxi 2 Pro Masculino - Laranja+Azul.png",
        descricao: "Com a tecnologia Float, este tênis da Fila proporciona uma sensação de leveza e responsividade incríveis, otimizando sua performance na corrida."
    },
    {
        id: 4,
        nome: "Tênis Hoka Torrent 3 Masculino - Azul",
        categoria: "Tênis de corrida",
        preco: "R$749,99",
        imagem: "assets/Tênis Hoka Torrent 3 Masculino - Azul.png",
        descricao: "Perfeito para trilhas desafiadoras, o Hoka Torrent 3 oferece aderência excepcional e amortecimento leve para uma corrida ágil e segura em qualquer terreno."
    },
    {
        id: 5,
        nome: "Tênis New Balance Fresh Foam X 1080 V14 Masculino - Cinza e Azul",
        categoria: "Tênis de corrida",
        preco: "R$1.299,99",
        imagem: "assets/Tênis New Balance Fresh Foam X 1080 V14 Masculino - Cinza+Azul.png",
        descricao: "O Fresh Foam X 1080 V14 é o auge do conforto para corredores. Sua espuma macia e responsiva garante uma passada suave, ideal para treinos diários e longas distâncias."
    },
    {
        id: 6,
        nome: "Tênis Olympikus Corre Supra Unissex - Verde Limão",
        categoria: "Tênis de corrida",
        preco: "R$949,99",
        imagem: "assets/Tênis Olympikus Corre Supra Unissex - Verde Limão.png",
        descricao: "Desenvolvido com tecnologia de ponta, o Olympikus Corre Supra foi feito para velocidade. Sua placa de propulsão oferece o máximo de retorno de energia para quebrar seus recordes."
    }
];

// .detalhes.js

window.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const produtoId = params.get('id');

    
    const produto = produtos.find(p => p.id == produtoId);

    if (produto) {
    
        const imagemProduto = document.getElementById('imagem-produto');
        const nomeProduto = document.getElementById('nome-produto');
        const categoriaProduto = document.getElementById('categoria-produto');
        const precoProduto = document.getElementById('preco-produto');
        const descricaoProduto = document.getElementById('descricao-produto');

    
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
        nomeProduto.innerText = produto.nome;
        categoriaProduto.innerText = produto.categoria;
        precoProduto.innerText = produto.preco;
        descricaoProduto.innerText = produto.descricao;

    } else {

        document.querySelector('.produto__detalhes').innerHTML = '<h1>Produto não encontrado!</h1>';
    }
});
