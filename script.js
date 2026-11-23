const transacoes = [
  { id: 1, descricao: "Recital de violino no salão", valor: 180, tipo: "receita" },
  { id: 2, descricao: "Jogo de cordas para violino", valor: 42, tipo: "despesa" },
  { id: 3, descricao: "Livros em francês e caderno de notas", valor: 36, tipo: "despesa" },
  { id: 4, descricao: "Aula particular de leitura e análise", valor: 95, tipo: "receita" },
  { id: 5, descricao: "Café e ensaio de filosofia", valor: 18, tipo: "despesa" }
];

let filtroAtual = "todas";

const corpoTabela = document.querySelector("#corpo-tabela");
const totalEntradasEl = document.querySelector("#total-entradas");
const totalSaidasEl = document.querySelector("#total-saidas");
const saldoLiquidoEl = document.querySelector("#saldo-liquido");
const botoesFiltro = document.querySelectorAll(".botao-filtro");

function formatarMoeda(valor) {
  return `${valor.toFixed(2).replace(".", ",")} €`;
}

function obterTransacoesFiltradas() {
  if (filtroAtual === "receita") {
    return transacoes.filter((item) => item.tipo === "receita");
  }
  if (filtroAtual === "despesa") {
    return transacoes.filter((item) => item.tipo === "despesa");
  }
  return transacoes.filter(() => true);
}

function atualizarTotais(listaBase) {
  const entradas = listaBase
    .filter((item) => item.tipo === "receita")
    .reduce((acumulador, item) => acumulador + item.valor, 0);

  const saidas = listaBase
    .filter((item) => item.tipo === "despesa")
    .reduce((acumulador, item) => acumulador + item.valor, 0);

  const saldo = listaBase.reduce((acumulador, item) => {
    return item.tipo === "receita" ? acumulador + item.valor : acumulador - item.valor;
  }, 0);

  totalEntradasEl.textContent = formatarMoeda(entradas);
  totalSaidasEl.textContent = formatarMoeda(saidas);
  saldoLiquidoEl.textContent = formatarMoeda(saldo);
}

function renderizarDashboard() {
  const itensVisiveis = obterTransacoesFiltradas();

  const linhasHTML = itensVisiveis.map((item) => {
    const rotuloTipo = item.tipo === "receita" ? "Receita" : "Despesa";
    return `
      <tr>
        <td>${item.descricao}</td>
        <td>${rotuloTipo}</td>
        <td>${formatarMoeda(item.valor)}</td>
      </tr>
    `;
  });

  corpoTabela.innerHTML = linhasHTML.join("");
  atualizarTotais(transacoes);
}

for (const botao of botoesFiltro) {
  botao.addEventListener("click", function () {
    filtroAtual = botao.dataset.filtro;

    for (const itemBotao of botoesFiltro) {
      itemBotao.classList.remove("ativo");
    }
    botao.classList.add("ativo");

    renderizarDashboard();
  });
}

renderizarDashboard();