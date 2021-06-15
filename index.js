//Retorna X ou O /// OK
const jogador = function (tabuleiro) {
  let total_jogadas = 0
  for (let i = 0; i < tabuleiro.length; i++)
    for (let j = 0; j < tabuleiro[i].length; j++)
      if (tabuleiro[i][j] !== 0) total_jogadas++;

  if (total_jogadas % 2 === 0) return true
  else return false
}
//Retorna todas as jogadas disponíveis /// OK
const acoes = function (tabuleiro) {
  let jogadas_disp = [] ///jogadas disponíveis
  for (let i = 0; i < tabuleiro.length; i++)
    for (let j = 0; j < tabuleiro[i].length; j++)
      if (tabuleiro[i][j] === 0) jogadas_disp.push([i, j])
  return jogadas_disp
}
//Retorna o tabuleiro que resulta ao fazer a jogada i,j // OK
const resultado = function (tabuleiro, acao) {
  let novo_tabuleiro = [[], [], []]
  for (let i = 0; i < tabuleiro.length; i++)
    for (let j = 0; j < tabuleiro[i].length; j++)
      novo_tabuleiro[i][j] = tabuleiro[i][j]

  if (jogador(tabuleiro)) novo_tabuleiro[acao[0]][acao[1]] = 1
  else novo_tabuleiro[acao[0]][acao[1]] = -1

  return novo_tabuleiro
}

//Retorna Verdadeiro se o jogo acabou, Falso caso contrário
const final = function (tabuleiro) {
  if (Math.abs(custo(tabuleiro)) === 1 || acoes(tabuleiro).length === 0) return true
  else return false
}
//Retorna 1 se X ganhou, -1 se O ganhou, 0 caso contrário.
const custo = function (tabuleiro) {
  for (let i = 0; i < tabuleiro.length; i++)
    for (let j = 0; j < tabuleiro[i].length; j++) {
      let sum_linha = 0, sum_coluna = 0, sum_diagonal = 0, sum_diagonal2 = 0
      ///Linhas e Colunas
      sum_linha = tabuleiro[i][0] + tabuleiro[i][1] + tabuleiro[i][2]
      sum_coluna = tabuleiro[0][i] + tabuleiro[1][i] + tabuleiro[2][i]
      ///Diagonais
      if (i === j)
        sum_diagonal = tabuleiro[0][0] + tabuleiro[1][1] + tabuleiro[2][2]
      if (i === j && i === 1 || Math.abs(i - j) === 2)
        sum_diagonal2 = tabuleiro[0][2] + tabuleiro[1][1] + tabuleiro[2][0]

      if (Math.abs(sum_linha) === 3) return sum_linha / 3
      if (Math.abs(sum_coluna) === 3) return sum_coluna / 3
      if (Math.abs(sum_diagonal) === 3) return sum_diagonal / 3
      if (Math.abs(sum_diagonal2) === 3) return sum_diagonal2 / 3
    }
  return 0
}
//Retorna a jogada ótima para o jogador atual
const minimax = function (tabuleiro) {

  if (jogador(tabuleiro)) var melhor_valor = maxValor
  else var melhor_valor = minValor  

  return {jogada} = melhor_valor(tabuleiro)
}

const maxValor = function (tabuleiro) {
  let valorMax = Number.NEGATIVE_INFINITY, jogadaMax;
  acoes(tabuleiro).forEach((acao) => {
    let novo_tabuleiro = resultado(tabuleiro, acao);
    
    if (final(novo_tabuleiro)) var valor = custo(novo_tabuleiro)
    else var { valor } = minValor(novo_tabuleiro)
    if (valor > valorMax) { valorMax = valor, jogadaMax = acao }

  });
  return { valor: valorMax, jogada: jogadaMax };
}

const minValor = function (tabuleiro) {
  let valorMin = Number.POSITIVE_INFINITY, jogadaMin;

  acoes(tabuleiro).forEach((acao) => {
    let novo_tabuleiro = resultado(tabuleiro, acao);

    if (final(novo_tabuleiro)) var valor = custo(novo_tabuleiro)
    else var { valor } = maxValor(novo_tabuleiro)
    if (valor < valorMin) { valorMin = valor, jogadaMin = acao }
  });
  return { valor : valorMin, jogada : jogadaMin };
}
const ganhador = function (tabuleiro){
  if(custo(tabuleiro) === 0) return
  if(custo(tabuleiro) === 1) document.querySelector("#player1").innerHTML = `Player ${map[1]} : ${++vitorias[0]}`
  else document.querySelector("#player2").innerHTML = `Player ${map[-1]} : ${++vitorias[1]}`
}
const jogadaIA = function (tabuleiro){
  let {jogada} = minimax(tabuleiro)
  return tabuleiro = resultado(tabuleiro, jogada)
}
////
const atualizarhtml = function () {
  var i = 0, j = 0;
  jdvelha.childNodes.forEach((linha) => {
    if (linha.className === "linha") {
      j = 0;
      linha.childNodes.forEach((celula) => {
        if (celula.className === "cell") {
          celula.innerHTML = map[tabuleiro[i][j]];
          celula.style.backgroundColor = "white";
          j++;
        }
      });
      i++;
    }
  });
  ganhador(tabuleiro)
}

var tabuleiro =
  [[0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]]

var map = {
  "-1": "O",
  "1": "X",
  "0": ""
};
var vitorias = [0, 0]
var jxj = false
////Html
const jdvelha = document.querySelector("#jogo-da-velha");
const rematchbtn = document.querySelector("#rematch");
const checkbox = document.querySelector("#myonoffswitch")
///Eventos
rematchbtn.addEventListener("click", ()=>{
  tabuleiro = [[0, 0, 0],[0, 0, 0],[0, 0, 0]]
  atualizarhtml() 
})

jdvelha.addEventListener("click", (event) => {
  let linha = Math.floor(event.target.id/3)
  let coluna = event.target.id - linha*3
  ///Jogada Player
  if(final(tabuleiro) || tabuleiro[linha][coluna] !== 0) return
  tabuleiro = resultado(tabuleiro, [linha, coluna])
  atualizarhtml()
  ///Jogada IA
  if(!jxj && !final(tabuleiro)) tabuleiro = jogadaIA(tabuleiro)
  atualizarhtml()
  
  ganhador(tabuleiro)
})
checkbox.addEventListener( 'change', function() {
  if(this.checked) {
      jxj = false
  } else {
      jxj = true
  }
});

atualizarhtml()
