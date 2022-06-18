const readlineSync = require('readline-sync') //IMPORTAÇÃO DOS MODULOS
const buscaNome = require('./buscaNome.js')
const buscaCodigo = require('./buscaCodigo.js')
const comparativoPisCofins = require('./comparativoPisCofins.js')

function start() {
    console.clear() //LIMPAR TELA
    console.log('\nMENU INICIAL')  //APRESENTA MENU PRINCIPAL
    op = 
    [
        'Consultar por Nome',
        'Consultar por Codigo de Barras', 
        'Comparativo (PIS/COFINS)'
    ]
    i = readlineSync.keyInSelect(op, 'Escolha uma opcao')

    switch (i){ //CHAMADA DA FUNÇÃO DE ACORDO COM A ESCOLHA DO USUARIO
        case 0:
            buscaNome()
            break
        case 1:
            buscaCodigo()
            break
        case 2:
            comparativoPisCofins()
            break
    }
}

start()