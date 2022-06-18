const readlineSync = require('readline-sync') //IMPORTAÇÃO DOS MODULOS
const readline = require('readline')
const fs = require('fs')
const rl = readline.createInterface({
    input: fs.createReadStream('csvFiles/medicamentos.csv') //CRIA INTERFACE DE LEITURA DO .CSV
  })
var neg = 0 //DECLARAÇÃO DE VARIAVEIS GLOBAIS
var neu = 0
var pos = 0
var total 
var percNeg 
var percNeu 
var percPos
var grafNeg = ''
var grafNeu = ''
var grafPos = '' 

function comparativoPisCofins(){ 
  console.clear() //LIMPA O CONSOLE ANTES DE APRESENTAR OS RESULTADOS
  rl.on('line', (line) => { //INICIA STREAM DE LEITURA LINHA POR LINHA
    let dados = line.split(';') //DIVIDE OS CAMPOS COM O DELIMITADOR ESCOLHIDO (';')
    if(dados[38]=='Sim'){ //VERIFICA COMERCIALIZAÇÃO
      if(dados[37]=='Negativa'){ //VERIFICA NEGATIVAS
        neg++ //INCREMENTA
      }
      else if(dados[37]=='Neutra'){ //VERIFICA NEUTRAS
        neu++ //INCREMENTA
      }
      else if(dados[37]=='Positiva'){ //VERIFICA POSITIVAS
        pos++ //INCREMENTA
      }
    }
  })
  rl.on('close', () => { //FECHA STREAM DE LEITURA
    percentual() //CHAMA FUNÇÃO QUE CALCULA PERCENTUAL
    grafico() // CHAMA FUNÇÃO QUE CRIA GRÁFICO DE '*'
    const pisCofinsTabelaObj = [ //CRIA OBJETO COM VALORES PIS/COFINS
      {
        CLASSIFICACAO: 'Negativa',
        PERCENTUAL: `${percNeg.toFixed(2)}%`, //DEFINE QTD DE CASAS DECIMAIS
        GRAFICO: grafNeg
      },
      {
        CLASSIFICACAO: 'Neutra',
        PERCENTUAL: `${percNeu.toFixed(2)}%`,
        GRAFICO: grafNeu
      },
      {
        CLASSIFICACAO: 'Positiva',
        PERCENTUAL: `${percPos.toFixed(2)}%`,
        GRAFICO: grafPos
      },
      {
        CLASSIFICACAO: 'Total',
        PERCENTUAL: `${percNeg+percNeu+percPos}%`,
      }
    ]
    console.log('\nCOMPARATIVO PIS/COFINS (COMERCIALIZADOS EM 2020):') 
    console.table(pisCofinsTabelaObj) //APRESENTA RESULTADOS (TABELA)
  })
  
  function percentual(){ //FUNÇÃO QUE CALCULA PERCENTUAL
    total = neg + neu + pos
    percNeg = neg * 100 / total
    percNeu = neu * 100 / total
    percPos = pos * 100 / total
  }
  
  function grafico(){ //FUNÇÃO QUE CRIA GRÁFICO DE '*' 
    for(let i=0; i<parseInt(percNeg); i++){
      grafNeg+='*'
    }
    for(let i=0; i<parseInt(percNeu); i++){
      grafNeu+='*'
    }
    for(let i=0; i<parseInt(percPos); i++){
      grafPos+='*'
    }
  }
}  

module.exports = comparativoPisCofins //EXPORTA MODULO