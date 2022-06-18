const readlineSync = require('readline-sync') //IMPORTAÇÃO DOS MODULOS
const readline = require('readline')
const fs = require('fs')
const rl = readline.createInterface({
  input: fs.createReadStream('csvFiles/medicamentos.csv') //CRIA INTERFACE DE LEITURA DO .CSV
})

function buscaNome() {
  
  var flag = false //VAI SINALIZAR POSSIVEL ERRO NA BUSCA
  do {  //LAÇO PARA INSERÇÃO OBRIGATÓRIA DE NO MÍNIMO 4 CARACTERES
    var nome = readlineSync.question('\nDigite o nome do medicamento (substancia ou nome comercial): ').toUpperCase()
    if (nome.length < 4) { console.log('\nPor favor, informe no minimo 4 caracteres.') }
  } while (nome.length < 4)
  console.clear() //LIMPA O CONSOLE ANTES DE APRESENTAR OS RESULTADOS

  rl.on('line', (line) => { //INICIA STREAM DE LEITURA LINHA POR LINHA
    let dados = line.split(';') //DIVIDE OS CAMPOS COM O DELIMITADOR ESCOLHIDO (';')
    if ((dados[0].indexOf(nome)!= -1 || nome.includes(dados[8])) && dados[38] == 'Sim') { // VERIFICA NOME E COMERCIALIZAÇÃO
      console.log(` 
        Nome: ${(dados[0])}
        Produto: ${dados[8]}
        Apresentação: ${dados[9]}
        Valor PF(sem impostos): R$${dados[13]}
        Comercialização: ${dados[38]}
      `) //APRESENTA OS RESULTADOS
      flag = true //SINALIZA SUCESSO
    }
  })
  rl.on('close', () => { //FECHA STREAM DE LEITURA
    
    if(flag == false) { //CASO NÃO ENCONTRE A BUSCA, APRESENTA O ERRO
      console.log(`\n\tDesculpe, nome "${nome}" não encontrado no sistema.\n`)
    }

  })

}

module.exports = buscaNome //EXPORTA MODULO