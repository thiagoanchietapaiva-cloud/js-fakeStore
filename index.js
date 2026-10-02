let produtos = [];

const lista = document.getElementById('cards');
let produtosOriginais = [];
const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');
const selectCategoria = document.getElementById('Categorias');
const selectOrdenacao = document.getElementById('Ordenacao');
let carrinho = [];

function carregarProdutos(listaProdutos) {
    const html = listaProdutos.map(prod => {
        return `
      <div class="bg-white rounded shadow p-4" title="${prod.title}">
        <div class="relative">
          <img src="${prod.image}" class="h-56 w-full object-contain">
          <div class="p-2 bg-green-950 text-white font-bold absolute top-3 left-3 rounded">${prod.rating.rate}</div>
        </div>
        <div class="pt-4">
          <h2 class="text-xl font-bold truncate">${prod.title}</h2>
          <h6 class="text-gray-600">${prod.category}</h6>
          <h6 class="text-right text-2xl font-bold">$ ${prod.price.toFixed(2)}</h6>
          <button class="mx-auto flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded font-bold hover:bg-green-700 mt-4 w-full max-w-[200px]" onclick="adicionarAoCarrinho(${prod.id})">
          + Carrinho <box-icon name='cart' color="white"></box-icon></button>
        </div>
      </div>
        `;
    }).join('');

    lista.innerHTML = html;
}

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(produtos => {
        produtosOriginais = produtos;
        carregarProdutos(produtosOriginais);
    });

function filtrarProdutos() {
    const termoBusca = inputBusca.value.toLowerCase();
    const categoriaSelecionada = selectCategoria.value;
    const ordenacaoSelecionada = selectOrdenacao.value;

    let resultado = [...produtosOriginais];

    if (categoriaSelecionada !== "") {
        resultado = resultado.filter(prod => prod.category === categoriaSelecionada);
    }

    if (termoBusca !== "") {
        resultado = resultado.filter(prod => prod.title.toLowerCase().includes(termoBusca));
    }

    if (ordenacaoSelecionada === "preco") {
        resultado.sort((a, b) => a.price - b.price);
    } else if (ordenacaoSelecionada === "nota") {
        resultado.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    carregarProdutos(resultado);

}
btnBusca.addEventListener('click', filtrarProdutos);
selectCategoria.addEventListener('change', filtrarProdutos);
selectOrdenacao.addEventListener('change', filtrarProdutos);
inputBusca.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') filtrarProdutos();
});

