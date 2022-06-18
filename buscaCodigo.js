const readlineSync = require('readline-sync') //IMPORTAÇÃO DOS MODULOS
const readline = require('readline')
const fs = require('fs')
const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/medicamentos.csv')  //CRIA INTERFACE DE LEITURA DO .CSV
})
var pmcArray = [] //DECLARAÇÃO DE VARIAVEIS GLOBAIS

function buscaCodigo() {
  
  var flag = false //VAI SINALIZAR POSSIVEL ERRO NA BUSCA
  var codigoBarras = readlineSync.question('\nInforme o Codigo de Barras: ') //SOLICITA AO USUÁRIO
  console.clear() //LIMPA O CONSOLE ANTES DE APRESENTAR OS RESULTADOS
  let nome // DECLARAÇÃO DE VARIAVEIS LOCAIS
  
  rl.on('line', (line) => { //INICIA STREAM DE LEITURA LINHA POR LINHA
    let dados = line.split(';') //DIVIDE OS CAMPOS COM O DELIMITADOR ESCOLHIDO (';')
    if (codigoBarras == dados[5]) { //VERIFICA CÓDIGO
      nome = dados[0] //ARMAZENA NOME DO PRODUTO
      flag = true // SINALIZA SUCESSO
    }
  })
  rl.on('close', () => { })

  rl.on('line', (line) => {
    let dados = line.split(';')
    if (dados[0] == nome) { //VERIFICA NOME
      maiorValor(dados[23]) //CHAMA FUNÇÃO QUE ARMAZENA VALORES PMC EM ARRAY
      console.log(` 
      Nome: ${(dados[0])}
      Produto: ${dados[8]}
      Apresentacao: ${dados[9]}
      PMC (ALIQUOTA 0%): R$${dados[23]}
      Comercializacao: ${dados[38]}
      `) //APRESENTA OS RESULTADOS
    }
  })
  
  rl.on('close', () => { //FECHA STREAM DE LEITURA
    if (flag != true) {
      console.log(`\n\tDesculpe, código de barras "${codigoBarras}" não encontrado no sistema.\n`)
      return //CASO NÃO ENCONTRE A BUSCA, APRESENTA O ERRO
    } else { //CASO ENCONTRE APRESENTA TABELA PMC (MENOR, MAIOR E DIFERENÇA)
    var pcmArrayOrdenado = pmcArray.map(Number).sort((a, b) => { return a - b }) //OREDENA ARRAY POR VALOR
    var pmcDifer = Number(pcmArrayOrdenado[pcmArrayOrdenado.length - 1]) - Number(pcmArrayOrdenado[0]) //CALCULA DIFERENÇA MENOR/MAIOR
    const pmcObj = //CRIA OBJETO COM VALORES PMC
    {
      MENOR: `R$${pcmArrayOrdenado[0]}`,
      MAIOR: `R$${pcmArrayOrdenado[pcmArrayOrdenado.length - 1]}`,
      DIFERENÇA: `R$${pmcDifer.toFixed(2)}`
    }
    console.log(`PMC (ALIQUOTA 0%):`)
    console.table(pmcObj) //APRESENTA RESULTADOS (TABELA)
    }
  })
}

function maiorValor(valor) { //CRIA ARRAY QUE VAI ARMAZENNANDO VALORES PMC
  if (valor > 0) {
    pmcArray.push(valor)
  }
}

module.exports = buscaCodigo //EXPORTA MODULO